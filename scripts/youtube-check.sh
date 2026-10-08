#!/usr/bin/env bash
# おすすめ動画の候補が、載せる基準を満たすか調べる（docs/editorial-guide.md「おすすめ動画の選び方」）
#   使い方: bash scripts/youtube-check.sh <動画IDかURL>
#   基準（環境変数で変えられる）:
#     公開から MAX_AGE_DAYS 日以内（7）／長さ MIN_SECONDS 秒以上（300＝5分。ショート動画は除外）
#     再生 MIN_VIEWS 回以上（1000）／高評価 MIN_LIKES 以上（20）／コメント MIN_COMMENTS 件以上（3）
#   YouTube Data API のキー（環境変数 YOUTUBE_API_KEY）が必要。キーが無いと長さとコメント数を確認できないので「NG」になる
#   終了コード: 0＝OK（載せてよい） 3＝基準を満たさない 4＝確認できない
set -uo pipefail
MAX_AGE_DAYS="${MAX_AGE_DAYS:-7}"
MIN_SECONDS="${MIN_SECONDS:-300}"
MIN_VIEWS="${MIN_VIEWS:-1000}"
MIN_LIKES="${MIN_LIKES:-20}"
MIN_COMMENTS="${MIN_COMMENTS:-3}"

id="${1:?動画IDかURLを指定してください}"
id="$(printf '%s' "$id" | sed -E 's#.*(v=|youtu\.be/|shorts/)([A-Za-z0-9_-]{11}).*#\2#')"

if [ -z "${YOUTUBE_API_KEY:-}" ]; then
  echo "NG: YOUTUBE_API_KEY が設定されていないため、動画の長さ・高評価・コメント数を確認できません（動画は載せない）"
  exit 4
fi

json="$(curl -fsS "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${YOUTUBE_API_KEY}")" || {
  echo "NG: YouTube Data API に問い合わせできませんでした（${id}）"
  exit 4
}

printf '%s' "$json" | MAX_AGE_DAYS="$MAX_AGE_DAYS" MIN_SECONDS="$MIN_SECONDS" MIN_VIEWS="$MIN_VIEWS" MIN_LIKES="$MIN_LIKES" MIN_COMMENTS="$MIN_COMMENTS" node -e '
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  const item = JSON.parse(s).items?.[0];
  if (!item) { console.log("NG: 動画が見つかりません（非公開・削除済みの可能性）"); process.exit(4); }
  const env = process.env;
  const m = item.contentDetails.duration.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) || [];
  const sec = (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
  const days = Math.floor((Date.now() - Date.parse(item.snippet.publishedAt)) / 86400000);
  const st = item.statistics;
  const n = (v) => (v === undefined ? null : Number(v));
  const views = n(st.viewCount), likes = n(st.likeCount), comments = n(st.commentCount);
  const fmt = (x) => `${Math.floor(x / 60)}分${String(x % 60).padStart(2, "0")}秒`;
  const checks = [
    ["公開日", `${item.snippet.publishedAt.slice(0, 10)}（${days}日前）`, days <= +env.MAX_AGE_DAYS, `${env.MAX_AGE_DAYS}日以内`],
    ["長さ", fmt(sec), sec >= +env.MIN_SECONDS, `${fmt(+env.MIN_SECONDS)}以上（ショート動画は対象外）`],
    ["再生回数", views ?? "非公開", views !== null && views >= +env.MIN_VIEWS, `${env.MIN_VIEWS}回以上`],
    ["高評価", likes ?? "非公開", likes !== null && likes >= +env.MIN_LIKES, `${env.MIN_LIKES}以上`],
    ["コメント", comments ?? "オフ", comments !== null && comments >= +env.MIN_COMMENTS, `${env.MIN_COMMENTS}件以上`],
  ];
  console.log(`タイトル: ${item.snippet.title}`);
  console.log(`チャンネル: ${item.snippet.channelTitle}`);
  for (const [k, v, ok, rule] of checks) console.log(`${ok ? "OK" : "NG"}  ${k}: ${v}（基準：${rule}）`);
  const desc = item.snippet.description;
  const chapters = desc.split("\n").filter((l) => /^\s*\d{1,2}:\d{2}/.test(l));
  console.log(chapters.length ? "目次:\n" + chapters.map((c) => "  " + c.trim()).join("\n") : "目次: なし（概要欄にチャプターが無い）");
  console.log("説明文: " + desc.replace(/\s+/g, " ").slice(0, 1200));
  const pass = checks.every((c) => c[2]);
  console.log(pass ? "判定: OK（載せてよい）" : "判定: NG（基準を満たさないので載せない）");
  process.exit(pass ? 0 : 3);
});
'
code=$?

# 視聴者のコメント（評価の高い順に10件）。中身のチェックに使う（docs/editorial-guide.md「おすすめ動画の中身のチェック」）
comments="$(curl -fsS "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&order=relevance&maxResults=10&textFormat=plainText&key=${YOUTUBE_API_KEY}" 2>/dev/null)" || comments=""
printf '%s' "$comments" | node -e '
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  let items = [];
  try { items = JSON.parse(s).items || []; } catch {}
  if (!items.length) { console.log("コメント（上位）: 取得できませんでした"); return; }
  console.log("コメント（上位）:");
  for (const it of items) {
    const c = it.snippet.topLevelComment.snippet;
    console.log(`  ・${c.textDisplay.replace(/\s+/g, " ").slice(0, 140)}（高評価${c.likeCount}）`);
  }
});
'
exit "$code"
