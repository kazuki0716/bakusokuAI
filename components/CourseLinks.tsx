import { COURSES, LINE_URL } from "@/lib/links";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// トップページの講座カード
export function CourseCards() {
  return (
    <ul className="courses">
      {COURSES.map((c, i) => (
        <li key={c.name}>
          <a href={c.url} {...external} className={`course-card course-${i}`}>
            <span className="course-visual" aria-hidden="true">
              <img src={c.logo} alt="" />
            </span>
            <span className="course-body">
              <span className="course-name">{c.name}</span>
              <span className="course-desc">{c.description}</span>
              <span className="course-go">
                レクティで受講する <span aria-hidden="true">↗</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// 記事の最後に置く公式LINEへの案内
export function LineBanner() {
  return (
    <a href={LINE_URL} {...external} className="line-banner">
      <span className="line-banner-icon" aria-hidden="true">
        LINE
      </span>
      <span className="line-banner-body">
        <span className="line-banner-en">QUESTIONS?</span>
        <span className="line-banner-title">この記事やAIについての質問は、公式LINEへ</span>
        <span className="line-banner-sub">「うちの業務だとどう使う？」など、気軽にメッセージを送ってください。</span>
      </span>
      <span className="line-banner-go">
        公式LINEで質問する <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
