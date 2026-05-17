const PRODUCT_ITEMS = [
  {
    img: './assets/img/products/zhuzhen1.png',
    alt: 'ビーズまくらの製品画像',
    catJa: '寝具・リラクゼーション',
    catZh: '寢具・放鬆',
    nameJa: 'ビーズまくら',
    nameZh: '珠枕',
    descJa: '天然素材のビーズを使用した伝統的な健康まくら。首・肩のコリをやさしくほぐし、質の高い睡眠をサポートします。',
    descZh: '採用天然材質珠粒製成的傳統健康枕。溫和舒緩頸肩僵硬，支援高品質睡眠。',
    channels: ['SNS'],
    revealClass: ''
  },
  {
    img: './assets/img/products/aicaochui.png',
    alt: 'ヨモギハンマーの製品画像',
    catJa: '伝統療法器具',
    catZh: '傳統療法器具',
    nameJa: 'ヨモギハンマー',
    nameZh: '艾草錘',
    descJa: 'ヨモギのエキスを配合した伝統的なツボ刺激ハンマー。経絡に沿ったケアで、体のめぐりを整えます。',
    descZh: '融入艾草精華的傳統穴位刺激錘，沿經絡調理，促進全身氣血循環。',
    channels: ['SNS'],
    revealClass: 'reveal-delay-1'
  },
  {
    img: './assets/img/products/jingluoyi.png',
    alt: '経絡治療儀の製品画像',
    catJa: '電気治療器',
    catZh: '電療器具',
    nameJa: '経絡治療儀',
    nameZh: '經絡治療儀',
    descJa: '中医学の経絡理論に基づいた家庭用電気治療器。微弱電流でツボを刺激し、慢性的なコリや疲労感の緩和をサポート。',
    descZh: '依據中醫經絡理論設計的家用電療儀。以微電流刺激穴位，緩解慢性肌肉酸痛與疲勞感。',
    channels: ['SNS'],
    revealClass: 'reveal-delay-2'
  },
  {
    img: './assets/img/products/hongwaizhiliaoyi.png',
    alt: '遠赤外線首マッサージ機の製品画像',
    catJa: '温熱療法',
    catZh: '溫熱療法',
    nameJa: '遠赤外線首マッサージ機',
    nameZh: '遠紅外線頸部按摩機',
    descJa: '遠赤外線温熱と振動マッサージを組み合わせた首専用ケア器具。デスクワークや長時間のスマホ使用による首のこわばりをほぐします。',
    descZh: '結合遠紅外線溫熱與振動按摩的頸部專用護理器具，舒緩久坐辦公或長時間使用手機造成的頸部僵硬。',
    channels: ['SNS'],
    revealClass: ''
  },
  {
    img: './assets/img/products/tiaosheng.png',
    alt: '牛革縄跳びの製品画像',
    catJa: 'フィットネス',
    catZh: '運動健身',
    nameJa: '牛革縄跳び',
    nameZh: '牛皮跳繩',
    descJa: '本革を使用した高品質な縄跳び。耐久性と握り心地にこだわり、日常の運動習慣をサポートします。',
    descZh: '採用真皮製成的高品質跳繩。注重耐用性與握感舒適度，助您養成日常運動好習慣。',
    channels: ['SNS'],
    revealClass: 'reveal-delay-1'
  },
  {
    img: './assets/img/products/shouzhouzhen.png',
    alt: '肘まくらの製品画像',
    catJa: 'リラクゼーション',
    catZh: '放鬆療癒',
    nameJa: '肘まくら',
    nameZh: '手肘枕',
    descJa: '腕・肘専用のサポートクッション。読書やスマホ利用時の肘への負担を軽減し、快適な姿勢を保ちます。',
    descZh: '手臂、手肘專用支撐墊枕。減輕閱讀或使用手機時手肘的負擔，保持舒適姿勢。',
    channels: ['SNS'],
    revealClass: 'reveal-delay-2'
  }
];

function createProductCard(product) {
  const template = document.getElementById('product-card-template');
  const card = template.content.firstElementChild.cloneNode(true);
  const photo = card.querySelector('.product-photo');

  card.classList.add('reveal');
  if (product.revealClass) card.classList.add(product.revealClass);

  photo.src = product.img;
  photo.alt = product.alt;
  photo.loading = 'lazy';
  photo.decoding = 'async';

  const cats = card.querySelectorAll('.product-cat');
  cats[0].textContent = product.catJa;
  cats[1].textContent = product.catZh;

  const names = card.querySelectorAll('.product-name');
  names[0].textContent = product.nameJa;
  names[1].textContent = product.nameZh;

  const descs = card.querySelectorAll('.product-desc');
  descs[0].textContent = product.descJa;
  descs[1].textContent = product.descZh;

  const channels = card.querySelector('.product-channels');
  channels.innerHTML = '';
  product.channels.forEach(channel => {
    const tag = document.createElement('span');
    tag.className = 'channel-tag';
    tag.textContent = channel;
    channels.appendChild(tag);
  });

  return card;
}

function renderProductsGrid() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  PRODUCT_ITEMS.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

window.renderProductsGrid = renderProductsGrid;
