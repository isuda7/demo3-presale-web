/* 분양신청 화면 공통 동작 (퍼블리싱 확인용)
 * - 실제 전송·저장은 하지 않는다. 입력 검증과 완료 안내까지만 보여준다.
 * - 개발 연동 시: form[data-apply] 의 submit 처리 부분에 실제 전송 코드를 넣으면 된다.
 */
(function () {
  function formatPhone(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length < 4) return d;
    if (d.length < 8) return d.slice(0, 3) + '-' + d.slice(3);
    return d.slice(0, 3) + '-' + d.slice(3, d.length - 4) + '-' + d.slice(-4);
  }

  document.querySelectorAll('form[data-apply]').forEach(function (form) {
    var msg = form.querySelector('[data-apply-msg]');
    var phone = form.querySelector('[name=phone]');
    if (phone) phone.addEventListener('input', function () { phone.value = formatPhone(phone.value); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) {
        if (msg) { msg.textContent = '필수 항목을 확인해 주세요.'; msg.dataset.state = 'error'; }
        return;
      }
      form.reset();
      if (msg) {
        msg.textContent = '신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다. (퍼블리싱 확인용 화면으로, 입력 내용은 저장되지 않습니다)';
        msg.dataset.state = 'ok';
      }
    });
  });
})();
