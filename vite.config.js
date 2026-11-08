import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/build-uniapp/',
  plugins: [
    uni(),
  ],
  server: {
    proxy: {
      // 百度新闻
      '/baiduNews/': {
        target: 'https://news.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduNews\//, ''),
      },
      // 淘宝搜索提示
      '/taobaoSearchSuggest/': {
        target: 'https://suggest.taobao.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/taobaoSearchSuggest\//, ''),
      },
    },
  },
})
