import registry from '../sites.json';

const sites = registry.sites;
const $ = (s) => document.querySelector(s);
const list = $('#list');
const frame = $('#frame');
const frameWrap = $('#frameWrap');
const stage = $('#stage');
const pending = $('#pending');

const state = { index: 0, view: 'site', device: 'pc' };

// 카탈로그 페이지 이미지는 public/catalogs/<슬러그>/p-01.jpg 형식(100쪽 이상이면 3자리)으로 둔다.
const pad = (n, total) => String(n).padStart(total >= 100 ? 3 : 2, '0');
const thumbOf = (s) => (s.catalogPages ? `/catalogs/${s.slug}/p-${pad(1, s.catalogPages)}.jpg` : '');

function urlOf(s, view = state.view) {
  if (view === 'catalog') return `/viewer.html?site=${s.slug}`;
  if (view === 'apply') return `/sites/${s.slug}/apply.html`;
  return `/sites/${s.slug}/index.html`;
}

$('#count').textContent = `제작 ${sites.filter((s) => s.status === 'done').length} / 전체 ${sites.length}`;

list.innerHTML = sites
  .map(
    (s, i) => `
  <li>
    <button type="button" class="card" data-i="${i}" style="--c:${s.theme?.primary ?? '#555'}">
      <span class="card-thumb">${s.catalogPages ? `<img src="${thumbOf(s)}" alt="" loading="lazy">` : '<span class="card-empty">CATALOG</span>'}</span>
      <span class="card-body">
        <span class="card-no">${String(i + 1).padStart(2, '0')}</span>
        <strong>${s.name}</strong>
        <small>${s.category}</small>
        <span class="card-status" data-status="${s.status}">${s.status === 'done' ? '제작완료' : '자료대기'}</span>
      </span>
    </button>
  </li>`,
  )
  .join('');

function render(direction = 0) {
  const s = sites[state.index];
  list.querySelectorAll('.card').forEach((c, i) => c.setAttribute('aria-current', i === state.index ? 'true' : 'false'));
  $('#stageNo').textContent = String(state.index + 1).padStart(2, '0');
  $('#stageName').textContent = s.name;
  $('#stageCat').textContent = s.category;
  stage.dataset.device = state.device;
  const ready = s.status === 'done';
  pending.hidden = ready;
  frameWrap.hidden = !ready;
  $('#openNew').disabled = !ready;
  if (!ready) {
    $('#pendingName').textContent = s.name;
    $('#pendingSrc').textContent = `원본: ${s.source}`;
    return;
  }
  // 프레임 전환 효과: 방향에 따라 밀려나고 새 프레임이 들어온다.
  frameWrap.classList.remove('in-left', 'in-right', 'in-fade');
  void frameWrap.offsetWidth;
  frameWrap.classList.add(direction > 0 ? 'in-right' : direction < 0 ? 'in-left' : 'in-fade');
  const next = urlOf(s);
  if (frame.getAttribute('src') !== next) frame.src = next;
}

function go(i) {
  const n = sites.length;
  const target = ((i % n) + n) % n;
  const dir = target === state.index ? 0 : i > state.index ? 1 : -1;
  state.index = target;
  history.replaceState(null, '', `#${sites[target].slug}`);
  render(dir);
}

list.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) go(Number(card.dataset.i));
});
$('#prev').addEventListener('click', () => go(state.index - 1));
$('#next').addEventListener('click', () => go(state.index + 1));

for (const [segId, key] of [['#viewSeg', 'view'], ['#deviceSeg', 'device']]) {
  $(segId).addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    state[key] = b.dataset[key];
    $(segId).querySelectorAll('button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    render(0);
  });
}

$('#openNew').addEventListener('click', () => {
  const s = sites[state.index];
  const features = state.device === 'mobile' ? 'width=420,height=860' : 'width=1440,height=900';
  window.open(urlOf(s), `catalog-${s.slug}-${state.view}`, `${features},noopener`);
});

document.addEventListener('keydown', (e) => {
  if (e.target.closest('input,textarea,select')) return;
  if (e.key === 'ArrowDown' || e.key === 'PageDown') (e.preventDefault(), go(state.index + 1));
  if (e.key === 'ArrowUp' || e.key === 'PageUp') (e.preventDefault(), go(state.index - 1));
});

const fromHash = sites.findIndex((s) => `#${s.slug}` === location.hash);
state.index = fromHash >= 0 ? fromHash : 0;
render(0);
