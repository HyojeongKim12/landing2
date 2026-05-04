import LiteYouTube from './LiteYouTube.jsx';

export default function SectionMarket() {
  return (
    <section className="section-market" aria-label="변하는 교육시장">
      <div className="section-market__bg section-market__bg--left" aria-hidden="true" />
      <div className="section-market__bg section-market__bg--right" aria-hidden="true" />

      <div className="section-market__inner">
        <div className="market-top">
          <p className="section-market__label">1. 변하는 교육시장</p>
          <h2 className="section-market__heading">지금 교육계는 이렇게 변화하고 있습니다.</h2>

          <div className="market-cards">
            <div className="market-card">
              <p className="market-card__title">국회, 독서국가 출범 공식 선포</p>
              <p className="market-card__desc">
                유·초·중·고 전 생애주기를 아우르는<br />
                독서교육 체계 구축 선언
              </p>
            </div>

            <span className="market-cards__x" aria-hidden="true">X</span>

            <div className="market-card">
              <p className="market-card__title">교육부, 독서·인문교육 핵심 역량 명시</p>
              <p className="market-card__desc">
                ‘책 읽는 학교문화’ 확산을<br />
                국가 정책 과제로 제시
              </p>
            </div>
          </div>

          <p className="section-market__intro">
            2026년 1월, 국회 교육위원회가 공식적으로 <strong>‘독서 국가’</strong>를 선언했습니다.
          </p>
        </div>

        <div className="video-wrap">
          <div className="video-wrap__inner">
            <LiteYouTube
              videoId="PYVfk1nZPdo"
              title="AI 시대의 기본기 경고… 해법은 다시 ‘독서’ / GOODTV NEWS"
              fallbackHref="https://www.youtube.com/watch?v=PYVfk1nZPdo"
            />
          </div>
        </div>

        <div className="market-bottom">
          <p className="section-market__outro">국가가 방향을 정했습니다.</p>
          <p className="section-market__highlight">먼저 움직인 원장님이 선점합니다.</p>
        </div>
      </div>
    </section>
  );
}
