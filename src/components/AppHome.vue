<!--
  - @FileDescription 页面主体
  - @Author 王明
  - @Date 2021年1月4日
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-11-27 21:04:33
-->
<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHeader></HomeHeader>
    <!-- 内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import HomeHeader from './header/HeaderView.vue'
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}

.content {
  width: 100vw;
  height: calc(100vh - 70px);
  display: flex;
}
</style>