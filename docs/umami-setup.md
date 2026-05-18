# Umami Analytics — Vercel 部署指南

> 本文档说明如何将 Umami 自托管到 Vercel，并接入太旺旺网站。

---

## 概要

| 项目 | 选型 |
|---|---|
| Analytics 引擎 | [Umami v2](https://umami.is/) (MIT, 自托管) |
| 应用托管 | Vercel (免费 Hobby 档) |
| 数据库 | PostgreSQL — 推荐 [Neon](https://neon.tech/) 免费档 (0.5 GB) |
| 成本 | $0/月 (Vercel Hobby + Neon Free) |

---

## Step 1 — 创建 PostgreSQL 数据库 (Neon)

1. 前往 <https://console.neon.tech/> 注册 / 登录
2. 点击 **New Project**
   - Project name: `umami-taiwannwann`
   - Region: **Asia Pacific (Tokyo)** (离用户最近)
   - 其余保持默认，点击 **Create Project**
3. 创建完成后，在 Dashboard → **Connection Details** 拷贝 **Connection string**
   格式类似：
   ```
   postgresql://neondb_owner:xxxxxxxx@ep-xxx-xxx-123456.ap-northeast-1.aws.neon.tech/neondb?sslmode=require
   ```
   > 这就是后面要填的 `DATABASE_URL`。

---

## Step 2 — 一键部署 Umami 到 Vercel

1. 打开 Umami 官方一键部署链接：

   <https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fumami-software%2Fumami&project-name=umami-taiwannwann&env=DATABASE_URL>

2. Vercel 会要求你填一个环境变量：
   - **`DATABASE_URL`** — 粘贴 Step 1 获得的 Neon 连接字符串
3. 点击 **Deploy**，等待构建完成（约 2-3 分钟）
4. 部署成功后，Vercel 会给你一个域名，如：
   ```
   https://umami-taiwannwann.vercel.app
   ```

---

## Step 3 — 首次登录 Umami

1. 访问你的 Umami 域名，进入登录页
2. 默认管理员账号：
   - Username: `admin`
   - Password: `umami`
3. **登录后立即修改密码**：Settings → Profile → Change Password

---

## Step 4 — 添加网站

1. 登录后，进入 **Settings → Websites → Add website**
2. 填写：
   - **Name**: `太旺旺`
   - **Domain**: `taiwannwann.co.jp`
3. 保存后，点击刚创建的网站条目，进入 **Tracking code** 页面
4. 你会看到类似：
   ```html
   <script defer src="https://umami-taiwannwann.vercel.app/script.js" data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></script>
   ```
5. 记录这两个值：
   - **Umami URL**: `https://umami-taiwannwann.vercel.app` (不含 `/script.js`)
   - **Website ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## Step 5 — 配置太旺旺网站环境变量

### 方法 A — Vercel 控制台 (推荐生产环境)

1. 打开太旺旺的 Vercel 项目 → **Settings → Environment Variables**
2. 添加两个变量 (Scope: Production + Preview)：

   | Key | Value |
   |---|---|
   | `PUBLIC_UMAMI_URL` | `https://umami-taiwannwann.vercel.app` |
   | `PUBLIC_UMAMI_ID` | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

3. 触发一次 **Redeploy** 使变量生效

### 方法 B — 本地开发测试

在项目根目录创建 `.env` 文件：

```env
PUBLIC_UMAMI_URL=https://umami-taiwannwann.vercel.app
PUBLIC_UMAMI_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

> `.env` 已在 `.gitignore` 中，不会被提交。

---

## Step 6 — 验证

1. 部署后打开 <https://taiwannwann.co.jp/ja/>
2. 打开浏览器开发者工具 → Network 面板
3. 搜索 `script.js` — 应该能看到一个请求发往你的 Umami 域名
4. 回到 Umami Dashboard — 应该能看到实时访客数据

---

## 可选：自定义域名

如果不想让 Umami 使用 `*.vercel.app` 域名：

1. Vercel → Umami 项目 → Settings → Domains
2. 添加子域名，例如 `analytics.taiwannwann.co.jp`
3. 在 DNS 添加对应 CNAME 记录指向 `cname.vercel-dns.com`

---

## 常见问题

**Q: Neon 免费档够用吗？**
A: 免费档有 0.5 GB 存储和 190 小时/月计算时间。对一般企业官网来说绰绰有余，日均数千 PV 以内完全没有问题。

**Q: 数据多久保留？**
A: Umami 默认永久保留。可以在 Settings 中设置自动清理旧数据。

**Q: 会影响网站性能吗？**
A: script.js 仅 ~2KB gzip，异步加载 (`defer`)，对 LCP/INP 无影响。

**Q: 需要 Cookie 同意弹窗吗？**
A: 不需要。Umami 不使用 Cookie，不收集个人识别信息，天然 GDPR/CCPA 合规。

---

## 架构图

```
[用户浏览器]
    │
    ├── taiwannwann.co.jp    (太旺旺主站 — Vercel)
    │
    └── script.js request ──→ umami-taiwannwann.vercel.app  (Umami — Vercel)
                                       │
                                       └──→ Neon PostgreSQL (Tokyo)
```
