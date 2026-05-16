const SITE_LANG = {
  current: 'ja'
};

function getCurrentLang() {
  return SITE_LANG.current;
}

function setCurrentLang(lang) {
  SITE_LANG.current = lang;
}

function applyLangState(lang) {
  document.body.classList.toggle('zh', lang === 'zh');
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

window.getCurrentLang = getCurrentLang;
window.setCurrentLang = setCurrentLang;
window.applyLangState = applyLangState;
