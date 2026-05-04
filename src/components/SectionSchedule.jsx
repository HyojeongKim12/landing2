import { SCHEDULE_REGIONS, SCHEDULE_SPECIAL } from '../data.js';

/**
 * 섹션 7 — 지역별 일정
 *
 * @param {(regionId: string) => void} onApplyRegion
 *   카드 클릭 시 호출 — 신청폼의 해당 지역 체크박스를 자동 선택하고 폼으로 스크롤
 */
export default function SectionSchedule({ onApplyRegion }) {
  const handleCardClick = (e, regionId) => {
    e.preventDefault();
    onApplyRegion?.(regionId);
  };

  return (
    <section className="section-schedule" aria-label="지역별 일정">
      <div className="section-schedule__bg section-schedule__bg--right" aria-hidden="true" />
      <div className="section-schedule__bg section-schedule__bg--left" aria-hidden="true" />

      <div className="section-schedule__inner">
        <header>
          <p className="section-schedule__label">6. 지역별 일정</p>
          <h2 className="section-schedule__heading">가까운 지역을 선택하세요.</h2>
          <p className="section-schedule__subtitle">
            전국 10개 도시 순회 · 2026년 <strong>6월 2일 - 6월 19일</strong>
          </p>
        </header>

        {/* 서울 Special 카드 */}
        <article
          className="schedule-special"
          onClick={(e) => handleCardClick(e, SCHEDULE_SPECIAL.id)}
        >
          <div className="schedule-special__badge-row">
            <span className="schedule-special__badge">Special</span>
            <span className="schedule-special__badge-text">{SCHEDULE_SPECIAL.speaker}</span>
          </div>
          <div className="schedule-special__title-group">
            <h3 className="schedule-special__title">{SCHEDULE_SPECIAL.name}</h3>
            <p className="schedule-special__date">
              <strong>{SCHEDULE_SPECIAL.date}</strong> · {SCHEDULE_SPECIAL.location}
            </p>
          </div>
          <p className="schedule-special__meta">
            <strong>학부모+학원장 혼합 행사</strong>  |  <strong>오전 10시</strong>{'  '}
            {SCHEDULE_SPECIAL.notice}
          </p>
          <a href="#apply" className="schedule-special__cta">신청하기 →</a>
        </article>

        {/* 안내 박스 */}
        <div className="schedule-note">
          <p>
            전국 9개 지역 설명회는 <strong>학원장 전용</strong>으로 진행됩니다.<br />
            리딩앤 담당자가 사업 설명을 직접 진행하며, 서울과 달리 외부 연사 강연 없이 사업 설명에 집중합니다.
          </p>
        </div>

        {/* 9개 지역 카드 그리드 */}
        <div className="schedule-grid">
          {SCHEDULE_REGIONS.map((region) => (
            <article
              key={region.id}
              className="schedule-card"
              onClick={(e) => handleCardClick(e, region.id)}
            >
              <h3 className="schedule-card__title">{region.name}</h3>
              <p className="schedule-card__location">{region.location}</p>
              <p className="schedule-card__date">{region.date}</p>
              <a href="#apply" className="schedule-card__cta">신청하기 →</a>
            </article>
          ))}
        </div>

        <a href="#apply" className="schedule-cta">
          우리지역 사업설명회 신청하기 →
        </a>
      </div>
    </section>
  );
}
