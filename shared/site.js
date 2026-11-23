/* 현장 사이트 공통 동작 (일반 스크립트 — 파일을 더블클릭해서 열어도 동작)
 *  #head            : 스크롤 시 .is-scrolled
 *  #menuBtn + #gnb  : 모바일 메뉴 (aria-expanded, .is-open)
 *  .gnb a[href^="#"]: 현재 섹션 표시 (aria-current)
 *  [data-tabs]      : 탭 (role=tab, aria-controls, 좌우 화살표)
 *  [data-reveal]    : 스크롤 등장 효과
 */
(function () {
  // 스크롤 등장
  var els = document.querySelectorAll('[data-reveal]');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { rio.observe(el); });
  }

  // 헤더
  var head = document.getElementById('head');
  if (head) {
    var onScroll = function () { head.classList.toggle('is-scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 모바일 메뉴
  var menuBtn = document.getElementById('menuBtn');
  var gnb = document.getElementById('gnb');
  function setMenu(open) {
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    }
    if (gnb) gnb.classList.toggle('is-open', open);
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  if (gnb) gnb.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // GNB 현재 위치
  var links = Array.prototype.slice.call(document.querySelectorAll('.gnb a[href^="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute('aria-current', String(a.hash === '#' + en.target.id)); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var t = document.getElementById(a.hash.slice(1));
      if (t) gio.observe(t);
    });
  }

  // 탭
  document.querySelectorAll('[data-tabs]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role=tab]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        var n = tabs[(i + d + tabs.length) % tabs.length];
        n.focus();
        select(n);
      });
    });
  });
})();
