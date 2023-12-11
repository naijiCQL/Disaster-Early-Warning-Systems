<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-11 10:40:48
 * @FilePath: \DW-Systems\src\components\common\LegendView.vue
 * @Description: 设备图例页面
-->
<script setup>
import { onMounted } from 'vue';

const markers = [];

const fileName = ['次声', '地表位移', '气压', '多参数', '振动', '多维度深部位移', '基站', '加速度', '喇叭', '孔隙水压力', '裂缝', '泥(水)位', '气温', '倾角', '视频', '深部位移', '雨量', '土壤含水率']

//批量获取图标位置
function getFileValue() {
    fileName.forEach((e) => {
        let currentElement = `/markerIcon/jcsbIcon/${e}.png`
        const element = {
            icon: currentElement,
            text: e
        }
        markers.push(element)
    })
};

onMounted(() => {
    const container = document.getElementById('markerContainer');
    //获取元素位置
    getFileValue()
    //设置里面元素的css样式
    markers.forEach(markerData => {
        const marker = document.createElement('div');
        marker.className = 'marker';

        const img = document.createElement('img');
        img.src = markerData.icon;

        const span = document.createElement('span');
        span.textContent = markerData.text;

        marker.appendChild(img);
        marker.appendChild(span);
        container.appendChild(marker);
    });

    // 获取 .content 元素的引用
    const contentElement = document.getElementById('markerContainer');
    // 添加样式
    contentElement.style.height = 'calc(100% - 36px)';
    contentElement.style.width = '100%';
    contentElement.style.backgroundColor = 'white';
    contentElement.style.display = 'flex';
    contentElement.style.flexWrap = 'wrap';

    // 获取所有 .marker 元素的引用
    const markerElements = document.querySelectorAll('.content .marker');

    // 遍历 .marker 元素并添加样式
    markerElements.forEach((markerElement, index) => {
        markerElement.style.display = 'flex';
        markerElement.style.alignItems = 'center';

        // 根据奇偶性设置不同的宽度
        if (index % 2 === 0) {
            markerElement.style.width = '40%';
        } else {
            markerElement.style.width = '60%';
        }

        markerElement.style.height = '10%';

        // 获取 .marker 中的 img 和 span 元素的引用
        const imgElement = markerElement.querySelector('img');
        const spanElement = markerElement.querySelector('span');

        // 添加样式给 img 和 span 元素
        if (imgElement) {
            imgElement.style.width = '16px';
            imgElement.style.height = '16px';
            imgElement.style.marginLeft = '8px';
            imgElement.style.marginRight = '5px';
        }

        if (spanElement) {
            spanElement.style.fontSize = '12px';
        }
    });


})

</script>

<template>
    <div class="title">
        <span>设备图例</span>
    </div>
    <div class="content" id="markerContainer">

    </div>
</template>

<style scoped lang="scss">
.title {
    width: 100%;
    height: 36px;
    background-color: rgb(15, 160, 224, 0.8);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>