const request = (baseURL, config) => {
  return new Promise((resolve, reject) => {
    const params = config.params || {};
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    // #ifdef H5
    // 开发环境走代理
    const url = `${baseURL.proxy}${config.url}?${queryString}`;
    // #endif
    
    // #ifndef H5
    // 非 H5 环境直接请求
    const url = `${baseURL.direct}${config.url}?${queryString}`;
    // #endif

    uni.request({
      url,
      method: config.method || 'GET',
      success: (res) => {
        resolve({ data: res.data });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

// ----------------------------------------- 百度新闻 -----------------------------------------//

const baiduNewsBaseURL = {
  proxy: '/baiduNews/',
  direct: 'https://news.baidu.com/',
};

export const baiduNews = (config) => {
  return request(baiduNewsBaseURL, config);
};

// ----------------------------------------- 淘宝搜索提示 -----------------------------------------//

const taobaoBaseURL = {
  proxy: '/taobaoSearchSuggest/',
  direct: 'https://suggest.taobao.com/',
};

export const taobaoSearchSuggest = (config) => {
  return request(taobaoBaseURL, config);
};
