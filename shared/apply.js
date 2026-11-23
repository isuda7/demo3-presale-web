// 공통 분양신청 폼 처리 — 화면(마크업·디자인)은 현장마다 다르고, 전송 규칙만 공통이다.
// <form data-apply data-site="슬러그"> 안의 name=name/phone/interest/consent 는 기본 필드,
// 그 외 name 을 가진 입력은 detail 로 묶어 전송한다.
const BASE = new Set(['name', 'phone', 'interest', 'consent']);

function formatPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

for (const form of document.querySelectorAll('form[data-apply]')) {
  const msg = form.querySelector('[data-apply-msg]');
  const btn = form.querySelector('[type=submit]');
  const phone = form.querySelector('[name=phone]');
  phone?.addEventListener('input', () => (phone.value = formatPhone(phone.value)));

  const show = (text, ok) => {
    if (!msg) return alert(text);
    msg.textContent = text;
    msg.dataset.state = ok ? 'ok' : 'error';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const detail = {};
    for (const [k, v] of fd.entries()) {
      if (BASE.has(k) || String(v).trim() === '') continue;
      detail[k] = detail[k] ? `${detail[k]}, ${v}` : String(v);
    }
    const payload = {
      site: form.dataset.site,
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      interest: String(fd.get('interest') ?? ''),
      consent: fd.get('consent') === 'on',
      detail,
    };
    btn.disabled = true;
    try {
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '신청 중 오류가 발생했습니다.');
      form.reset();
      form.classList.add('is-done');
      show('신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.', true);
    } catch (err) {
      show(err.message || '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', false);
    } finally {
      btn.disabled = false;
    }
  });
}
