<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button class="nav-btn" @click="goToTestApi">API 测试页面</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {
    goToTestApi() {
      uni.navigateTo({
        url: '/pages/test-api/index'
      });
    }
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.nav-btn {
  margin-top: 50rpx;
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  font-size: 28rpx;
}
</style>
