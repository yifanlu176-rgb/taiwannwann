# Visual Asset Brief — 太旺旺 v2

> 本文档定义 v2 全站所需的每一张图像，含规格、搜索关键词、来源要求。
> 照片风格准则见 `strategy.md` §5.3。

---

## Global Rules

- **License**: Unsplash (free commercial) or original photography only. No Getty/Shutterstock watermarks.
- **Color mood**: Warm, desaturated. Match tokens palette (cream/paper/warm/moss tones).
- **Light**: Afternoon natural light, soft shadows, north-window diffusion. No flash, no studio white.
- **Composition**: 60–70% negative space OK. Subject off-center. No centered corporate portraits.
- **Texture**: Wood, paper, linen, ceramic, rattan, stone. No plastic, no metal, no glass.
- **People**: Hands, silhouettes, distance shots. No direct-camera stock smiles.
- **NG**: White-background e-commerce shots outside product grid. Over-filtered. Over-saturated.

---

## Image Slots

### A. Homepage

| # | Slot | Size (px) | Aspect | Purpose | Search Keywords |
|---|---|---|---|---|---|
| A1 | Hero background | 1920×1080 | 16:9 | Full-width atmospheric mood | `afternoon light wooden table`, `japanese interior natural light`, `quiet room warm tones` |
| A2 | Philosophy section | 1200×800 | 3:2 | Contemplative still life | `tea ceremony quiet`, `ceramic bowl natural light`, `wooden tray morning light` |
| A3 | Business section | 1200×800 | 3:2 | Cultural craft / bridge | `traditional craft hands`, `chinese tea tools`, `artisan workshop natural light` |
| A4 | Restaurant preview | 1200×800 | 3:2 | Food / dining hint (Coming Soon) | `japanese home cooking`, `warm kitchen table`, `seasonal vegetables wooden board` |
| A5 | About preview | 800×800 | 1:1 | Warm atmospheric (not CEO portrait) | `hands holding tea cup`, `woman back silhouette window`, `quiet afternoon reading` |
| A6 | Contact section bg | 1920×600 | ~3:1 | Subtle texture/mood strip | `linen texture warm`, `paper texture cream`, `washi paper close up` |

### B. Product Detail Pages (×6)

Each product page needs 1 lifestyle/context photo alongside the existing white-background PNG.

| # | Product | Context Photo Keywords |
|---|---|---|
| B1 | 竹枕 zhuzhen1 | `bamboo pillow bedroom`, `natural pillow linen bed`, `japanese bedroom minimal` |
| B2 | 竹枕 zhuzhen2 | Same as B1 (variant shot — different angle or setting) |
| B3 | 艾草槌 aicaochui | `dried herbs bundle`, `mugwort traditional`, `herbal wellness quiet` |
| B4 | 跳繩 tiaosheng | `morning exercise garden`, `rope texture close up`, `outdoor wellness gentle` |
| B5 | 経絡道具 jingluoyi | `traditional massage tool wood`, `wellness tool natural light`, `self-care quiet moment` |
| B6 | 紅外線道具 hongwaizhiliaoyi | `warm light therapy`, `relaxation evening home`, `cozy blanket warm tones` |
| B7 | 手珠枕 shouzhouzhen | `wrist rest wooden desk`, `small pillow craft`, `desk accessories natural` |

### C. About Page

| # | Slot | Size | Note |
|---|---|---|---|
| C1 | CEO portrait | 800×1000 | **User must provide.** If unavailable, use atmospheric substitute (hands, silhouette). |
| C2 | Osaka/Japan mood | 1200×600 | `osaka street quiet`, `japanese neighborhood morning`, `residential japan warm` |
| C3 | China origin mood | 1200×600 | `shandong countryside`, `chinese village morning`, `traditional chinese courtyard` |

### D. General / Texture

| # | Slot | Purpose | Keywords |
|---|---|---|---|
| D1 | OG image background | 1200×630 social share card | Cream/paper texture with space for text overlay |
| D2 | Section divider texture 1 | Subtle horizontal band | `washi paper texture`, `rice paper warm` |
| D3 | Section divider texture 2 | Alternate | `linen fabric close up cream`, `cotton weave natural` |
| D4 | 404 page mood | Lighthearted but on-brand | `empty wooden shelf`, `quiet room window light` |

---

## Existing Assets (keep)

| File | Status | Notes |
|---|---|---|
| `public/assets/img/products/zhuzhen1.png` | Keep | 2048×2048 white-bg. Use in product grid only. |
| `public/assets/img/products/zhuzhen2.png` | Keep | Same |
| `public/assets/img/products/aicaochui.png` | Keep | Same |
| `public/assets/img/products/tiaosheng.png` | Keep | Same |
| `public/assets/img/products/jingluoyi.png` | Keep | Same |
| `public/assets/img/products/hongwaizhiliaoyi.png` | Keep | Same |
| `public/assets/img/products/shouzhouzhen.png` | Keep | Same |

**Week 3 action**: Run all PNGs through `astro:assets` pipeline → WebP + resize + srcset.

---

## Sourcing Priority

1. **Unsplash** — primary source for all lifestyle/mood shots. Free, commercial-use, high quality.
2. **User-provided** — CEO portrait, any real product-in-use photos, store photos.
3. **AI generation (Flux Pro / Midjourney)** — ONLY for hero key visual or textures if Unsplash falls short. Style-lock to brand mood board first.

---

## Delivery Format

- Source files: highest resolution available
- Working format: WebP at 2× display size (e.g., 1920×1080 slot → source at 3840×2160, serve 1920 WebP)
- Fallback: JPEG for `<picture>` element
- All images placed in `src/assets/img/` for Astro pipeline processing (not `public/`)

---

## Action Items

- [ ] Source A1–A6 homepage images (6)
- [ ] Source B1–B7 product context images (7)
- [ ] Source C2–C3 About mood images (2)
- [ ] Source D1–D4 general textures (4)
- [ ] Request CEO portrait from user (C1)
- [ ] Total: ~19 images + 1 user-provided
