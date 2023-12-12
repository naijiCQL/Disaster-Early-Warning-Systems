<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-26 19:36:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-11 16:28:19
 * @FilePath: \DW-Systems\src\components\yzt\YztView.vue
 * @Description: 一张图页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import LeftView from './LeftView.vue';
import RightView from './RightView.vue';
import MapView from '@/components/common/MapView.vue';

</script>

<template>
      <div class="main-page">
            <!-- 底层地图页面 -->
            <div class="map-page">
                  <MapView></MapView>
            </div>
            <!-- 左侧页面 -->
            <div>

                  <LeftView></LeftView>
            </div>
            <!-- 右侧页面 -->
            <div>
                  <RightView></RightView>
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
}
</style>