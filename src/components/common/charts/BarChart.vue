<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-07 11:46:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-07 16:19:44
 * @FilePath: \DW-Systems\src\components\common\charts\barChart.vue
 * @Description: 封装柱状图
-->
<template>
    <div ref="BarEchart" :id="`BarEchart-${id}`" style="width: 100%; height: 100%"></div>
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
            let myChart = echarts.init(document.getElementById(`BarEchart-${props.id}`))
            // 绘制图表
            const option = {
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
                    left: '1%',
                    right: '6%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData || [],
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