# 目录结构说明（v2.0）

> 更新于 2026-05-18。v1 结构已废弃，v2 基于 Astro 4.16 SSG。

## 技术栈

| 角色 | 选型 |
|---|---|
| SSG 框架 | Astro 4.16 + TypeScript strict |
| 分析 | Umami 自托管 (Vercel + Neon PostgreSQL) |
| 表单 | Formspree + honeypot 反垃圾 |
| 托管 | Vercel (免费 Hobby) |
| CSS 架构 | tokens.css → reset.css → base.css + scoped component styles |
| 图像 | 暂为 public/ 静态 PNG，待迁移至 astro:assets |

## 源码结构

```
src/
├── styles/
│   ├── tokens.css         # 全局 design tokens（颜色/字体/间距/阴影/动效）
│   ├── reset.css          # 浏览器样式重置
│   └── base.css           # 全局排版与通用样式
│
├── layouts/
│   ├── BaseLayout.astro   # 主布局：<head> meta + JSON-LD + Umami + Header + Footer
│   ├── StoryLayout.astro  # 叙事长文布局（About 页等）
│   └── LegalLayout.astro  # 法律页布局（隐私/特商法/利用规约）
│
├── components/
│   ├── Header.astro       # 粘性导航栏 + 双语切换 + 移动端汉堡菜单
│   ├── Footer.astro       # 页脚：法律链接 + 版权
│   ├── Hero.astro         # 首页 hero 区
│   ├── PhilosophySection.astro    # 品牌理念
│   ├── AboutPreview.astro         # CEO 故事预览 → /about/
│   ├── ProductsSection.astro      # 产品 grid（7 个，薬機法安全文案）
│   ├── RestaurantSection.astro    # 餐饮事业 Coming Soon
│   ├── ChannelsSection.astro      # 销售渠道卡片
│   └── ContactSection.astro       # 联系表单 (Formspree)
│
└── pages/
    ├── index.astro        # / → /ja/ 重定向
    ├── 404.astro          # 双语 404
    ├── ja/                # 日文版
    │   ├── index.astro
    │   ├── about/index.astro
    │   ├── faq/index.astro
    │   └── legal/{privacy,terms,transactions}/index.astro
    └── zh/                # 繁中版（结构同 ja/）
```

## 静态资源

```
public/
├── favicon.svg            # 品牌印記 logo
├── robots.txt
├── sitemap.xml            # 手动维护，12 URLs
└── assets/img/products/   # 产品图（v1 遗留 PNG，待优化为 WebP）
```

## 品牌文档（内部，不对外发布）

```
brand/
├── strategy.md            # Brand Strategy Brief
├── tokens.md              # Design tokens 规范文档
├── visual-assets.md       # 19 个图片位需求清单
├── copy-ja.md             # 全站日文文案
├── copy-zh.md             # 全站繁中文案
├── copy-products.md       # 产品文案 + 薬機法 NG/OK 对照表
├── about-draft.md         # About 页内容草稿
└── logo/                  # Logo SVG（3 个方向，B 已选定）
```

## 项目文档

```
docs/
├── STATUS.md              # 工作记录 + TODO + 技术笔记
├── structure.md           # ← 本文件
└── umami-setup.md         # Umami 部署指南（Vercel + Neon）
```

## 双语路由规则

所有页面都有 `/ja/` 和 `/zh/` 前缀，无无前缀版本。根路径 `/` 通过 `vercel.json` 边缘 308 重定向到 `/ja/`。

| 页面 | 日文 URL | 繁中 URL |
|---|---|---|
| 首页 | `/ja/` | `/zh/` |
| 关于 | `/ja/about/` | `/zh/about/` |
| FAQ | `/ja/faq/` | `/zh/faq/` |
| 隐私政策 | `/ja/legal/privacy/` | `/zh/legal/privacy/` |
| 利用规约 | `/ja/legal/terms/` | `/zh/legal/terms/` |
| 特商法 | `/ja/legal/transactions/` | `/zh/legal/transactions/` |

## 组件双语模式

每个组件接收 `locale: 'ja' | 'zh'` prop，内部用查表切换文案：

```astro
---
const { locale } = Astro.props;
const t = {
  ja: { title: '日文标题', ... },
  zh: { title: '繁中标题', ... },
} as const;
const localeT = t[locale];
---
<h2>{localeT.title}</h2>
```

## 常用命令

```bash
npm run dev       # 开发服务器 localhost:4321
npm run build     # 类型检查 + 生产构建
npm run preview   # 预览构建产物
npm run check     # 仅 astro check
```
