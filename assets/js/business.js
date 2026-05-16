const BUSINESS_ITEMS = [
  {
    num: '01',
    icon: '🌿',
    nameJa: '健康器具の輸入販売',
    nameZh: '健康器具進口銷售',
    nameEn: 'Health Products Import',
    descJa:
      '中国の伝統的な健康知恵を現代に活かした家庭用健康器具を厳選し、日本市場へ提供。ビーズまくら、経絡治療儀、遠赤外線マッサージ機など、日常の健康をサポートする商品を取り揃えています。',
    descZh:
      '精選融合中國傳統健康智慧的家用健康器具，引進日本市場。珠枕、經絡治療儀、遠紅外線按摩機等，支援日常健康管理。',
    statusJa: '販売中',
    statusZh: '販售中',
    statusClass: ''
  },
  {
    num: '02',
    icon: '🛒',
    nameJa: 'オンライン販売',
    nameZh: '線上銷售',
    nameEn: 'Online Commerce',
    descJa:
      'Yahoo!ショッピング・楽天市場などの大手プラットフォームに加え、Instagram・Facebook・LINEなどのSNSを活用した多チャンネル販売で、より多くのお客様へ安心してお届けします。',
    descZh:
      '除Yahoo!購物、樂天市場等大型平台外，同時運用Instagram、Facebook、LINE等社群媒體，透過多渠道銷售，讓更多顧客便捷安心地購得商品。',
    statusJa: '稼働中',
    statusZh: '營運中',
    statusClass: ''
  },
  {
    num: '03',
    icon: '🍜',
    nameJa: '飲食事業',
    nameZh: '餐飲事業',
    nameEn: 'Food & Dining',
    descJa:
      '「食」は豊かな暮らしの根本。飲食店の経営・運営事業を通じて、本物の美味しさと温かいおもてなしを大阪の地から発信してまいります。',
    descZh:
      '「飲食」是豐盛生活的根本。透過餐廳經營事業，從大阪出發，傳遞真正的美味與溫暖的待客之道。',
    statusJa: '準備中',
    statusZh: '籌備中',
    statusClass: 'coming'
  }
];

function renderBusinessSection() {
  const grid = document.getElementById('businessGrid');
  const template = document.getElementById('business-card-template');
  if (!grid || !template) return;

  grid.innerHTML = '';
  BUSINESS_ITEMS.forEach((item) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('.biz-num').textContent = item.num;
    card.querySelector('.biz-icon').textContent = item.icon;
    card.querySelector('.biz-name[data-lang="ja"]').textContent = item.nameJa;
    card.querySelector('.biz-name[data-lang="zh"]').textContent = item.nameZh;
    card.querySelector('.biz-name-en').textContent = item.nameEn;
    card.querySelector('.biz-desc[data-lang="ja"]').textContent = item.descJa;
    card.querySelector('.biz-desc[data-lang="zh"]').textContent = item.descZh;

    const tags = card.querySelectorAll('.biz-tag');
    tags[0].textContent = item.statusJa;
    tags[1].textContent = item.statusZh;
    if (item.statusClass) {
      tags.forEach((tag) => tag.classList.add(item.statusClass));
    }

    grid.appendChild(card);
  });
}

window.renderBusinessSection = renderBusinessSection;
