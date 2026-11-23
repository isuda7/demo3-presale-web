# 디자인 시스템 — thesharp-dongtan-acmer

토큰과 규칙의 원본은 `css/style.css` 상단 주석과 `:root` 변수입니다.

아크메르 동탄 (더샵, 포스코이앤씨) — 디자인 시스템 (리플렛 시안 A)
- 크림 바탕 + 브라운 명조 헤드라인, 핵심 글자만 크게 키우는 리듬("역사적", "풍경")
- 헤드라인을 가로지르는 가는 브라운 룰 + 우측 2줄 영문 챕터 라벨(THE NEXT / HISTORY)
- 흑백 무드 사진 위로 겹쳐지는 크림 텍스트 박스, 박스 하단 멀티컬러 스트라이프
- 비비드한 보태니컬 페인팅(표지)이 각 챕터 모서리 타일·장식 잎으로 등장
- 브라운 다이아몬드(마름모) 아이콘

## 토큰
- `--ac-cream: #f9f5ea`
- `--ac-cream-2: #f3ecdb`
- `--ac-brown: #6e553f`
- `--ac-brown-2: #8c6f52`
- `--ac-green: #224b39`
- `--ac-ink: #2b2620`
- `--ac-mute: #8a8173`
- `--ac-pink: #e0457b`
- `--ac-stripe: linear-gradient(90deg, #e0457b 0 14%, #f08a24 14% 26%, #224b39 26% 42%, #2a6fb8 42% 52%, #c9b23a 52% 66%, #8d2f52 66% 78%, #224b39 78% 90%, #e0457b 90%)`
- `--f-ko: Pretendard, 'Apple SD Gothic Neo', sans-serif`
- `--f-serif: 'Noto Serif KR', serif`
- `--f-en: 'Montserrat', var(--f-ko)`
- `--w: 1200px`
- `--gutter: clamp(20px, 4vw, 48px)`
- `--head-h: 76px`
- `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`
