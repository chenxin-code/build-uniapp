import axios from 'axios';

// ----------------------------------------- 百度新闻 -----------------------------------------//

// 创建 axios 实例
export const baiduNews = axios.create({
  baseURL: '/baiduNews/',
  timeout: 5000,
});

// 请求拦截
baiduNews.interceptors.request.use(config => {
  console.log('请求拦截', 'config', config);
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截
baiduNews.interceptors.response.use(response => {
  console.log('响应拦截', 'response', response);
  return response;
}, error => {
  return Promise.reject(error);
});

// ----------------------------------------- 淘宝搜索提示 -----------------------------------------//

// 创建 axios 实例
export const taobaoSearchSuggest = axios.create({
  baseURL: '/taobaoSearchSuggest/',
  timeout: 5000,
});
