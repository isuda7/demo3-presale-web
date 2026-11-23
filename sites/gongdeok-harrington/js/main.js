// 공통 동작(헤더·모바일 메뉴·GNB 현재 위치·탭·스크롤 등장)은 shared/site.js, 여기는 이 현장 전용 동작만 둔다.

// 시설 측면 인덱스(▶) 현재 위치 — 카탈로그 p.5~8 의 측면 메뉴
const facLinks = [...document.querySelectorAll('.fac-index a')];
const facMap = { 'fac-hotel': 'fac-convention' };
const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const id = facMap[en.target.id] ?? en.target.id;
      facLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === `#${id}`)));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
document.querySelectorAll('[data-fac]').forEach((el) => io.observe(el));
