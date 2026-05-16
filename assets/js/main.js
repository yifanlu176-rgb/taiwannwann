// ─── MARQUEE ───
const items = [
  'Health & Well-being','食・健康・くらし','飲食 · 健康 · 康養',
  'Import from China','大阪発・日本全国へ','Yahoo!ショッピング',
  '楽天市場','旺旺と、豊かに生きる','Coming Soon — Food & Dining'
];
const track = document.getElementById('marqueeTrack');
[...items,...items].forEach(t => {
  const s = document.createElement('span');
  s.className = 'marquee-item';
  s.innerHTML = `<span class="marquee-sep">✦</span> ${t} `;
  track.appendChild(s);
});

// ─── PRODUCTS ───
if (typeof window.renderProductsGrid === 'function') {
  window.renderProductsGrid();
}

// ─── SITE CONTENT ───
if (typeof window.renderSiteContent === 'function') {
  window.renderSiteContent();
}

// ─── LANG ───
function setLang(lang) {
  if (typeof window.setCurrentLang === 'function') {
    window.setCurrentLang(lang);
  }
  if (typeof window.applyLangState === 'function') {
    window.applyLangState(lang);
  }
  const sel = document.getElementById('inquiry-type');
  sel.innerHTML = '';
  const opts = lang === 'ja'
    ? ['商品について','ご注文・配送について','飲食事業について','その他']
    : ['商品諮詢','訂購・配送事宜','餐飲事業合作','其他'];
  opts.forEach(o => {
    const opt = document.createElement('option');
    opt.textContent = o; sel.appendChild(opt);
  });
}

// ─── REVEAL ───
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(r => io.observe(r));

// ─── FORM ───
const CONTACT_ENDPOINT = 'https://formspree.io/f/maqkwwqv';

function getContactField(field, lang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ja') {
  return document.querySelector(`#contact [data-field="${field}"][data-lang="${lang}"]`) || document.querySelector(`#contact [data-field="${field}"]`);
}

function getContactMessageEl(lang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ja') {
  return document.getElementById(lang === 'ja' ? 'form-msg' : 'form-msg-zh');
}

function setContactMessage(lang, text, isError = false) {
  const el = getContactMessageEl(lang);
  if (!el) return;
  el.textContent = text;
  el.style.display = 'block';
  el.style.color = isError ? '#f0a0a0' : 'var(--warm)';
}

function resetContactMessages() {
  const messages = [
    { lang: 'ja', text: '✦ お問い合わせを受け付けました。24時間以内にご返信いたします。' },
    { lang: 'zh', text: '✦ 感謝您的聯繫，我們將在24小時內回覆您。' }
  ];
  messages.forEach(({ lang, text }) => {
    const el = getContactMessageEl(lang);
    if (!el) return;
    el.textContent = text;
    el.style.display = 'none';
    el.style.color = 'var(--warm)';
  });
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const currentLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ja';
  const btn = event.submitter || form.querySelector(`.form-submit[data-lang="${currentLang}"]`);
  const originalText = btn ? btn.textContent : '';
  const originalBg = btn ? btn.style.background : '';
  const originalDisabled = btn ? btn.disabled : false;

  const nameEl = getContactField('name');
  const emailEl = getContactField('email');
  const inquiryEl = document.querySelector('#contact [data-field="inquiry"]');
  const messageEl = getContactField('message');

  const payload = new FormData();
  payload.append('name', nameEl ? nameEl.value.trim() : '');
  payload.append('email', emailEl ? emailEl.value.trim() : '');
  payload.append('inquiry_type', inquiryEl ? inquiryEl.value.trim() : '');
  payload.append('message', messageEl ? messageEl.value.trim() : '');
  payload.append('language', currentLang);
  payload.append('_replyto', emailEl ? emailEl.value.trim() : '');

  resetContactMessages();

  if (btn) {
    btn.disabled = true;
    btn.textContent = currentLang === 'ja' ? '送信中…' : '送出中…';
    btn.style.background = 'var(--moss2)';
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload
    });

    if (!response.ok) {
      throw new Error(`Formspree request failed with status ${response.status}`);
    }

    if (nameEl) nameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (inquiryEl) inquiryEl.selectedIndex = 0;
    if (messageEl) messageEl.value = '';

    if (currentLang === 'ja') {
      setContactMessage('ja', '✦ お問い合わせを受け付けました。24時間以内にご返信いたします。');
    } else {
      setContactMessage('zh', '✦ 感謝您的聯繫，我們將在24小時內回覆您。');
    }

    window.setTimeout(() => {
      window.location.href = `./thanks/?lang=${currentLang}`;
    }, 650);
  } catch (error) {
    console.error(error);
    if (currentLang === 'ja') {
      setContactMessage('ja', '✦ 送信に失敗しました。時間をおいて再度お試しください。', true);
    } else {
      setContactMessage('zh', '✦ 送出失敗，請稍後再試一次。', true);
    }
  } finally {
    if (btn) {
      btn.disabled = originalDisabled;
      btn.textContent = originalText;
      if (originalBg) {
        btn.style.background = originalBg;
      } else {
        btn.style.removeProperty('background');
      }
    }
  }
}

if (typeof window.applyLangState === 'function') {
  window.applyLangState(typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ja');
}

// ─── NAV ───
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 40 ? '0 2px 20px rgba(44,37,32,0.08)' : 'none';
});
