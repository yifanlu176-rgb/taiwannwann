# Design Tokens
## 太旺旺株式会社 / Taiwannwann Co., Ltd.

| | |
|---|---|
| **Version** | 1.0 — Day 2 |
| **Date** | 2026-05-17 |
| **Status** | Awaiting user review (before Day 3 Astro init) |
| **Implements** | `brand/strategy.md` §5 Visual Direction |
| **Implementation timing** | Week 1 Day 3–4（Astro 初始化 + CSS 模块化） |

---

## 0. このドキュメントの位置づけ

本書は太旺旺の **デザインの語彙集**。
すべての色・余白・タイポ・モーションの単位を定義する。

CSS 変数名は二層構造：
- **Raw tokens**：素材としての値（`--cream`, `--sumi` 等）
- **Semantic tokens**：用途を持つ API（`--bg-default`, `--text-primary` 等）

UI 実装では **基本的に semantic を使う**。raw は brand 文脈で必要な時のみ。

---

## 1. Color

### 1.1 Raw Palette

#### Base（既存・保留）

| Token | HEX | Usage |
|---|---|---|
| `--cream` | `#f7f2ea` | 主背景。温かみのあるニュートラル |
| `--paper` | `#faf7f2` | 副背景（カード、elevated 面） |
| `--warm` | `#c8956c` | 主アクセント。タイトル / 強調 |
| `--warm2` | `#a5714a` | 副アクセント（深め） |
| `--moss` | `#7a8c6e` | 副アクセント（緑、自然要素） |

#### Add（新規）

| Token | HEX | Usage |
|---|---|---|
| `--sumi` | `#1a1812` | 主テキスト色。墨色、信念感のある重み |
| `--kintya` | `#b8915c` | 見出し / hover / リンク強調 |
| `--shu` | `#a8412a` | 朱。年に数回的な強調 only（< 1% 面積） |

#### Tints / Shades（透過バリエーション）

| Token | 値 | Usage |
|---|---|---|
| `--sumi-90` | `rgba(26,24,18,0.9)` | 強テキスト（≒ 真っ黒だが少し抜く） |
| `--sumi-70` | `rgba(26,24,18,0.7)` | 副テキスト |
| `--sumi-55` | `rgba(26,24,18,0.55)` | muted テキスト、caption |
| `--sumi-15` | `rgba(26,24,18,0.15)` | strong border |
| `--sumi-08` | `rgba(26,24,18,0.08)` | subtle border、divider |
| `--sumi-04` | `rgba(26,24,18,0.04)` | hover bg |

### 1.2 Semantic Tokens

#### Background

| Token | Maps to | Usage |
|---|---|---|
| `--bg-default` | `--cream` | ページ主背景 |
| `--bg-elevated` | `--paper` | カード、modal、elevated 面 |
| `--bg-inverse` | `--sumi` | 反転背景（footer、dark CTA） |
| `--bg-subtle` | `--sumi-04` | hover、subtle highlight |
| `--bg-warm-subtle` | `rgba(200,149,108,0.06)` | warm accent の薄い面 |

#### Text

| Token | Maps to | Usage |
|---|---|---|
| `--text-primary` | `--sumi` | 主テキスト |
| `--text-secondary` | `--sumi-70` | 副テキスト |
| `--text-muted` | `--sumi-55` | caption、補助情報 |
| `--text-inverse` | `--paper` | dark 背景上のテキスト |
| `--text-warm` | `--warm` | accent テキスト |
| `--text-link` | `--kintya` | リンク（hover で `--warm` へ） |
| `--text-emphasis` | `--shu` | 朱の強調（極稀） |

#### Border

| Token | Maps to | Usage |
|---|---|---|
| `--border-subtle` | `--sumi-08` | divider、card 枠 |
| `--border-strong` | `--sumi-15` | input、focus 前の form 枠 |
| `--border-accent` | `--warm` | active state、selected |

#### Accent

| Token | Maps to | Usage |
|---|---|---|
| `--accent-primary` | `--warm` | 主アクセント |
| `--accent-secondary` | `--moss` | 副アクセント |
| `--accent-rare` | `--shu` | 朱、極稀 |
| `--accent-highlight` | `--kintya` | hover、focus |

### 1.3 使用比率の目安（全画面平均）

```
cream/paper        70% (背景)
sumi (text)        20% (テキスト)
warm / kintya / moss 8% (アクセント)
shu                <1% (朱、極稀)
```

朱（`--shu`）を多用すると **中華雑貨感** になる。控えめが鉄則。

---

## 2. Typography

### 2.1 Font Families

| Token | Stack | Usage |
|---|---|---|
| `--font-ja` | `'Noto Serif JP', 'Hiragino Mincho ProN', serif` | 日本語 body / heading |
| `--font-zh` | `'Noto Serif TC', 'PingFang TC', serif` | **繁体中文**（現行 SC から差し替え） |
| `--font-latin` | `'Cormorant Garamond', Georgia, serif` | Latin / 数字 / 装飾 |
| `--font-sans` | `system-ui, -apple-system, sans-serif` | システム fallback |
| `--font-mono` | `ui-monospace, SFMono-Regular, monospace` | コード（必要時のみ） |

**ロード戦略**（Week 1 Day 3 実装時）:
- Google Fonts `preconnect` 既存維持
- `font-display: swap` を必ず指定
- 日本語フォントは subset 検討（容量大）

### 2.2 Font Weights

| Token | 値 | Usage |
|---|---|---|
| `--fw-light` | 300 | display の細さ表現 |
| `--fw-regular` | 400 | body デフォルト |
| `--fw-medium` | 500 | heading、強調 |
| `--fw-semibold` | 600 | button、ラベル |
| `--fw-bold` | 700 | 極稀（使わない方向） |

### 2.3 Type Scale（fluid、mobile-first）

`clamp(min, fluid, max)` で滑らかにスケール。

| Token | 値 | px 範囲 | Usage |
|---|---|---|---|
| `--fs-caption` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` | 12–14 | overline、caption |
| `--fs-body-sm` | `clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)` | 14–15 | meta、補足 |
| `--fs-body` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | 16–18 | 本文 |
| `--fs-body-lg` | `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` | 18–20 | リード文、強調本文 |
| `--fs-h3` | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` | 20–24 | section subhead |
| `--fs-h2` | `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` | 24–32 | section head |
| `--fs-h1` | `clamp(2rem, 1.5rem + 2.5vw, 3rem)` | 32–48 | page title |
| `--fs-display` | `clamp(2.5rem, 1.75rem + 3.75vw, 4.5rem)` | 40–72 | hero、impact |

### 2.4 Line Height & Letter Spacing

| Token | 値 | Usage |
|---|---|---|
| `--lh-tight` | 1.15 | display、h1 |
| `--lh-snug` | 1.3 | h2、h3 |
| `--lh-base` | 1.6 | body |
| `--lh-loose` | 1.8 | 長文 prose |

| Token | 値 | Usage |
|---|---|---|
| `--ls-tight` | -0.02em | display |
| `--ls-normal` | 0 | デフォルト |
| `--ls-wide` | 0.05em | small caps、label |
| `--ls-wider` | 0.12em | overline |

### 2.5 Typography 使用ガイド

| 用途 | Family + Size + Weight + LH |
|---|---|
| Hero tagline | `--font-ja` + `--fs-display` + `--fw-light` + `--lh-tight` |
| Page H1 | `--font-ja` + `--fs-h1` + `--fw-medium` + `--lh-tight` |
| Section H2 | `--font-ja` + `--fs-h2` + `--fw-medium` + `--lh-snug` |
| Body | `--font-ja` + `--fs-body` + `--fw-regular` + `--lh-base` |
| Long prose | `--font-ja` + `--fs-body` + `--fw-regular` + `--lh-loose` |
| Caption | `--font-ja` + `--fs-caption` + `--fw-regular` + `--lh-snug` |
| Brand name | `--font-latin` + `--fs-display` + `--fw-light` + `--ls-wide` |

---

## 3. Spacing（4px base）

幾何級数ではなく **半幾何級数**。小さい範囲では細かく、大きい範囲では飛ぶ。

| Token | rem | px | Usage |
|---|---|---|---|
| `--space-0` | 0 | 0 | reset |
| `--space-1` | 0.25rem | 4 | hairline gap |
| `--space-2` | 0.5rem | 8 | tight inline |
| `--space-3` | 0.75rem | 12 | compact group |
| `--space-4` | 1rem | 16 | デフォルト gap |
| `--space-5` | 1.5rem | 24 | section 内ブロック |
| `--space-6` | 2rem | 32 | section ヘッダー前後 |
| `--space-7` | 3rem | 48 | 大きな区切り |
| `--space-8` | 4rem | 64 | section 間（モバイル） |
| `--space-9` | 6rem | 96 | section 間（デスクトップ） |
| `--space-10` | 8rem | 128 | 大きな section 間 |
| `--space-11` | 12rem | 192 | hero 余白 |

### 3.1 Semantic Spacing

| Token | Maps to | Usage |
|---|---|---|
| `--gap-tight` | `--space-2` | inline 要素間 |
| `--gap-default` | `--space-4` | block 要素間 |
| `--gap-loose` | `--space-6` | 段落間 |
| `--section-padding-y` | `clamp(4rem, 8vw, 8rem)` | section 上下余白 |
| `--section-padding-x` | `clamp(1.5rem, 6vw, 7rem)` | section 左右余白 |

---

## 4. Layout

### 4.1 Breakpoints（mobile-first）

| Token | 値 | デバイス |
|---|---|---|
| `--bp-sm` | 480px | 大きめモバイル |
| `--bp-md` | 768px | タブレット |
| `--bp-lg` | 1024px | デスクトップ |
| `--bp-xl` | 1280px | ワイドデスクトップ |
| `--bp-2xl` | 1536px | 超大画面 |

### 4.2 Container Widths

| Token | 値 | Usage |
|---|---|---|
| `--container-prose` | 640px | 長文記事 |
| `--container-narrow` | 880px | About、FAQ |
| `--container-default` | 1200px | 通常 section |
| `--container-wide` | 1440px | hero、wide grid |

### 4.3 Z-index Scale

| Token | 値 | Usage |
|---|---|---|
| `--z-base` | 0 | デフォルト |
| `--z-raised` | 10 | card hover、tooltip |
| `--z-sticky` | 100 | sticky nav |
| `--z-overlay` | 500 | overlay、scrim |
| `--z-modal` | 1000 | modal、dialog |
| `--z-toast` | 5000 | toast、notification |

---

## 5. Border Radius

```
最小限主義：角丸は控えめ。1980 年代風 hard edge を避けつつ、過度な丸も避ける。
```

| Token | 値 | Usage |
|---|---|---|
| `--radius-none` | 0 | 写真、image |
| `--radius-xs` | 2px | input、button（角の柔らかさのみ） |
| `--radius-sm` | 4px | tag、chip |
| `--radius-md` | 8px | card、modal |
| `--radius-lg` | 12px | hero element、major card |
| `--radius-pill` | 999px | pill button、status badge |

### 5.1 Border Width

| Token | 値 | Usage |
|---|---|---|
| `--bw-hair` | 1px | divider、subtle border |
| `--bw-thin` | 2px | input focus、selected |
| `--bw-thick` | 4px | accent line（左端 quote 等） |

---

## 6. Shadow（控えめ・静か）

「静か」な tone のため、shadow は **存在を感じさせない程度** に控える。

| Token | 値 | Usage |
|---|---|---|
| `--shadow-none` | none | デフォルト |
| `--shadow-xs` | `0 1px 2px rgba(26,24,18,0.04)` | hairline elevation |
| `--shadow-sm` | `0 2px 8px rgba(26,24,18,0.06)` | card 通常 |
| `--shadow-md` | `0 4px 16px rgba(26,24,18,0.08)` | card hover |
| `--shadow-lg` | `0 8px 32px rgba(26,24,18,0.10)` | modal、dropdown |
| `--shadow-focus` | `0 0 0 3px rgba(184,145,92,0.4)` | focus ring（kintya glow） |

---

## 7. Motion

### 7.1 Duration

| Token | 値 | Usage |
|---|---|---|
| `--duration-instant` | 100ms | hover color shift |
| `--duration-quick` | 200ms | button、input |
| `--duration-base` | 300ms | デフォルト transition |
| `--duration-slow` | 500ms | reveal、fade-in |
| `--duration-deliberate` | 800ms | hero、key visual |

### 7.2 Easing

| Token | 値 | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | enter（要素が現れる） |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | exit |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.6, 1)` | continuous |
| `--ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | **デフォルト推奨** |

### 7.3 Motion Recipes

| シーン | Duration + Easing |
|---|---|
| Hover color shift | `--duration-instant` + `--ease-smooth` |
| Button press | `--duration-quick` + `--ease-out` |
| Card lift | `--duration-base` + `--ease-smooth` |
| Section reveal (IntersectionObserver) | `--duration-slow` + `--ease-out` |
| Hero key visual | `--duration-deliberate` + `--ease-smooth` |
| Page transition | `--duration-base` + `--ease-in-out` |

### 7.4 Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

reduced-motion 設定の OS／ブラウザでは **完全停止** が原則。

---

## 8. CSS 実装プレビュー（Week 1 Day 3–4 にて適用）

ファイル構造提案：

```
src/styles/
├── tokens.css         ← 本書の semantic + raw 全部
├── reset.css          ← modern reset
├── base.css           ← global typography、links
├── layout.css         ← container、grid 共通
└── components/
    ├── button.css
    ├── card.css
    ├── nav.css
    └── form.css
```

`tokens.css` 冒頭プレビュー：

```css
:root {
  /* === Raw palette === */
  --cream: #f7f2ea;
  --paper: #faf7f2;
  --warm: #c8956c;
  --warm2: #a5714a;
  --moss: #7a8c6e;
  --sumi: #1a1812;
  --kintya: #b8915c;
  --shu: #a8412a;

  /* === Tints === */
  --sumi-90: rgba(26, 24, 18, 0.9);
  --sumi-70: rgba(26, 24, 18, 0.7);
  --sumi-55: rgba(26, 24, 18, 0.55);
  --sumi-15: rgba(26, 24, 18, 0.15);
  --sumi-08: rgba(26, 24, 18, 0.08);
  --sumi-04: rgba(26, 24, 18, 0.04);

  /* === Semantic: background === */
  --bg-default: var(--cream);
  --bg-elevated: var(--paper);
  --bg-inverse: var(--sumi);
  --bg-subtle: var(--sumi-04);

  /* === Semantic: text === */
  --text-primary: var(--sumi);
  --text-secondary: var(--sumi-70);
  --text-muted: var(--sumi-55);
  --text-inverse: var(--paper);
  --text-warm: var(--warm);
  --text-link: var(--kintya);

  /* === Semantic: border === */
  --border-subtle: var(--sumi-08);
  --border-strong: var(--sumi-15);

  /* === Typography === */
  --font-ja: 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  --font-zh: 'Noto Serif TC', 'PingFang TC', serif;
  --font-latin: 'Cormorant Garamond', Georgia, serif;
  --font-sans: system-ui, -apple-system, sans-serif;

  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;

  --fs-caption: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --fs-body-sm: clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);
  --fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-body-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --fs-h3: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --fs-h2: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --fs-h1: clamp(2rem, 1.5rem + 2.5vw, 3rem);
  --fs-display: clamp(2.5rem, 1.75rem + 3.75vw, 4.5rem);

  --lh-tight: 1.15;
  --lh-snug: 1.3;
  --lh-base: 1.6;
  --lh-loose: 1.8;

  /* === Spacing === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;

  /* === Radius === */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* === Shadow === */
  --shadow-xs: 0 1px 2px rgba(26, 24, 18, 0.04);
  --shadow-sm: 0 2px 8px rgba(26, 24, 18, 0.06);
  --shadow-md: 0 4px 16px rgba(26, 24, 18, 0.08);
  --shadow-lg: 0 8px 32px rgba(26, 24, 18, 0.10);
  --shadow-focus: 0 0 0 3px rgba(184, 145, 92, 0.4);

  /* === Motion === */
  --duration-instant: 100ms;
  --duration-quick: 200ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-deliberate: 800ms;

  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* === Layout === */
  --container-prose: 640px;
  --container-narrow: 880px;
  --container-default: 1200px;
  --container-wide: 1440px;

  --z-sticky: 100;
  --z-overlay: 500;
  --z-modal: 1000;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Open Items

- [ ] **Day 3**: tokens.css を実際に書く（Astro 初期化と並行）
- [ ] **Day 3**: Noto Serif SC → Noto Serif TC への Google Fonts 切替
- [ ] **Day 4**: 既存 `styles.css` の raw 値を `var(--*)` 参照に置換
- [ ] **Week 2 Day 1–2**: visual mood board 制作時、tokens を実際に適用してプレビュー

---

**Day 2 deliverable** — awaiting user review before Day 3 (Astro initialization).
