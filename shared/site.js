// 현장 사이트 공통 동작 — 마크업 규칙만 지키면 디자인과 무관하게 동작한다.
//  #head            : 스크롤 시 .is-scrolled
//  #menuBtn + #gnb  : 모바일 메뉴 (aria-expanded, .is-open)
//  .gnb a[href^="#"]: 현재 섹션 표시 (aria-current)
//  [data-tabs]      : WAI-ARIA 탭 (role=tab, aria-controls, 좌우 화살표)
import './reveal.js';

const head = document.getElementById('head');
if (head) {
  const onScroll = () => head.classList.toggle('is-scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const menuBtn = document.getElementById('menuBtn');
const gnb = document.getElementById('gnb');
const setMenu = (open) => {
  menuBtn?.setAttribute('aria-expanded', String(open));
  menuBtn?.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  gnb?.classList.toggle('is-open', open);
};
menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
gnb?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

const gnbLinks = [...document.querySelectorAll('.gnb a[href^="#"]')];
if (gnbLinks.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) gnbLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === `#${en.target.id}`)));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  gnbLinks.forEach((a) => {
    const t = document.getElementById(a.hash.slice(1));
    if (t) io.observe(t);
  });
}

for (const list of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...list.querySelectorAll('[role=tab]')];
  const select = (tab) =>
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus();
      select(n);
    });
  });
}
