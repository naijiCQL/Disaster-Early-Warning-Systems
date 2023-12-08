<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-08 15:10:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-08 16:18:26
 * @FilePath: \DW-Systems\src\components\common\charts\LineChart.vue
 * @Description: 封装折线图
-->
<template>
    <div ref="LineEchart" :id="`LineEchart-${id}`" style="width: 100%; height: 100%"></div>
</template>
   
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
    props: {
        xData: Array,
        series: Array,
        id: String,
        color: String,
        top: String
    },
    setup(props, context) {
        onMounted(() => {
            //表格数据
            const seriesData = props.series
            //x轴数据
            const xData = props.xData
            //设置圆点为实心
            const symbol = 'circle'
            //设置折线颜色
            const lineStyle = {
                color: props.color,
            }
            //设置实心颜色
            const itemStyle = {
                color: props.color,
            }

            //将数据添加柱状图属性
            seriesData.forEach((e) => {
                e['type'] = 'line'
                e['symbol'] = symbol
                e['lineStyle'] = lineStyle
                e['itemStyle'] = itemStyle
            })
            //需要获取到element,所以是onMounted的Hook
            let myChart = echarts.init(document.getElementById(`LineEchart-${props.id}`))
            // 绘制图表
            const option = {
                legend: {
                    data: [seriesData[0].name],
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,12,13,0.5)', // 修改背景颜色
                    borderColor: 'rgba(0,12,13,0.5)', // 修改边框颜色
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (params) {
                        return '<div style="text-align: left;">' + params[0].name + '<br>' + params[0].seriesName + '：' + params[0].value + '</div>';
                    }
                },
                grid: {
                    top: props.top || '12%',
                    left: '6%',
                    right: '6%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData || [],
                    //用于配置坐标轴刻度标签的显示和样式
                    axisLabel: {
                        interval: 0,//显示x轴所有值
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
                        show: true,
                        lineStyle: {
                            type: 'dashed', // 将样式设置为虚线
                        },
                    }
                },
                series: seriesData
            }

            myChart.setOption(option)

            myChart.on('click', function (params) {
                context.emit('parentMethod', params)
            })
            window.onresize = function () {
                //自适应大小
                myChart.resize()
            }
        })
    }
}
</script>