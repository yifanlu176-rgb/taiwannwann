const CONTACT_COPY = {
  options: {
    ja: ['商品について', 'ご注文・配送について', '飲食事業について', 'その他'],
    zh: ['商品諮詢', '訂購・配送事宜', '餐飲事業合作', '其他']
  },
  messages: {
    ja: {
      success: '✦ お問い合わせを受け付けました。24時間以内にご返信いたします。',
      error: '✦ 送信に失敗しました。時間をおいて再度お試しください。'
    },
    zh: {
      success: '✦ 感謝您的聯繫，我們將在24小時內回覆您。',
      error: '✦ 送出失敗，請稍後再試一次。'
    }
  },
  submitting: {
    ja: '送信中…',
    zh: '送出中…'
  },
  submitDone: {
    ja: '送信する',
    zh: '送出'
  }
};

function renderContactOptions(lang) {
  const sel = document.getElementById('inquiry-type');
  if (!sel) return;
  sel.innerHTML = '';
  CONTACT_COPY.options[lang].forEach((label) => {
    const option = document.createElement('option');
    option.textContent = label;
    sel.appendChild(option);
  });
}

function getContactCopy(lang, state) {
  if (state === 'submitting' || state === 'submitDone') {
    return CONTACT_COPY[state][lang];
  }
  return CONTACT_COPY.messages[lang][state];
}

window.renderContactOptions = renderContactOptions;
window.getContactCopy = getContactCopy;
