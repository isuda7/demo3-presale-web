/* 포트폴리오 접근 화면
 * - 왼쪽 목록에서 사이트를 고르면 오른쪽 프레임이 전환된다.
 * - 보기: 분양사이트 / 분양신청 / 카탈로그 원본, 화면 크기: PC / 모바일
 * - 새창열기: 지금 프레임에 보이는 화면을 독립된 창으로 연다.
 * - 목록 데이터는 assets/sites-data.js (window.SITES)
 */
(function () {
  var sites = window.SITES || [];
  var $ = function (s) { return document.querySelector(s); };
  var list = $('#list');
  var frame = $('#frame');
  var frameWrap = $('#frameWrap');
  var stage = $('#stage');
  var state = { index: 0, view: 'site', device: 'pc' };

  // 카탈로그 원본 이미지는 catalogs/<슬러그>/p-01.jpg 형식(100쪽 이상이면 3자리)
  function pad(n, total) { var s = String(n); var w = total >= 100 ? 3 : 2; while (s.length < w) s = '0' + s; return s; }
  function thumbOf(s) { return 'catalogs/' + s.slug + '/p-' + pad(1, s.catalogPages) + '.jpg'; }
  function urlOf(s, view) {
    view = view || state.view;
    if (view === 'catalog') return 'catalog.html?site=' + s.slug;
    if (view === 'apply') return 'sites/' + s.slug + '/apply.html';
    return 'sites/' + s.slug + '/index.html';
  }

  $('#count').textContent = '총 ' + sites.length + '개 현장';

  list.innerHTML = sites.map(function (s, i) {
    var no = (i + 1 < 10 ? '0' : '') + (i + 1);
    return '<li>' +
      '<button type="button" class="card" data-i="' + i + '" style="--c:' + ((s.theme && s.theme.primary) || '#555') + '">' +
        '<span class="card-thumb"><img src="' + thumbOf(s) + '" alt="" loading="lazy"></span>' +
        '<span class="card-body">' +
          '<span class="card-no">' + no + '</span>' +
          '<strong>' + s.name + '</strong>' +
          '<small>' + s.category + '</small>' +
        '</span>' +
      '</button>' +
      '<p class="card-links">' +
        '<a href="' + urlOf(s, 'site') + '" target="_blank" rel="noopener">사이트</a>' +
        '<a href="' + urlOf(s, 'apply') + '" target="_blank" rel="noopener">분양신청</a>' +
        '<a href="' + urlOf(s, 'catalog') + '" target="_blank" rel="noopener">카탈로그</a>' +
      '</p>' +
    '</li>';
  }).join('');

  function render(direction) {
    var s = sites[state.index];
    if (!s) return;
    list.querySelectorAll('.card').forEach(function (c, i) { c.setAttribute('aria-current', i === state.index ? 'true' : 'false'); });
    $('#stageNo').textContent = (state.index + 1 < 10 ? '0' : '') + (state.index + 1);
    $('#stageName').textContent = s.name;
    $('#stageCat').textContent = s.category;
    stage.dataset.device = state.device;
    // 프레임 전환 효과
    frameWrap.classList.remove('in-left', 'in-right', 'in-fade');
    void frameWrap.offsetWidth;
    frameWrap.classList.add(direction > 0 ? 'in-right' : direction < 0 ? 'in-left' : 'in-fade');
    var next = urlOf(s);
    if (frame.getAttribute('src') !== next) frame.setAttribute('src', next);
  }

  function go(i) {
    var n = sites.length;
    var target = ((i % n) + n) % n;
    var dir = target === state.index ? 0 : i > state.index ? 1 : -1;
    state.index = target;
    if (history.replaceState) history.replaceState(null, '', '#' + sites[target].slug);
    render(dir);
  }

  list.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) go(Number(card.dataset.i));
  });
  $('#prev').addEventListener('click', function () { go(state.index - 1); });
  $('#next').addEventListener('click', function () { go(state.index + 1); });

  [['#viewSeg', 'view'], ['#deviceSeg', 'device']].forEach(function (pair) {
    var seg = $(pair[0]); var key = pair[1];
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      state[key] = b.dataset[key];
      seg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      render(0);
    });
  });

  $('#openNew').addEventListener('click', function () {
    var s = sites[state.index];
    var features = state.device === 'mobile' ? 'width=420,height=860' : 'width=1440,height=900';
    window.open(urlOf(s), 'site-' + s.slug + '-' + state.view, features);
  });

  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input,textarea,select')) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); go(state.index + 1); }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(state.index - 1); }
  });

  var fromHash = -1;
  sites.forEach(function (s, i) { if ('#' + s.slug === location.hash) fromHash = i; });
  state.index = fromHash >= 0 ? fromHash : 0;
  render(0);
})();
