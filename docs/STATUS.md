# 太旺旺株式会社 v2.0 — 工作记录 & TODO

> 最后更新：2026-05-18
> 分支：`v2.0`
> 最新 commit：`f56d4ab` Add Umami analytics integration and deployment guide

---

## 一、项目概要

太旺旺株式会社（Taiwannwann Co., Ltd.）门户网站 v2.0 升级。

从 v1（单页 vanilla HTML/CSS/JS）重构为 Astro 4.16 SSG 多页双语站，覆盖品牌、合规、视觉、架构、SEO 六个维度。

| 项 | 值 |
|---|---|
| 域名 | taiwannwann.co.jp |
| 托管 | Vercel (Hobby, 免费) |
| 分析 | Umami 自托管 (Vercel + Neon PostgreSQL) |
| 框架 | Astro 4.16 + TypeScript strict |
| 语言 | 日文 `/ja/` + 繁中 `/zh/`，`prefixDefaultLocale: true` |
| 表单 | Formspree (`https://formspree.io/f/maqkwwqv`) + honeypot |
| 仓库 | `github.com/yifanlu176-rgb/taiwannwann` |

---

## 二、完整 Commit 历史（v2.0 分支）

```
f56d4ab Add Umami analytics integration and deployment guide
ab61623 Fix root redirect flash: Vercel edge redirect + JS fallback
23a578e Add Week 4 SEO and UX: JSON-LD, mobile nav, a11y
ae44b4b Build Week 3 pages: homepage sections, About, FAQ, 404
126a8e2 Add Week 2 brand assets: logo, copy (JP/ZH), product rewrite
64a189f Add Day 5 legal pages: privacy, terms, 特商法 (ja + zh)
e187828 Build Day 4 layouts and components with design tokens applied
5a82683 Disable sitemap and clean placeholder vars to unblock build
06ae3d1 Move static assets into public/ for Astro serving
bfc1b69 Initialize Astro 4.16 project with TypeScript and i18n routing
d58a31a Add v2.0 brand foundation
```

---

## 三、已完成工作

### Week 1 — 策略 & 工程基础

- [x] Brand Strategy Brief → `brand/strategy.md`
- [x] Design tokens 定稿 → `brand/tokens.md`、`src/styles/tokens.css`
- [x] Astro 4.16 项目初始化，TypeScript strict
- [x] CSS 三层架构：`tokens.css` → `reset.css` → `base.css`
- [x] 双语路由 `/ja/` `/zh/`，`prefixDefaultLocale: true`
- [x] 三件法定页面（日/繁中各一版）：
  - プライバシーポリシー（个人信息保护方针）
  - 特定商取引法に基づく表記
  - 利用規約
- [x] LegalLayout 法律页面专用布局

### Week 2 — 品牌资产 & 文案

- [x] Logo 设计三方向（A 字标 / B 印記 / C 几何）→ 用户选定 **B 印記**
- [x] Logo SVG 文件 → `brand/logo/b-seal-*.svg`
- [x] Favicon 更新为印記设计 → `public/favicon.svg`
- [x] 全站日文文案 → `brand/copy-ja.md`（hero / philosophy / about / products / restaurant / channels / contact / footer / about 深度页 / FAQ 7 组 / 404 / meta descriptions / nav 微文案）
- [x] 全站繁中文案 → `brand/copy-zh.md`
- [x] 产品文案合规重写 → `brand/copy-products.md`
  - 消除 18 个薬機法 NG 表达
  - 3 个产品改名：経絡治療儀→経絡の道具、遠赤外線首マッサージ機→首のあたため、ヨモギハンマー→よもぎの手棒
  - 品类从「健康器具」转为「文化雑貨 / lifestyle」
- [x] 视觉资产需求清单 → `brand/visual-assets.md`（19 个图片位、规格、关键词）

### Week 3 — 页面重构 & 新页面

- [x] 首页重构（日/繁中两版），6 个 section 组件：
  - `Hero.astro` — 品牌标语 + 装饰
  - `PhilosophySection.astro` — 三行 mantra + CTA
  - `AboutPreview.astro` — CEO 故事预览
  - `ProductsSection.astro` — 7 产品 grid，完整合规文案
  - `RestaurantSection.astro` — Coming Soon + 準備中 badge
  - `ChannelsSection.astro` — SNS / Yahoo / Rakuten 卡片
  - `ContactSection.astro` — Formspree 表单 + honeypot
- [x] About 深度页（日/繁中）— CEO 楊杰敏叙事，StoryLayout
- [x] FAQ 页（日/繁中）— 7 组问答，含合规说明
- [x] 404 页 — 双语自包含（无 layout 依赖）
- [x] Footer 组件 — 法律链接 + 版权

### Week 4 — SEO / UX / 功能补完

- [x] JSON-LD：Organization + WebSite schema graph（每页）
- [x] OG / Twitter Card meta tags
- [x] `<link rel="canonical">` + `hreflang`（ja / zh-TW / x-default）
- [x] `public/sitemap.xml`（12 URLs，完整 hreflang 标注）
- [x] `public/robots.txt`
- [x] `theme-color` meta
- [x] Skip-link 无障碍跳转
- [x] 移动端汉堡菜单（aria-expanded/controls/label，bar→X 动画，锚点自动关闭）
- [x] `vercel.json` 308 永久重定向 + JS fallback（消除 meta-refresh 闪烁）
- [x] Umami 分析脚本集成（条件式加载，env vars 控制）
- [x] Umami 部署指南 → `docs/umami-setup.md`

### 已修复的问题

| 问题 | 原因 | 解决 |
|---|---|---|
| FAQ 路径双重前缀 `/ja//ja/faq/` | Header nav 对绝对路径也拼前缀 | 条件判断 `startsWith('/')` |
| 根路径 redirect 闪烁 | meta-refresh + 可见 `<p>` 内容 | `vercel.json` edge redirect + JS fallback |
| JSON-LD `is:inline` 警告 | Astro 对 type=application/ld+json 的处理 | 显式添加 `is:inline` |
| 写入 zh/index.astro 失败 | 未先 Read 就 Write | 先 Read 再 Write |
| Git push rejected | 远端有新 commit | `git pull --rebase` 后 push |

---

## 四、当前系统状态

### 4.1 Vercel 部署

- 项目已连接 GitHub `v2.0` 分支
- 每次 push 自动构建部署
- `vercel.json` 处理根路径 308 重定向
- 线上地址：https://taiwannwann.co.jp

### 4.2 Umami 分析

- **代码侧**：`BaseLayout.astro` 已集成条件式 `<script>` 标签
- **服务端**：需用户自行部署（步骤见 `docs/umami-setup.md`）
- 部署后在太旺旺 Vercel 项目添加两个环境变量：
  - `PUBLIC_UMAMI_URL` = Umami 应用域名（不含 `/script.js`）
  - `PUBLIC_UMAMI_ID` = Umami 后台获取的 Website ID
- Website ID 获取方法：Umami Settings → Websites → Edit → 复制 UUID

### 4.3 Cloudflare

- 暂不迁移，保持 Vercel 全栈

---

## 五、文件架构（v2.0）

```
taiwannwann-website/
├── astro.config.mjs          # Astro 配置（i18n routing）
├── tsconfig.json              # TypeScript strict
├── package.json               # Astro 4.16 + @astrojs/check
├── vercel.json                # Edge redirect: / → /ja/
│
├── public/                    # 静态资源（不经 Astro 处理）
│   ├── favicon.svg            # 印記 logo
│   ├── robots.txt
│   ├── sitemap.xml            # 12 URLs, 手动维护
│   └── assets/                # v1 遗留资源（产品图、旧 JS/CSS）
│       ├── img/products/      # 7 张产品 PNG（待替换为 WebP）
│       ├── css/               # v1 样式（不再使用）
│       └── js/                # v1 脚本（不再使用）
│
├── src/
│   ├── styles/
│   │   ├── tokens.css         # Design tokens（颜色/字体/间距/阴影/动画）
│   │   ├── reset.css          # CSS reset
│   │   └── base.css           # 全局基础样式
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro   # 主布局（head/meta/JSON-LD/Umami/header/footer）
│   │   ├── StoryLayout.astro  # 叙事页布局（About 等长文）
│   │   └── LegalLayout.astro  # 法律页布局
│   │
│   ├── components/
│   │   ├── Header.astro       # 导航 + 语言切换 + 汉堡菜单
│   │   ├── Footer.astro       # 页脚 + 法律链接
│   │   ├── Hero.astro         # 首页 hero
│   │   ├── PhilosophySection.astro
│   │   ├── AboutPreview.astro
│   │   ├── ProductsSection.astro  # 7 产品 grid + 合规文案
│   │   ├── RestaurantSection.astro
│   │   ├── ChannelsSection.astro
│   │   └── ContactSection.astro   # Formspree + honeypot
│   │
│   └── pages/
│       ├── index.astro        # 根路径 → /ja/ 重定向（meta-refresh + JS fallback）
│       ├── 404.astro          # 双语 404（自包含）
│       ├── ja/
│       │   ├── index.astro    # 日文首页
│       │   ├── about/index.astro
│       │   ├── faq/index.astro
│       │   └── legal/
│       │       ├── privacy/index.astro
│       │       ├── terms/index.astro
│       │       └── transactions/index.astro
│       └── zh/                # 繁中（结构同 ja/）
│           ├── index.astro
│           ├── about/index.astro
│           ├── faq/index.astro
│           └── legal/...
│
├── brand/                     # 品牌内部文档（不对外发布）
│   ├── strategy.md            # Brand Strategy Brief
│   ├── tokens.md              # Design tokens 规范
│   ├── visual-assets.md       # 19 个图片位需求清单
│   ├── copy-ja.md             # 全站日文文案
│   ├── copy-zh.md             # 全站繁中文案
│   ├── copy-products.md       # 产品文案（含薬機法 NG 对照表）
│   ├── about-draft.md         # About 页草稿
│   └── logo/                  # Logo SVG 文件
│       ├── b-seal-icon.svg        # 选定方向：印記
│       ├── b-seal-icon-warm.svg
│       ├── b-seal-lockup.svg
│       ├── a-wordmark*.svg        # 备选方向 A
│       ├── c-geometric-*.svg      # 备选方向 C
│       └── comparison.md
│
└── docs/                      # 项目文档
    ├── STATUS.md              # ← 本文件
    ├── structure.md           # 文件架构说明（已更新）
    └── umami-setup.md         # Umami 部署指南
```

---

## 六、TODO（按优先级排列）

### P0 — 上线前必须完成

- [ ] **Umami 部署配置** — 用户在 Vercel 环境变量中填入 `PUBLIC_UMAMI_URL` 和 `PUBLIC_UMAMI_ID`，触发 Redeploy。操作文档：`docs/umami-setup.md`
- [ ] **产品图优化** — 当前 7 张 PNG 在 `public/assets/img/products/`，2048x2048，估算单张 500KB-1.5MB。需要：
  - 转 WebP 格式
  - 压缩至 ≤200KB/张
  - 生成 srcset 多尺寸（400/800/1200）
  - 添加 `loading="lazy"` 和有意义的 `alt` 文本
- [ ] **行政書士薬機法审查** — 产品文案虽已做安全化处理（见 `brand/copy-products.md`），但以下 7 个产品描述需专业法务确认再上线：
  - 経絡の道具（原：経絡治療儀）
  - 首のあたため（原：遠赤外線首マッサージ機）
  - よもぎの手棒（原：ヨモギハンマー）
  - 翡翠ビーズまくら / 竹炭ビーズまくら
  - なわとび
  - 手首ビーズまくら

### P1 — 短期（1-2 周内）

- [ ] **CEO 肖像照** — About 深度页 (`/ja/about/`, `/zh/about/`) 目前是纯文字。需要一张楊杰敏的肖像照，建议半身、自然光、暖色调。规格见 `brand/visual-assets.md` slot #12。
- [ ] **生活方式照片** — 全站目前无 lifestyle imagery。`brand/visual-assets.md` 定义了 19 个图片位，优先补充：
  - Hero 背景（slot #1）
  - Philosophy 配图（slot #2）
  - About preview 配图（slot #7）
  - 产品使用场景（slot #8-#11，至少 2 张）
- [ ] **渠道深链接** — Yahoo Shopping / Rakuten Market 的具体商品 URL，需用户提供后填入 `ChannelsSection.astro`
- [ ] **v1 遗留文件清理** — `public/assets/` 下的旧 JS/CSS 文件（`i18n.js`, `business.js`, `main.js`, `styles.css` 等）已不被 v2 引用，可以删除以减小部署体积

### P2 — 中期（上线后）

- [ ] **内容板块（blog / 養生コラム）** — Content SEO 长期资产，需要确定内容策略和更新频率
- [ ] **Newsletter 订阅** — 计划用 Buttondown（免费 100 subs），需确认是否启动
- [ ] **Cloudflare DNS 迁移** — 当前保持 Vercel 全栈；未来有安全/带宽需求时可仅迁 DNS 层
- [ ] **客户证言 / 第三方背书** — 信任信号，需收集真实客户反馈
- [ ] **产品详情页** — 当前产品都是卡片式展示，无独立详情页。如需展示更多信息（成分/规格/使用方法/注意事项），需建产品详情页模板

### P3 — 长期

- [ ] **完整 Design System** — 当前有 tokens + 组件，但无正式组件文档
- [ ] **自动化测试** — 无 CI/CD 测试，无 Lighthouse CI
- [ ] **CMS 集成** — 如果内容更新频率高，可考虑 headless CMS
- [ ] **GA4 备用** — 如果 Umami 不够用，可并行接入 GA4

---

## 七、关键技术笔记（方便接手）

### 双语路由

Astro i18n 配置 `prefixDefaultLocale: true`，日文和繁中都有前缀：
- 日文：`/ja/`、`/ja/about/`、`/ja/faq/`
- 繁中：`/zh/`、`/zh/about/`、`/zh/faq/`
- 根路径 `/` 通过 `vercel.json` 308 重定向到 `/ja/`

### 添加新页面

1. 在 `src/pages/ja/` 和 `src/pages/zh/` 下各创建对应 `.astro` 文件
2. 使用 `BaseLayout`（普通页）、`StoryLayout`（叙事页）或 `LegalLayout`（法律页）
3. 在 `Header.astro` 的 `nav` 数组中添加导航条目
4. 在 `public/sitemap.xml` 中添加 URL（含 hreflang 标注）
5. 运行 `npm run build` 验证

### 添加新组件

1. 在 `src/components/` 创建 `.astro` 文件
2. Props 用 `interface Props` 定义，至少包含 `locale: 'ja' | 'zh'`
3. 组件内双语文案用 `const t = { ja: {...}, zh: {...} }` 模式
4. 样式用 `<style>` scoped，引用 `tokens.css` 中的 CSS 变量

### 薬機法红线

产品描述中 **绝对不能出现** 的词：
- 治療 / 治す / 改善 / 効果 / マッサージ / 医療 / 健康促進
- ほぐす / リラックス / 疲労回復 / 血行促進 / 睡眠をサポート
- コリ / 痛み / 不調 / 症状

安全替代策略：描述物理特征和使用场景，不描述人体效果。
详见 `brand/copy-products.md` 中的 NG → OK 对照表。

### 常用命令

```bash
npm run dev       # 本地开发服务器 (localhost:4321)
npm run build     # 构建（含 astro check 类型检查）
npm run preview   # 预览构建结果
npm run check     # 仅类型检查
```

---

## 八、联系方式 & 参考

- Formspree dashboard: https://formspree.io/forms (登录查看提交记录)
- Vercel dashboard: https://vercel.com (太旺旺项目 + Umami 项目)
- Neon dashboard: https://console.neon.tech (Umami 数据库)
- Umami dashboard: 部署后的 Vercel 域名
- 域名管理: taiwannwann.co.jp 的注册商后台
