import { CASE_ITEMS } from '../data.js';

export default function SectionCases() {
  return (
    <section className="section-cases" aria-label="성공 사례">
      <div className="section-cases__bg section-cases__bg--left" aria-hidden="true" />
      <div className="section-cases__bg section-cases__bg--right" aria-hidden="true" />

      <div className="section-cases__inner">
        <header className="section-cases__head">
          <p className="section-cases__label">4. 성공 사례</p>
          <h2 className="section-cases__heading">
            리딩앤 아카데미를 시작한 원장님들의<br />
            <span className="green">실제 이야기</span>
          </h2>
        </header>

        <div className="cases-grid">
          {CASE_ITEMS.map((item) => (
            <article className="case-card" key={item.tag}>
              <span className="case-card__tag">{item.tag}</span>
              <p className="case-card__title">{item.title}</p>
              <p className="case-card__subtitle">{item.subtitle}</p>
              <p className="case-card__desc">
                {item.desc.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
