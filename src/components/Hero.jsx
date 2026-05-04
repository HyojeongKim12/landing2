import { forwardRef } from 'react';

const Hero = forwardRef(function Hero(_, ref) {
  return (
    <section ref={ref} className="hero" aria-label="리딩앤 아카데미 전국 사업 설명회">
      {/* 배경 요소 */}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__deco hero__deco--left" aria-hidden="true" />
      <div className="hero__deco hero__deco--right" aria-hidden="true" />

      <div className="hero__inner">
        {/* 최상단 아카데미 로고 */}
        <img className="hero__logo" src="/assets/logo.svg" alt="Reading& ACADEMY" />

        {/* 브래킷 타이틀 */}
        <div className="hero__eyebrow">
          <span className="bracket" aria-hidden="true">[</span>
          <span>리딩앤 아카데미 전국 사업 설명회</span>
          <span className="bracket" aria-hidden="true">]</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="hero__headline">
          <span className="line">
            <span className="w-bold">6개월</span>
            <span className="w-medium">만에</span>
            <span className="w-bold"> 전국 500개원 돌파,</span>
          </span>
          <span className="line w-extrabold">지금 빠르게 선점하세요.</span>
        </h1>

        {/* 서브 카피 */}
        <p className="hero__sub">앞서가는 원장님들이 선택한 이유, 직접 확인하세요</p>

        {/* 3개 라운드 버튼 */}
        <div className="hero__pills" role="list">
          <span className="pill" role="listitem">서울 포함 전국 10개 지역</span>
          <span className="pill" role="listitem">학원장 전용 무료 행사</span>
          <span className="pill" role="listitem">현장 계약 특별 혜택</span>
        </div>

        {/* CTA */}
        <a className="hero__cta" href="#apply">
          <span>사업설명회 신청하기</span>
          <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
});

export default Hero;
