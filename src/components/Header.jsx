import { useHeaderVisibility } from '../hooks.js';

export default function Header({ heroRef, applyRef }) {
  const visible = useHeaderVisibility(heroRef, applyRef);

  return (
    <header
      className={`global-header${visible ? ' is-visible' : ''}`}
      aria-label="전역 헤더"
    >
      <div className="global-header__inner">
        <p className="global-header__brand">리딩앤 아카데미 전국 사업설명회 2026</p>
        <div className="global-header__buttons">
          <a href="#apply" className="global-header__btn global-header__btn--primary">
            무료 신청하기
          </a>
          <a href="#parent-talk" className="global-header__btn global-header__btn--outline">
            학부모 토크콘서트 →
          </a>
        </div>
      </div>
    </header>
  );
}
