<template>
  <div class="container">
    <div class="tabs">
      <div 
        class="tab-item" 
        :class="{ active: activeName === '百度新闻' }"
        @click="activeName = '百度新闻'"
      >
        百度新闻
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeName === '淘宝搜索提示' }"
        @click="activeName = '淘宝搜索提示'"
      >
        淘宝搜索提示
      </div>
    </div>

    <div class="tab-content">
      <!-- 百度新闻 -->
      <div v-if="activeName === '百度新闻'" class="tab-pane">
        <button class="btn-primary" @click="getBaiduNews()">GET 百度新闻</button>
      </div>

      <!-- 淘宝搜索提示 -->
      <div v-if="activeName === '淘宝搜索提示'" class="tab-pane">
        <input 
          v-model="query" 
          placeholder="请输入内容" 
          class="search-input"
        />
        <button class="btn-primary" @click="getTaobaoSearchSuggest()">GET 淘宝搜索</button>
      </div>
    </div>

    <!-- 百度新闻结果 -->
    <div v-if="baiduNewsResp" class="result-box">
      <div class="result-title">百度新闻</div>
      <div class="result-content">{{ JSON.stringify(baiduNewsResp, null, 2) }}</div>
    </div>

    <!-- 淘宝搜索提示结果 -->
    <div v-if="taobaoSearchSuggestResp" class="result-box">
      <div class="result-title">淘宝搜索提示</div>
      <div class="result-content">{{ JSON.stringify(taobaoSearchSuggestResp, null, 2) }}</div>
    </div>
  </div>
</template>

<script>
import { baiduNews, taobaoSearchSuggest } from '@/api';

export default {
  data() {
    return {
      activeName: '百度新闻',
      query: '热干面',
      baiduNewsResp: null,
      taobaoSearchSuggestResp: null,
    };
  },
  methods: {
    getBaiduNews() {
      baiduNews({
        method: 'get',
        url: 'widget',
        params: {
          id: 'LocalNews',
          loc: 5496,
          ajax: 'json',
        },
      }).then(resp => {
        console.log('baiduNewsResp', resp.data);
        this.baiduNewsResp = resp.data;
      }).catch(err => {
        console.error('baiduNews error:', err);
        this.baiduNewsResp = { error: err.message };
      });
    },
    getTaobaoSearchSuggest() {
      taobaoSearchSuggest({
        method: 'get',
        url: 'sug',
        params: {
          code: 'utf-8',
          q: this.query,
        },
      }).then(resp => {
        console.log('taobaoSearchSuggestResp', resp.data);
        this.taobaoSearchSuggestResp = resp.data;
      }).catch(err => {
        console.error('taobaoSearchSuggest error:', err);
        this.taobaoSearchSuggestResp = { error: err.message };
      });
    }
  },
  mounted() {
    this.getBaiduNews();
    this.getTaobaoSearchSuggest();
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.tabs {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-item {
  flex: 1;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.tab-item.active {
  color: #409eff;
  border-bottom-color: #409eff;
  background-color: #f0f9ff;
}

.tab-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-pane {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #409eff;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.btn-primary:active {
  background-color: #3a8ee6;
}

.result-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.result-content {
  font-size: 14px;
  color: #606266;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}
</style>
