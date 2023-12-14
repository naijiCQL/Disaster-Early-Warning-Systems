<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-07 15:57:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-14 14:45:10
 * @FilePath: \DW-Systems\src\components\common\charts\PieChart.vue
 * @Description: 封装饼图
-->
<template>
    <div ref="PieEchart" :id="`PieEchart-${id}`" style="width: 100%; height: 100%"></div>
</template>
   
<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from "vue";

let myChart = null
let option = null

const props = defineProps({
    series: Array,
    id: String,
    color: Array,
    top: String,
    position: Array
})
const series = ref(props.series)
//重绘图表函数
const resizeHandler = () => {
    myChart.resize();
}
//设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
const debounce = (fun, delay) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
};

const cancalDebounce = debounce(resizeHandler, 500);

//初始化echarts图表
function initChart() {
    //表格数据
    const seriesData = props.series
    const position = props.position
    const radius = [position[0], position[1]]//指定饼图的内外半径
    const center = [position[2], position[3]]//确定饼图的中心点
    //设置标识线的颜色
    const labelLine = {
        show: true,
        textStyle: {
            fontSize: 11    //文字的字体大小
        },
        formatter: '{d}%'
    }
    //设置每个饼图的颜色
    const itemStyle = {
        color: (params) => {
            return props.color[params.dataIndex]
        }
    }
    //设置标签的样式
    const label = {
        show: true,
        position: 'outside', //标签的位置
        fontSize: 11,   //文字的字体大小
        formatter: '{d}%',
        color: (params) => {
            return props.color[params.dataIndex]
        },
    }
    //修改数据，不同标签的颜色对应其饼图的颜色
    // seriesData[0].data.map((item, index) => {
    //     item.label = {
    //         color: props.color[index]
    //     }
    //     return item;
    // })
    //将数据添加柱状图属性
    seriesData.forEach((e) => {
        e['type'] = 'pie'
        e['radius'] = radius
        e['labelLine'] = labelLine
        e['center'] = center
        e['itemStyle'] = itemStyle
        e['label'] = label
    })
    //需要获取到element,所以是onMounted的Hook
    myChart = echarts.init(document.getElementById(`PieEchart-${props.id}`))
    // 绘制图表
    option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,12,13,0.5)', // 修改背景颜色
            borderColor: 'rgba(0,12,13,0.5)', // 修改边框颜色
            textStyle: {
                color: 'white'
            },
            formatter: function (params) {
                //将数字化为标准显示格式：1234 => 1,234
                let standardFormat = params.value.toLocaleString()
                return '<div style="text-align: left;">' + params.seriesName + '<br>' + params.marker + params.name + '：' + standardFormat + '</div>';
            }
        },
        legend: {
            orient: 'vertical',
            left: '60%'
        },
        grid: {
            top: props.top || '12%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        series: seriesData
    }
    //绘制图表
    myChart.setOption(option, true)
    //自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce);
}
//页面成功渲染，开始绘制图表
onMounted(() => {
    initChart()
})
//页面销毁前，销毁事件和实例
onBeforeUnmount(() => {
    window.removeEventListener('resize', cancalDebounce)
    myChart.dispose()
})
//监听图表数据时候变化，重新渲染图表
watch(() => series.value[0].data, () => {
    myChart.setOption(option, true)
}, { deep: true })
</script>