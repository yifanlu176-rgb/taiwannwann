const PAGE_COPY = {
  heroEyebrow: 'Food · Health · Well-being',
  heroJa: {
    body:
      '食べること、癒されること、健やかでいること。<br>暮らしのあらゆる場面で、そっと寄り添う。'
  },
  heroZh: {
    body:
      '飲食、健康、康養——<br>生活每個面向，我們都在。'
  },
  footerJa: {
    brand:
      '旺旺と、豊かに生きる。食・健康・くらしのすべてに寄り添う企業として、大阪から日本全国へ。',
    bottom: '大阪府 · 健康器具輸入販売 · 飲食事業'
  },
  footerZh: {
    brand:
      '旺旺相伴，豐盛生活。作為守護飲食、健康、生活各層面的企業，從大阪出發，服務全日本。',
    bottom: '大阪府 · 健康器具進口銷售 · 餐飲事業'
  }
};

function renderPageCopy() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const heroJa = document.querySelector('.hero-title[data-lang="ja"] .hero-copy');
  const heroZh = document.querySelector('.hero-title-zh[data-lang="zh"] .hero-copy');
  const footerBrandJa = document.querySelector('.footer-brand p[data-lang="ja"]');
  const footerBrandZh = document.querySelector('.footer-brand p[data-lang="zh"]');
  const footerBottomJa = document.querySelector('.footer-bottom p[data-lang="ja"]');
  const footerBottomZh = document.querySelector('.footer-bottom p[data-lang="zh"]');

  if (eyebrow) eyebrow.textContent = PAGE_COPY.heroEyebrow;
  if (heroJa) heroJa.innerHTML = PAGE_COPY.heroJa.body;
  if (heroZh) heroZh.innerHTML = PAGE_COPY.heroZh.body;
  if (footerBrandJa) footerBrandJa.textContent = PAGE_COPY.footerJa.brand;
  if (footerBrandZh) footerBrandZh.textContent = PAGE_COPY.footerZh.brand;
  if (footerBottomJa) footerBottomJa.textContent = PAGE_COPY.footerJa.bottom;
  if (footerBottomZh) footerBottomZh.textContent = PAGE_COPY.footerZh.bottom;
}

window.renderPageCopy = renderPageCopy;
