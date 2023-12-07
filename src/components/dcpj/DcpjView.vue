<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-07 17:06:14
 * @FilePath: \DW-Systems\src\components\dcpj\DcpjView.vue
 * @Description: 调查评价页面
-->
<script setup>
import BarChart from '@/components/common/charts/BarChart.vue'
import PieChart from '@/components/common/charts/PieChart.vue'

//控制上沿距离
const top = '10%'
//x坐标数据
const xData = ['市辖区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳县', '五峰县', '宜都县', '当阳市', '枝江市']
//柱状体颜色
const color1 = 'rgb(0,157,230)'
const color2 = 'rgb(118,131,246)'
//表格数据
const series1 = [
    {
        name: '雨量(mm)',
        data: [1.20, 2.48, 2.04, 4.90, 1.74, 1.20, 2.48, 2.04, 4.90, 1.74],
    },
]
const series2 = [
    {
        name: '监测点数(个)',
        data: [120, 248, 204, 490, 174, 120, 248, 204, 490, 175],
    },
]

const series3 = [
    {
        name: '监测点数量',
        data: [
            { value: 1240, name: '滑坡' },
            { value: 158, name: '不稳定斜坡' },
            { value: 85, name: '崩塌' },
            { value: 5, name: '地面塌陷' },
            { value: 4, name: '泥石流' }
        ],
    },
]
const parentMethod = (data) => {
    console.log('data', data)
}

</script>

<template>
    <div class="main-page">
        <div class="rainEcharts">
            <span>累计降雨量</span>
            <div class="charts1">
                <bar-chart :xData="xData" :series="series1" :color="color1" :top="top" :id="'charts1'"
                    @parentMethod="parentMethod"></bar-chart>
            </div>
        </div>
        <div class="rainEcharts">
            <span>监测点分布</span>
            <div class="charts2">
                <bar-chart :xData="xData" :series="series2" :color="color2" :top="top" :id="'charts2'"
                    @parentMethod="parentMethod"></bar-chart>
            </div>
        </div>
        <div class="rainEcharts">
            <span>灾害类型</span>
            <div class="charts3">
                <pie-chart :series="series3" :top="top" :id="'charts3'" @parentMethod="parentMethod"></pie-chart>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    height: 100%;
    margin: 0;

    .rainEcharts {
        height: 32%;
        width: 20%;
        padding: 0 20px;

        span {
            display: flex;
        }

        .charts1 {
            height: calc(100% - 35px);
        }

        .charts2 {
            height: calc(100% - 35px);
        }

        .charts3 {
            height: calc(100% - 35px);
        }
    }
}
</style>