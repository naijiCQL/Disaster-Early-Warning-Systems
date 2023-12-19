<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-19 15:54:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-19 16:11:31
 * @FilePath: \DW-Systems\src\components\common\tools\MapTool.vue
 * @Description: 地图工具
-->
<script setup>
import { ref, defineProps, onMounted } from "vue";

let selectVisible = ref(false)

const props = defineProps({
    select: Boolean
})

onMounted(() => {
    selectVisible.value = props.select
})
</script>
<template>
    <div class="map-tool">
        <div v-if="selectVisible" class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
            <img src="/markerIcon/tool/ss.png" title="搜索" />
        </div>
        <div class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
            <img src="/markerIcon/tool/tc.png" title="图层管理" />
        </div>
        <div class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
            <img src="/markerIcon/tool/cjl.png" title="距离量算" />
        </div>
        <div class="tool">
            <img src="/markerIcon/tool/cmj.png" title="面积量算" />
        </div>
    </div>
</template>
<style scoped lang="scss">
.map-tool {
    width: 100%;
    display: flex;
    align-items: center;
    display: flex;
    height: 28px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.8);
    justify-content: space-between;
    line-height: 8px;
    padding: 0 5px;
    cursor: pointer;

    .tool {
        width: 35%;
    }
}
</style>