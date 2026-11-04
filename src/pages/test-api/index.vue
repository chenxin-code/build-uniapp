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

    <!-- 结果预览弹窗 -->
    <div v-if="dialogVisible" class="dialog-overlay" @click="dialogVisible = false">
      <div class="dialog-container" @click.stop>
        <div class="dialog-header">
          <text class="dialog-title">{{ dialogTitle }}</text>
        </div>
        <div class="dialog-body">
          <div class="dialog-stats">共 <text class="stats-number">{{ resultCount }}</text> 条数据</div>
          <div class="table-container">
            <div class="table-wrapper">
              <!-- 表头 -->
              <div class="table-row table-header">
                <div class="table-cell" v-for="(header, idx) in tableHeaders" :key="idx">{{ header.label }}</div>
              </div>
              <!-- 数据行 -->
              <div class="table-row" v-for="(row, rowIdx) in tableData" :key="rowIdx" :class="{ 'stripe-even': rowIdx % 2 === 1 }">
                <div class="table-cell" v-for="(header, colIdx) in tableHeaders" :key="colIdx">{{ row[header.key] }}</div>
              </div>
            </div>
          </div>
          <div class="json-container">
            <text class="json-content">{{ jsonContent }}</text>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="dialogVisible = false">关 闭</button>
        </div>
      </div>
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
      dialogVisible: false,
      dialogTitle: '',
      tableHeaders: [],
      tableData: [],
      jsonContent: '',
    };
  },
  computed: {
    resultCount() {
      return this.tableData.length;
    },
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
        this.showResultDialog('百度新闻', resp.data);
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
        this.showResultDialog('淘宝搜索提示', resp.data);
      }).catch(err => {
        console.error('taobaoSearchSuggest error:', err);
        this.taobaoSearchSuggestResp = { error: err.message };
      });
    },
    showResultDialog(title, data) {
      this.dialogTitle = title;
      
      // 解析数据为表格格式
      let items = [];
      if (title === '百度新闻') {
        // 百度新闻数据结构：data.data.LocalNews.data
        const localNews = data?.data?.LocalNews?.data;
        
        // 取 rows.first 和 rows.second 字段，合并展示
        const first = Array.isArray(localNews?.rows?.first) ? localNews.rows.first : [];
        const second = Array.isArray(localNews?.rows?.second) ? localNews.rows.second : [];
        items = [...first, ...second];
        
        if (items.length > 0 && typeof items[0] === 'object') {
          this.tableHeaders = [
            { key: 'title', label: '标题' },
            { key: 'time', label: '时间' },
            { key: 'url', label: '链接' },
          ];
          this.tableData = items.map(item => ({
            title: item.title || '',
            time: item.time || '',
            url: item.url || '',
          }));
        }
      } else if (title === '淘宝搜索提示') {
        // 淘宝搜索提示数据结构：result 数组，可能是 [['词', 热度], ...] 或 [{...}, ...]
        items = Array.isArray(data) ? data : (data.result || []);
        if (items.length > 0) {
          if (Array.isArray(items[0])) {
            // 二维数组：[['搜索词', 热度], ...]
            this.tableHeaders = [
              { key: '0', label: '搜索词' },
              { key: '1', label: '热度' },
            ];
            this.tableData = items.map(item => ({ '0': item[0], '1': item[1] }));
          } else if (typeof items[0] === 'object') {
            const keys = Object.keys(items[0]);
            this.tableHeaders = keys.map(key => ({ key, label: key }));
            this.tableData = items;
          } else {
            // 如果是字符串数组
            this.tableHeaders = [{ key: 'value', label: '搜索提示' }];
            this.tableData = items.map(item => ({ value: item }));
          }
        }
      }
      
      this.jsonContent = JSON.stringify(data);
      this.dialogVisible = true;
    },
  },
  mounted() {
    // 预加载数据，但不显示弹窗
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

/* 弹窗样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.dialog-container {
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dialog-header {
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.dialog-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.dialog-stats {
  margin-bottom: 16px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}

.stats-number {
  color: #409eff;
  font-size: 18px;
  font-weight: 600;
}

.table-container {
  margin-bottom: 16px;
}

.table-wrapper {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.table-row:last-child {
  border-bottom: none;
}

.table-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #ebeef5 100%);
}

.table-header .table-cell {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
}

.stripe-even {
  background-color: #fafafa;
}

.table-cell {
  flex: 1;
  padding: 12px 8px;
  text-align: center;
  font-size: 13px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.json-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e1f3d8;
  border-radius: 4px;
  padding: 12px;
  background-color: #f0f9eb;
}

.json-content {
  font-family: monospace;
  font-size: 12px;
  word-break: break-all;
  white-space: pre-wrap;
  color: #67c23a;
}

.dialog-footer {
  padding: 12px 20px;
  border-top: 1px solid #ebeef5;
  text-align: center;
}

.btn-close {
  padding: 8px 20px;
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-close:hover {
  color: #409eff;
  border-color: #409eff;
}
</style>
