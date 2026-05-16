function applyThanksLanguage() {
  const lang = new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'ja';
  if (typeof window.setCurrentLang === 'function') {
    window.setCurrentLang(lang);
  }
  if (typeof window.applyLangState === 'function') {
    window.applyLangState(lang);
  } else {
    document.body.classList.toggle('zh', lang === 'zh');
  }
}

applyThanksLanguage();
