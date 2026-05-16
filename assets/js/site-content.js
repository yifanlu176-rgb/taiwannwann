const CHANNEL_ITEMS = [
  {
    icon: '🛍',
    nameJa: 'Yahoo!ショッピング',
    nameZh: 'Yahoo!購物',
    descJa: 'LINEヤフー株式会社が運営する日本最大級のショッピングモールで商品をご購入いただけます。',
    descZh: '在日本最大級購物平台之一Yahoo!購物上輕鬆選購我們的商品。',
    revealClass: ''
  },
  {
    icon: '🏪',
    nameJa: '楽天市場',
    nameZh: '樂天市場',
    descJa: '楽天グループ株式会社が運営する楽天市場でもお求めいただけます。ポイントも貯まります。',
    descZh: '同步於樂天市場上架銷售，購物同時享有樂天點數回饋。',
    revealClass: 'reveal-delay-1'
  },
  {
    icon: '📱',
    nameJa: 'SNS・直接販売',
    nameZh: '社群媒體・直販',
    descJa: 'Instagram・Facebook・LINEを通じた直接販売も行っています。商品の最新情報や使い方のご案内もSNSで発信中。',
    descZh: '透過Instagram、Facebook、LINE進行直接銷售，同步分享商品最新資訊與使用方法。',
    revealClass: 'reveal-delay-2'
  }
];

const ABOUT_ROWS = [
  {
    labelJa: '会社名',
    labelZh: '公司名稱',
    valueJa: '太旺旺株式会社',
    valueZh: '太旺旺株式会社',
    shared: true
  },
  {
    labelJa: '本店所在地',
    labelZh: '本店地址',
    valueJa: '大阪府大阪市東成区深江北2-1-3',
    valueZh: '大阪府大阪市東成區深江北2-1-3',
    shared: false
  },
  {
    labelJa: '資本金',
    labelZh: '資本金',
    valueJa: '500万円',
    valueZh: '500萬日圓',
    shared: false
  },
  {
    labelJa: '代表取締役',
    labelZh: '代表取締役',
    valueJa: '楊 杰敏',
    valueZh: '楊 杰敏',
    shared: true
  },
  {
    labelJa: '事業内容',
    labelZh: '事業內容',
    valueJa: '中国からの健康器具輸入販売、飲食事業',
    valueZh: '中國健康器具進口銷售、餐飲事業',
    shared: false
  },
  {
    labelJa: '販売チャンネル',
    labelZh: '銷售渠道',
    valueJa: 'Yahoo!ショッピング・楽天市場・各種SNS',
    valueZh: 'Yahoo!購物・樂天市場・各大社群平台',
    shared: false
  }
];

const MISSION_ITEMS = [
  {
    ja: '中日両国をつなぐ健康の架け橋',
    zh: '連結中日兩國的健康橋樑'
  },
  {
    ja: '伝統知恵と現代ライフの融合',
    zh: '傳統智慧與現代生活的融合'
  },
  {
    ja: '食・健康・くらしの総合サポート',
    zh: '飲食、健康、生活的全方位支援'
  },
  {
    ja: '大阪から日本全国へ',
    zh: '從大阪出發，服務全日本'
  }
];

const RESTAURANT_COPY = {
  headingJa: '「食べる喜び」を、<br>大阪から。',
  headingZh: '「飲食之樂」，<br>從大阪出發。',
  bodyJa:
    '太旺旺株式会社は、健康器具の輸入販売事業に続き、飲食事業への参入を進めています。食の豊かさは、人が心身ともに満たされるための基本。本物の美味しさと温かいおもてなしで、訪れる方の日常に特別な一瞬を届けることを目指します。',
  bodyZh:
    '太旺旺株式会社在健康器具進口銷售事業基礎上，正積極推進餐飲事業的拓展。飲食的豐盛，是人心身兼得的根本所在。我們以真實的美味與溫暖的待客之心，為每位到來的客人送上生活中的美好時刻。',
  noteJa: '店舗詳細・開業情報は近日中に公開予定です。続報をお待ちください。',
  noteZh: '店鋪詳情及開業資訊即將公開，敬請期待。'
};

function createLangElement(tagName, lang, text) {
  const el = document.createElement(tagName);
  el.dataset.lang = lang;
  el.textContent = text;
  return el;
}

function renderChannelsGrid() {
  const grid = document.getElementById('channelsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  CHANNEL_ITEMS.forEach((item) => {
    const card = document.createElement('div');
    card.className = `channel-card reveal${item.revealClass ? ` ${item.revealClass}` : ''}`;
    card.innerHTML = `
      <div class="channel-icon">${item.icon}</div>
    `;
    card.appendChild(createLangElement('div', 'ja', item.nameJa));
    card.appendChild(createLangElement('div', 'zh', item.nameZh));
    card.appendChild(createLangElement('p', 'ja', item.descJa));
    card.appendChild(createLangElement('p', 'zh', item.descZh));
    grid.appendChild(card);
  });
}

function renderAboutRows() {
  const tbody = document.getElementById('aboutRows');
  if (!tbody) return;
  tbody.innerHTML = '';

  ABOUT_ROWS.forEach((row) => {
    const tr = document.createElement('tr');
    tr.appendChild(createLangElement('th', 'ja', row.labelJa));
    tr.appendChild(createLangElement('th', 'zh', row.labelZh));

    if (row.shared) {
      const td = document.createElement('td');
      td.textContent = row.valueJa;
      tr.appendChild(td);
    } else {
      tr.appendChild(createLangElement('td', 'ja', row.valueJa));
      tr.appendChild(createLangElement('td', 'zh', row.valueZh));
    }

    tbody.appendChild(tr);
  });
}

function renderMissionItems() {
  const list = document.getElementById('missionItems');
  if (!list) return;
  list.innerHTML = '';

  MISSION_ITEMS.forEach((item) => {
    list.appendChild(createLangElement('li', 'ja', item.ja));
    list.appendChild(createLangElement('li', 'zh', item.zh));
  });
}

function renderRestaurantContent() {
  const container = document.getElementById('restaurantInfo');
  const template = document.getElementById('restaurant-info-template');
  if (!container || !template) return;
  container.innerHTML = '';
  container.appendChild(template.content.cloneNode(true));
}

function renderSiteContent() {
  renderRestaurantContent();
  renderChannelsGrid();
  renderAboutRows();
  renderMissionItems();
}

window.renderSiteContent = renderSiteContent;
