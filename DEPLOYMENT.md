# 部署与故障诊断（Nginx 静态站）

该仓库是纯静态站点（`index.html` + `style.css` + 图片资源），不需要 Node/Python 运行时。

## 你截图中的错误意味着什么

截图文案是 Nginx 默认错误页（“抱歉，您要访问的页面目前无法访问。请稍后再试。”），通常说明：

1. **Nginx 命中了这个 server 块，但 root/alias 指向了错误目录**，导致找不到 `index.html`。
2. **`index` 配置不正确**，例如没包含 `index.html`。
3. **权限问题**：Nginx 用户（常见 `www-data`）无法读取站点目录。
4. **location 配置被误写**（如 `try_files` 不当、反向代理 upstream 挂了）。
5. **HTTPS 证书或 443 server_name 配置不一致**，请求落到错误虚拟主机。

---

## 最小可用 Nginx 配置（建议）

假设你把仓库内容部署到 `/var/www/taiwannwann`：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name taiwannwann.co.jp www.taiwannwann.co.jp;

    # 按你的证书实际路径替换
    ssl_certificate     /etc/letsencrypt/live/taiwannwann.co.jp/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/taiwannwann.co.jp/privkey.pem;

    root /var/www/taiwannwann;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(png|jpg|jpeg|gif|svg|css|js|ico|webp)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

> 如果你不是单页应用，也可以把 `try_files` 改为 `try_files $uri $uri/ =404;`。

---

## 服务器上按顺序排查

```bash
# 1) 检查站点文件是否在预期目录
ls -lah /var/www/taiwannwann

# 2) 检查 Nginx 配置语法
nginx -t

# 3) 查看生效配置（确认 server_name / root / index）
nginx -T | sed -n '/server_name .*taiwannwann.co.jp/,+60p'

# 4) 检查文件权限（nginx 用户要可读）
namei -l /var/www/taiwannwann/index.html

# 5) 查看错误日志（最关键）
tail -n 200 /var/log/nginx/error.log

# 6) 重载服务
systemctl reload nginx
```

---

## 仓库内容快速自检（本地）

本仓库包含 `scripts/verify-static-site.sh`：

```bash
bash scripts/verify-static-site.sh
```

该脚本会检查 `index.html` 中引用的本地资源是否都存在。
