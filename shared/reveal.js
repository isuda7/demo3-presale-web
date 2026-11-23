// 스크롤 등장 효과(공통). [data-reveal] 요소에 .is-in 을 붙인다. 모션 줄이기 설정을 존중한다.
const els = document.querySelectorAll('[data-reveal]');
if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add('is-in'), io.unobserve(en.target))),
    { rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
