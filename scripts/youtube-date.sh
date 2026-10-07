#!/usr/bin/env bash
# YouTube動画の公開日を調べる（動画ページはボット判定で開けないことがあるため、チャンネルのRSSで確認する）
# 使い方: bash scripts/youtube-date.sh <動画ID または URL>
# 出力: タイトル・チャンネル・公開日・公開からの日数。RSS（各チャンネルの最新15本）に無ければ「古い動画」と表示する
set -euo pipefail
id="${1:?動画IDかURLを指定してください}"
id="$(printf '%s' "$id" | sed -E 's#.*(v=|youtu\.be/|shorts/)([A-Za-z0-9_-]{11}).*#\2#')"

oembed="$(curl -fsS "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json")" || {
  echo "NG: oEmbedで動画を確認できませんでした（${id}）"; exit 1; }
title="$(printf '%s' "$oembed" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).title))')"
author="$(printf '%s' "$oembed" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log(j.author_name+"\t"+j.author_url)})')"
channel="${author%%$'\t'*}"
url="${author#*$'\t'}"

cid="$(curl -fsS "$url" | grep -o '"browseId":"UC[A-Za-z0-9_-]*"' | head -1 | sed -E 's/.*"(UC[^"]*)"/\1/')" || true
[ -n "$cid" ] || { echo "NG: チャンネルIDを取得できませんでした（${url}）"; exit 1; }

published="$(curl -fsS "https://www.youtube.com/feeds/videos.xml?channel_id=${cid}" |
  tr -d '\n' | grep -o "<yt:videoId>${id}</yt:videoId>.*" | grep -o '<published>[^<]*' | head -1 | sed 's/<published>//')" || true

echo "タイトル: ${title}"
echo "チャンネル: ${channel}"
if [ -z "$published" ]; then
  echo "公開日: 不明（チャンネルの最新15本に入っていない＝古い動画の可能性が高い。載せない）"
  exit 2
fi
days=$(( ( $(date +%s) - $(date -d "$published" +%s) ) / 86400 ))
echo "公開日: ${published}（${days}日前）"
[ "$days" -le 7 ] && echo "OK: 1週間以内の動画です" || { echo "NG: 1週間より古い動画です。載せない"; exit 3; }
