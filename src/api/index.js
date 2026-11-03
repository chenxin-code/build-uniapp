// ----------------------------------------- 百度新闻 -----------------------------------------//

// 百度新闻请求
export const baiduNews = (config) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    // H5 使用 axios
    import('axios').then(({ default: axios }) => {
      const instance = axios.create({
        baseURL: '/baiduNews/',
        timeout: 5000,
      });
      instance(config).then(resolve).catch(reject);
    });
    // #endif

    // #ifdef MP-WEIXIN
    // 小程序使用 wx.request
    const params = config.params || {};
    const queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
    const url = `https://news.baidu.com/${config.url}?${queryString}`;
    
    wx.request({
      url: url,
      method: config.method || 'GET',
      success: (res) => {
        resolve({ data: res.data });
      },
      fail: (err) => {
        reject(err);
      }
    });
    // #endif
  });
};

// ----------------------------------------- 淘宝搜索提示 -----------------------------------------//

// 淘宝搜索提示请求
export const taobaoSearchSuggest = (config) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    // H5 使用 axios
    import('axios').then(({ default: axios }) => {
      const instance = axios.create({
        baseURL: '/taobaoSearchSuggest/',
        timeout: 5000,
      });
      instance(config).then(resolve).catch(reject);
    });
    // #endif

    // #ifdef MP-WEIXIN
    // 小程序使用 wx.request
    const params = config.params || {};
    const queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
    const url = `https://suggest.taobao.com/${config.url}?${queryString}`;
    
    wx.request({
      url: url,
      method: config.method || 'GET',
      success: (res) => {
        resolve({ data: res.data });
      },
      fail: (err) => {
        reject(err);
      }
    });
    // #endif
  });
};
