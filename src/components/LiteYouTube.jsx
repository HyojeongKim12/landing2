import { useState } from 'react';

/**
 * 클릭 시점에 iframe을 주입하는 lite-YouTube 컴포넌트
 * - 페이지 로드 시 썸네일만 노출 → 페이지 로드 가속
 * - 사용자 제스처 후 iframe 삽입 → file:// 환경의 임베드 정책 우회
 * - 폴백 링크: 임베드 실패 시 새 탭에서 YouTube 직접 열기
 */
export default function LiteYouTube({ videoId, title, thumbnail, fallbackHref }) {
  const [active, setActive] = useState(false);
  const thumb = thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const handleClick = (e) => {
    if (e.target.closest('.yt-lite__fallback')) return; // 폴백 링크는 별도 처리
    e.preventDefault();
    setActive(true);
  };

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title || 'YouTube video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      className="yt-lite"
      onClick={handleClick}
      aria-label={`동영상 재생: ${title || ''}`}
      style={{ backgroundImage: `url('${thumb}')` }}
    >
      {title && <span className="yt-lite__title">{title}</span>}
      <span className="yt-lite__btn" aria-hidden="true">
        <svg viewBox="0 0 68 48" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C.06,13.05,0,24,0,24s.06,10.95,1.48,16.26c.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-.13,27.1-1.55c2.93-.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#f00"
          />
          <path d="M 45,24 27,14 27,34" fill="#fff" />
        </svg>
      </span>
      {fallbackHref && (
        <a
          className="yt-lite__fallback"
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          YouTube에서 보기 ↗
        </a>
      )}
    </button>
  );
}
