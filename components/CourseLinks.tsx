import { COURSES, LECTEA_COURSES_URL } from "@/lib/links";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// トップページの講座カード
export function CourseCards() {
  return (
    <ul className="courses">
      {COURSES.map((c, i) => (
        <li key={c.name}>
          <a href={LECTEA_COURSES_URL} {...external} className={`course-card course-${i}`}>
            <span className="course-visual" aria-hidden="true">
              {i === 1 ? <img src="/brand/logo.png" alt="" /> : <span className="course-mark">{c.mark}</span>}
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

// 記事の最後に置く案内
export function CourseBanner() {
  return (
    <a href={LECTEA_COURSES_URL} {...external} className="course-banner">
      <span className="course-banner-en">LEARN MORE</span>
      <span className="course-banner-title">もっと体系的に学ぶなら、爆速AIの講座へ</span>
      <span className="course-banner-sub">【飛翔】体系的に学ぶコース／【爆速AI】業務効率化コース</span>
      <span className="course-banner-go" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
