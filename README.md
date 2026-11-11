# build-uniapp

基于 uni-app (Vue 3 + Vite) 的跨平台项目，支持 H5、微信小程序、抖音小程序等多端运行。

## 在线演示

访问 https://chenxin-code.github.io/build-uniapp/

**注意：** 由于 GitHub Pages 是静态托管，无法配置 API 代理，且百度新闻和淘宝搜索接口不支持 CORS，因此生产环境无法调用接口。本地开发和小程序端可正常使用。

## 自动部署

推送代码到 `master` 分支后，GitHub Actions 会自动构建 H5 并部署到 `gh-pages` 分支。

部署流程：
1. push 代码到 master 分支
2. GitHub Actions 自动触发构建
3. 构建产物部署到 `gh-pages` 分支
4. GitHub Pages 从 `gh-pages` 分支提供服务

## 功能

- API 测试页面（百度新闻、淘宝搜索提示）
- 统一使用 `uni.request` 进行网络请求，全平台兼容
- 开发环境通过 Vite proxy 解决跨域，生产环境直接请求目标 URL
- 弹窗展示表格数据，支持链接跳转（H5 新窗口打开，小程序 web-view）
- 输入校验、清空按钮、表格数据重置等交互优化

## 开发

```bash
# 安装依赖
npm install

# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# 抖音小程序开发
npm run dev:mp-toutiao
```

### 小程序运行说明

1. 执行对应平台的 dev 命令（如 `npm run dev:mp-toutiao`）
2. 打开对应开发者工具（微信开发者工具 / 抖音开发者工具）
3. 导入 `dist/dev/mp-weixin` 或 `dist/dev/mp-toutiao` 目录
4. 开发阶段可在开发者工具中勾选「不校验合法域名」以跳过域名配置

## 构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin

# 抖音小程序构建
npm run build:mp-toutiao
```

## 技术栈

- Vue 3
- Vite
- uni-app
- uni.request（统一网络请求）

## 支持平台

- H5
- 微信小程序
- 抖音小程序
- 支付宝小程序
- 百度小程序
- QQ 小程序
- 快手小程序
- 小红书小程序
- 飞书小程序
- 京东小程序
