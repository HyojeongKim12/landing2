export default function SectionIntro() {
  return (
    <section className="section-intro" aria-label="리딩앤 아카데미 소개">
      <div className="section-intro__inner">
        <div className="section-intro__top">
          <div className="section-intro__text">
            <p className="section-intro__label">3. 리딩앤 아카데미 소개</p>

            <h2 className="section-intro__heading">
              답은 진짜 이중언어자를 만드는<br />
              <span className="green">리딩앤 아카데미의 차별화된 시스템</span>
            </h2>

            <p className="section-intro__lead">
              리딩앤 아카데미는 단순한 읽기 프로그램이 아닙니다.
            </p>

            <p className="section-intro__desc">
              <strong>충분히 읽고, 깊이 이해하고, 스스로 표현하는 독서교육의 원칙</strong>을
              충실히 따르면서도, 그 결과가 실제 아웃풋으로 이어지도록 설계된 프로그램입니다.
            </p>

            <p className="section-intro__desc">
              <strong>Let’s Read → Let’s Speak → Let’s Write로 이어지는 체계적인 3단계 흐름으로,</strong>
              {' '}아이가 스스로 읽고, 말하고, 쓰는 진짜 이중언어자로 성장합니다.
            </p>
          </div>

          <div className="section-intro__visual">
            <img
              src="/assets/learning-cycle.svg"
              alt="Let's Read → Let's Speak → Let's Write 3단계 학습 흐름"
            />
          </div>
        </div>

        <p className="section-intro__highlight">
          <span className="green">원어민 없이도, 복잡한 수업 준비 없이도</span> 운영할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
