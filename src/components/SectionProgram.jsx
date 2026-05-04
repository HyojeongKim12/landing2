import { PROGRAM_ITEMS } from '../data.js';

export default function SectionProgram() {
  return (
    <section className="section-program" aria-label="설명회 구성">
      <div className="section-program__inner">
        <header>
          <p className="section-program__label">5. 설명회 구성</p>
          <h2 className="section-program__heading">
            원장님의 시간 투자가<br />
            아깝지 않도록 준비했습니다
          </h2>
        </header>

        {/* 그린 하이라이트 박스 */}
        <div className="program-highlight">
          <div className="program-highlight__content">
            <p className="program-highlight__label">가장 중요한 혜택</p>
            <p className="program-highlight__title">현장 계약 시 특별 혜택 제공</p>
            <p className="program-highlight__desc">
              설명회 당일 계약하시는 원장님께는 본사 지원 혜택이 별도 제공됩니다.<br />
              자세한 혜택 내용은 현장에서 안내드립니다.
            </p>
          </div>
          <div className="program-highlight__icon" aria-hidden="true">
            <img src="/assets/section6-icon.svg" alt="" />
          </div>
        </div>

        {/* 4개 번호 카드 */}
        <ol className="program-list">
          {PROGRAM_ITEMS.map((item) => (
            <li className="program-item" key={item.num}>
              <span className="program-item__num">{item.num}</span>
              <div className="program-item__content">
                <h3 className="program-item__title">{item.title}</h3>
                <p className="program-item__desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
