<template>
  <view class="container">
    <!-- #ifdef H5 -->
    <div class="h5-tip">
      <text>H5 环境请直接使用浏览器打开</text>
    </div>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <web-view :src="url"></web-view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    };
  },
  onLoad(options) {
    if (options.url) {
      this.url = decodeURIComponent(options.url);
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}

.h5-tip {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
