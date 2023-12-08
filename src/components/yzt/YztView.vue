<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-26 19:36:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-08 14:45:27
 * @FilePath: \DW-Systems\src\components\yzt\YztView.vue
 * @Description: 一张图页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import LeftView from './LeftView.vue';
import MapView from '@/components/common/MapView.vue';
import bus from 'vue3-eventbus'

//初始化left-page的样式
const leftPageStyle = ref({
      left: '-23%'
});

onMounted(() => {
      //默认窗口显示
      leftPageStyle.value.left = 0;
      //根据点击事件判断窗口是否显示
      bus.on('windowVisible', (value) => {
            if (value) {
                  leftPageStyle.value.left = '-23%';
            } else {
                  leftPageStyle.value.left = 0;
            }
      })
})
</script>

<template>
      <div class="main-page">
            <div class="map-page">
                  <MapView></MapView>
            </div>
            <div class="left-page" :style="leftPageStyle">
                  <LeftView></LeftView>
            </div>
      </div>
</template>

<style scoped lang="scss">
.main-page {
      width: 100%;
      height: 100%;
      margin: 0;

      .map-page {
            width: 100%;
            height: 100%;
            z-index: 0;
      }

      .left-page {
            position: fixed;
            top: 70px;
            width: 23%;
            height: calc(100% - 70px);
            transition: left 1s linear;
      }
}
</style>