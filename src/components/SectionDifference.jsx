import LiteYouTube from './LiteYouTube.jsx';

export default function SectionDifference() {
  return (
    <section className="section-difference" aria-label="앞서가는 원장님들의 선택">
      <div className="section-difference__box">
        <div className="section-difference__inner">
          <p className="section-difference__label">2. 앞서가는 원장님들의 선택</p>
          <h2 className="section-difference__heading">
            리딩앤 아카데미의 진짜 차별점은 무엇인가요?
          </h2>

          <div className="section-difference__video">
            <LiteYouTube
              videoId="dH-drXrn5P0"
              title="리딩앤 아카데미를 소개합니다 / 영어고운연구소"
              thumbnail="https://i.ytimg.com/vi/dH-drXrn5P0/maxresdefault.jpg"
              fallbackHref="https://youtu.be/dH-drXrn5P0?si=Nw5K124IWBeQK_jw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
