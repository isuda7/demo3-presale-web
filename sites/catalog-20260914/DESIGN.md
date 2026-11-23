# 디자인 시스템 — catalog-20260914

토큰과 규칙의 원본은 `css/style.css` 상단 주석과 `:root` 변수입니다.

연제갤러리자이 (GS건설 Xi, 부산 연제구) — 디자인 시스템 (카탈로그 검토본 2026.09.14)
※ 같은 Xi 브랜드 가이드를 공유하므로 백석시그니처자이 토큰을 바탕으로 하되,
  이 카탈로그 고유의 차이(라이트 그레이 밴드, 토프 그레이 라벨, 베이지 세로 스트라이프 패턴,
  네이비 짧은 바 + 그레이 긴 바 조합, 흑백 대비 시스템 페이지)를 아래 오버라이드로 반영한다.
- 딥 네이비(#06263A) 표지 + 톤이 다른 네이비 사각 타일 모자이크
- 각 장 상단: 좌측 네이비 굵은 세로 바 + 회색 세로 라인, 굵은 영문 대문자 라벨(LOCATION 등)
- 웜 베이지(#EFEBE4) 상단 밴드 위에 사진이 반쯤 걸치는 레이아웃
- 굵은 고딕 헤드라인 + 회색 서브카피, 원형 라인 아이콘과 연결선
- 주택형 컬러 코드(동·호수 배치도 기준)
========================================================================= */
/* ===== 연제갤러리자이 오버라이드 ===== */
:root { --xi-beige: #ececec; --xi-beige-2: #c9cbcd; --xi-taupe: #a39b8f; --xi-stripe: #d5d0ca; }
.chap .en { color: var(--xi-taupe); font-weight: 600; }
.chap::before { width: 10px; background: #c9cbcd; }
.chap::after { width: 10px; }
.hero { background: #d5d0ca; color: var(--xi-navy); grid-template-columns: 1fr 1.3fr; }
.stripes { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, #d9d4ce 0 22px, #cfc9c2 22px 30px, #ddd8d2 30px 58px, #c9c3bb 58px 62px); opacity: 0.9; }
.stripes::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgb(213 208 202 / 0.2), rgb(213 208 202 / 0.95) 60%); }
.hero-copy h1 small { color: var(--xi-mute); opacity: 1; }
.hero-copy .gs { color: var(--xi-navy); }
.hero-copy .tag { opacity: 1; color: var(--xi-navy); font-weight: 700; font-size: 13px; letter-spacing: 0.04em; }
.hero-copy .btn-line { color: var(--xi-navy); }
.hero-photo::before { background: linear-gradient(90deg, #d5d0ca 0, transparent 30%); }
.tri { display: grid; grid-template-columns: 1fr 340px; gap: 30px; align-items: center; margin-bottom: 30px; }
.tri h3 { font-size: 26px; font-weight: 400; } .tri h3 b { font-weight: 800; }
.loc-list { list-style: none; margin: 0; padding: 30px; background: var(--xi-beige); display: grid; gap: 22px; }
.loc-list h4 { font-size: 17px; color: var(--xi-navy-3); font-weight: 600; } .loc-list h4 b { color: var(--xi-navy); font-weight: 800; }
.loc-list ul { margin: 6px 0 0; padding-left: 18px; font-size: 14px; color: var(--xi-mute); }
.loc-list em { font-style: normal; color: #c2185b; }
.review { color: #c2185b; }
.notice-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 16px; }
.notice-imgs a { display: block; border: 1px solid var(--xi-line); }

## 토큰
- `--xi-navy: #06263a`
- `--xi-navy-2: #0e3550`
- `--xi-navy-3: #154664`
- `--xi-beige: #efebe4`
- `--xi-beige-2: #d8d1c9`
- `--xi-gray: #a9a39b`
- `--xi-ink: #1a1d21`
- `--xi-mute: #6f6b66`
- `--xi-line: #dcd7cf`
- `--xi-accent: #c8a46a`
- `--f-ko: Pretendard, 'Apple SD Gothic Neo', sans-serif`
- `--f-en: 'Montserrat', var(--f-ko)`
- `--w: 1240px`
- `--gutter: clamp(20px, 4vw, 48px)`
- `--head-h: 76px`
- `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`
