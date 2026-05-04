# 리딩앤 아카데미 랜딩페이지 — React 프로젝트

> 기존 단일 HTML 페이지를 React 기반으로 재구성한 프로젝트입니다.
> Vite + React 18 환경에서 바로 실행 가능합니다.

---

## 폴더 구조

```
react-export/
├── README.md              ← 이 파일
├── package.json           ← 의존성 + 스크립트
├── vite.config.js         ← Vite 빌드 설정
├── index.html             ← 진입 HTML (Vite)
├── public/
│   └── assets/            ← 모든 SVG/이미지 자산 (기존 assets 그대로 복사)
└── src/
    ├── main.jsx           ← React 진입점
    ├── App.jsx            ← 페이지 전체 레이아웃 (Header → 9 sections → Footer)
    ├── styles.css         ← 전체 CSS (디자인 토큰 + 모든 섹션 스타일)
    ├── data.js            ← 정적 데이터 (지역 카드, 시·도 → 군·구 매핑 등)
    ├── hooks.js           ← 커스텀 훅 (useHeaderVisibility, useApplyForm)
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── SectionMarket.jsx        (1. 변하는 교육시장)
        ├── SectionDifference.jsx    (2. 앞서가는 원장님들의 선택)
        ├── SectionIntro.jsx         (3. 리딩앤 아카데미 소개)
        ├── SectionCases.jsx         (4. 성공 사례)
        ├── SectionProgram.jsx       (5. 설명회 구성)
        ├── SectionSchedule.jsx      (6. 지역별 일정)
        ├── SectionTalk.jsx          (특별 토크콘서트 안내)
        ├── SectionApply.jsx         (사업 설명회 참가 신청)
        ├── Footer.jsx
        └── LiteYouTube.jsx          (썸네일 → 클릭 시 iframe 주입 컴포넌트)
```

---

## 시작하기

```bash
npm install
npm run dev
```

기본 포트: `http://localhost:5173`

빌드:
```bash
npm run build
npm run preview
```

---

## 의존성

핵심:
- React 18
- Vite (개발 서버 + 번들러)

추가 라이브러리는 사용하지 않습니다 (TailwindCSS, 라우터 등 없음). 단일 페이지 구조라 React Router도 불필요.

---

## 디자인 시스템

`src/styles.css` 상단의 CSS Custom Properties로 토큰화되어 있습니다:

```css
:root {
  --green: #52CF29;        /* 브랜드 그린 */
  --green-strong: #45B321;
  --ink: #0F172A;
  --ink-2: #1F2937;
  --muted: #6B7280;
  --bg: #F4F8FB;
  --shadow-cta: 0 4px 16px 0 rgba(0, 0, 0, 0.10);
  ...
}
```

전체 토큰 가이드는 프로젝트 루트의 `DESIGN-GUIDE.md`와 `design-tokens.md` 참조.

### 폰트

Pretendard Variable (CDN)을 `index.html`에서 로드합니다.

### 글로벌 베이스
- `1rem = 10px` (html font-size 62.5%)
- 반응형 단계에서 자동 축소 (1024px → 58%, 640px → 54%)
- 모든 텍스트 `letter-spacing: -0.02em`, `line-height: 1.5`
- 한글 단어단위 줄바꿈 (`word-break: keep-all`)

---

## 컴포넌트 아키텍처

### 1. Section 컴포넌트
각 섹션은 독립 컴포넌트로 분리되어 있습니다. props 없이 자체 렌더링하며,
필요한 데이터는 `src/data.js`에서 import 합니다.

### 2. LiteYouTube
유튜브 임베드를 클릭 시점에 lazy load (썸네일 → iframe 주입).
`file://` 환경의 임베드 정책 우회 + 페이지 초기 로드 가속.

```jsx
<LiteYouTube
  videoId="PYVfk1nZPdo"
  title="…"
  thumbnail="https://i.ytimg.com/vi/PYVfk1nZPdo/hqdefault.jpg"
  fallbackHref="https://www.youtube.com/watch?v=PYVfk1nZPdo"
/>
```

### 3. 커스텀 훅 (src/hooks.js)

#### `useHeaderVisibility(heroRef, applyRef)`
스크롤 위치 기반으로 글로벌 헤더 표시 여부를 반환.
Hero 섹션을 지난 뒤부터 신청폼(섹션 9) 진입 전까지만 `true`.

#### `useApplyForm()`
신청 폼의 검증/포맷/지역 cascading 로직을 캡슐화.
- 이름: 한글/영문/공백 필터 (IME 조합 안전)
- 전화번호: 010-nnnn-nnnn 자동 포맷 + 완성 검증
- 시/도 → 군/구 cascading dropdown
- 지역 체크박스 다중 선택
- 에러 상태 자동 해제 (값 입력 시)

반환값:
```js
{
  values, setValue,            // 폼 상태
  errors, setRegionFromCard,   // 에러 + 외부 지역 트리거
  guguns,                      // 현재 시/도 기준 군/구 리스트
  validate, handleSubmit,      // 검증 + 제출 핸들러
  refs                         // 필드별 ref (스크롤 포커스용)
}
```

### 4. 섹션 7 ↔ 섹션 9 연동
- 섹션 7 카드 클릭 → `setRegionFromCard(regionId)` 호출
- 해당 체크박스 자동 선택 + 신청폼으로 부드럽게 스크롤

---

## 자산 (assets)

기존 SVG/이미지는 모두 `public/assets/` 아래로 복사하면 됩니다:

```
public/assets/
├── logo.svg
├── bg-grid.svg
├── hero-left.svg
├── hero-right.svg
├── section2-left.svg
├── section2-right.svg
├── section5-bg-left-v2.svg
├── section5-bg-right-v2.svg
├── section6-icon.svg
├── section7-left.svg
├── section7-right.svg
└── learning-cycle.svg
```

CSS/JSX에서 `/assets/파일명.svg` 경로로 참조합니다.

---

## 데이터 (src/data.js)

| Export | 설명 |
|--------|------|
| `SCHEDULE_REGIONS` | 섹션 7의 지역 카드 목록 (id, name, location, date) |
| `APPLY_REGIONS` | 섹션 9 폼의 지역 체크박스 목록 (id, name, date, isSpecial) |
| `ADMIN_AREAS` | 시/도 → 군/구 매핑 객체 (한국 행정구역 2024 기준) |
| `PROGRAM_ITEMS` | 섹션 6의 4개 번호 카드 데이터 |
| `CASE_ITEMS` | 섹션 5의 성공 사례 4개 카드 데이터 |

---

## 마이그레이션 시 주의사항

1. **이미지 경로**: 기존 HTML은 `assets/...` 상대 경로 사용. React에서는 `/assets/...` (public 기준 절대 경로)로 변경됨.
2. **인라인 onclick → 이벤트 핸들러**: 모든 인라인 핸들러 제거 후 React 이벤트로 변환.
3. **`hidden` 속성 → `className` 토글**: 글로벌 헤더 표시는 클래스(`is-visible`)로 처리.
4. **YouTube lazy embed**: `LiteYouTube` 컴포넌트 사용 — 사용자 클릭 시점에 iframe 주입.
5. **Form 상태**: `useApplyForm` 훅에 모두 캡슐화. 컴포넌트는 표현만 담당.

---

## 빌드 결과

`npm run build` 실행 시 `dist/` 폴더에 정적 빌드 산출물이 생성됩니다.
정적 호스팅(Netlify, Vercel, S3+CloudFront 등) 그대로 사용 가능.
