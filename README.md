# build-uniapp

基于 uni-app (Vue 3 + Vite) 的跨平台项目，支持 H5 和微信小程序。

## 功能

- API 测试页面（百度新闻、淘宝搜索提示）
- 跨平台 API 适配（H5 使用 axios，小程序使用 wx.request）

## 开发

```bash
# 安装依赖
npm install

# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin
```

## 构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin
```

## 技术栈

- Vue 3
- Vite
- uni-app
- Axios（H5 HTTP 请求）
