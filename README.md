# Taiwannwann

Taiwannwann 公司网站和相关材料。

## 项目结构

- `index.html`：站点主页
- `style.css`：样式文件
- `*.png`：页面图片资源
- `DEPLOYMENT.md`：Nginx 部署与故障诊断手册
- `scripts/verify-static-site.sh`：静态资源引用完整性检查脚本

## 本地检查

```bash
bash scripts/verify-static-site.sh
```

## 部署排障

部署失败时请先阅读：

- `DEPLOYMENT.md`
