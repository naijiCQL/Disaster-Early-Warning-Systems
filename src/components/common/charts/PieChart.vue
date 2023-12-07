<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-07 15:57:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-07 21:20:37
 * @FilePath: \DW-Systems\src\components\common\charts\pieChart.vue
 * @Description: 封装饼图
-->
<template>
    <div ref="PieEchart" :id="`PieEchart-${id}`" style="width: 100%; height: 100%"></div>
</template>
   
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
    props: {
        series: Array,
        id: String,
        color: String,
        top: String
    },
    setup(props, context) {
        onMounted(() => {
            //表格数据
            const seriesData = props.series
            const radius = ['40%', '70%']
            const labelLine = {
                show: true,
                textStyle: {
                    fontSize: 11    //文字的字体大小
                },
                formatter: '{d}%'
            }
            //将数据添加柱状图属性
            seriesData.forEach((e) => {
                e['type'] = 'pie'
                e['radius'] = radius
                e['labelLine'] = labelLine
                //e['label'] = label
            })
            //需要获取到element,所以是onMounted的Hook
            let myChart = echarts.init(document.getElementById(`PieEchart-${props.id}`))
            // 绘制图表
            const option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,12,13,0.5)', // 修改背景颜色
                    borderColor: 'rgba(0,12,13,0.5)', // 修改边框颜色
                    textStyle: {
                        color: 'white'
                    },
                    formatter: function (params) {
                        return '<div style="text-align: left;">' + params.seriesName + '<br>' + params.marker + params.name + '：' + params.value + '</div>';
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