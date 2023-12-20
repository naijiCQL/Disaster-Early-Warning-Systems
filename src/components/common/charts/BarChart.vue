<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-07 11:46:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-20 16:44:39
 * @FilePath: \DW-Systems\src\components\common\charts\BarChart.vue
 * @Description: 封装柱状图
-->
<template>
    <div ref="BarEchart" :id="`BarEchart-${id}`" style="width: 100%; height: 100%"></div>
</template>
   
<script setup>
import { useStore } from "@/store/mystore.js";
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from "vue";
import bus from 'vue3-eventbus'

let myChart = null
let option = null

const props = defineProps({
    xData: Array,
    series: Array,
    id: String,
    color: String,
    top: String
})
const series = ref(props.series);

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
    //柱状体颜色
    const itemStyle = {
        color: props.color
    }
    //柱状体上文本标签颜色
    const label = {
        show: true,
        position: 'top',//放置位置
        valueAnimation: true,//数值增长动画
        color: props.color // 设置标签文本颜色
    }
    //将数据添加柱状图属性
    seriesData.forEach((e) => {
        e['type'] = 'bar'
        e['itemStyle'] = itemStyle
        e['label'] = label
    })
    //需要获取到element,所以是onMounted的Hook
    myChart = echarts.init(document.getElementById(`BarEchart-${props.id}`))
    // 绘制图表
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(0,12,13,0.5)', // 修改背景颜色
            borderColor: 'rgba(0,12,13,0.5)', // 修改边框颜色
            textStyle: {
                color: '#fff'
            },
            formatter: function (params) {
                return '<div style="text-align: left;">' + params[0].name + '<br>' + params[0].marker + params[0].seriesName + '：' + params[0].value + '</div>';
            }
        },
        grid: {
            top: props.top || '12%',
            left: '6%',
            right: '5%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: props.xData || [],
            //用于配置坐标轴刻度标签的显示和样式
            axisLabel: {
                rotate: 45, // 旋转角度，可以根据需要调整
            },
        },
        yAxis: {
            type: 'value',
            //用于配置坐标轴刻度标签的显示和样式
            axisLabel: {
                show: true,
            },
            //控制是否显示y轴刻度
            axisTick: {
                show: true,
            },
            //控制是否显示坐标轴轴线
            axisLine: {
                show: true,
            },
            //控制是否隐藏背景虚线
            splitLine: {
                show: false
            }
        },
        series: seriesData
    }
    //绘制echarts图表
    myChart.setOption(option, true)
    //点击图表触发事件
    myChart.on('click', function (params) {
        if (params.seriesName === "监测点数(个)") {
            let xzCode = useStore().xzCode
            let name = params.name
            xzCode.forEach((element) => {
                if (element.xzqhmc === name) {
                    console.log(element.xzqh)
                    //将行政区域编码进行发送
                    bus.emit('clickBarChart', element.xzqh)
                }
            })
        }
    })
    //自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce);
}
//页面初始化
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