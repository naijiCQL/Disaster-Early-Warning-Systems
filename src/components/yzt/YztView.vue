<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-26 19:36:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-22 15:35:49
 * @FilePath: \DW-Systems\src\components\yzt\YztView.vue
 * @Description: 一张图页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import LeftView from './LeftView.vue';
import RightView from './RightView.vue';
import MapView from '@/components/common/MapView.vue';
import JcdglView from '@/components/common/dialog/JcdglView.vue';
import YjxxglView from '@/components/common/dialog/YjxxglView.vue';

const syOlMap = ref('')

onMounted(() => {
      syOlMap.value.getLayerData()
})

</script>

<template>
      <div class="main-page">
            <!-- 底层地图页面 -->
            <div class="map-page">
                  <MapView ref='syOlMap' :id="'olMap1'"></MapView>
            </div>
            <div>
                  <!-- 左侧页面 -->
                  <LeftView></LeftView>
                  <!-- 右侧页面 -->
                  <RightView></RightView>
                  <!-- 监测点信息列表页面 -->
                  <JcdglView></JcdglView>
                  <!-- 预警信息列表 -->
                  <YjxxglView></YjxxglView>
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