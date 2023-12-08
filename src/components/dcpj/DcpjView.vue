<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-08 17:10:37
 * @FilePath: \DW-Systems\src\components\dcpj\DcpjView.vue
 * @Description: 调查评价页面
-->
<script setup>
import BarChart from '@/components/common/charts/BarChart.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import LineChart from '@/components/common/charts/LineChart.vue'

//控制上沿距离
const top = '10%'
//x坐标数据
const xData1 = ['市辖区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳县', '五峰县', '宜都县', '当阳市', '枝江市']
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
//饼图颜色
let color3 = [
    "#4fc5ea",
    "#6c6fbf",
    "#5ed8a9",
    "#8f55e7",
    "#605ad8",
    "#f9cd33",
    "#0ed4fa",
    "#3a94ef",
    "#7683f6",
];

//饼图数据
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

//折线图折线颜色
const lineColor = 'rgba(54,157,255)'
//折线图x轴数据
const xData2 = ['12-02', '12-03', '12-04', '12-05', '12-06', '12-07', '12-08']
//折线图数据
const series4 = [
    {
        name: '设备在线率',
        data: [150, 230, 224, 218, 135, 147, 260],
    }
]

const parentMethod = (data) => {
    console.log('data', data)
}

</script>

<template>
    <div class="main-page">
        <div class="first-line">
            <div class="echart-container container">
                <span>累计降雨量</span>
                <div class="charts1">
                    <bar-chart :xData="xData1" :series="series1" :color="color1" :top="top" :id="'charts1'"
                        @parentMethod="parentMethod"></bar-chart>
                </div>
            </div>
            <div class="echart-container">
                <span>监测点分布</span>
                <div class="charts2">
                    <bar-chart :xData="xData1" :series="series2" :color="color2" :top="top" :id="'charts2'"
                        @parentMethod="parentMethod"></bar-chart>
                </div>
            </div>
            <div class="echart-container">
                <span>灾害类型</span>
                <div class="charts3">
                    <pie-chart :series="series3" :color="color3" :top="top" :id="'charts3'"
                        @parentMethod="parentMethod"></pie-chart>
                </div>
            </div>

            <div class="echart-container">
                <span>趋势分析</span>
                <div class="charts4">
                    <line-chart :xData="xData2" :series="series4" :color="lineColor" :top="top" :id="'charts4'"
                        @parentMethod="parentMethod"></line-chart>
                </div>
            </div>
        </div>
        <div class="second-line">
            <div class="legend">
                <div class="title">
                    <span>设备图例</span>
                </div>
                <div class="content">
                    <div class="marker">
                        <img src="/markerIcon/jcsbIcon/次声.png" />
                        <span>次声</span>
                    </div>
                    <div class="marker">
                        <img src="/markerIcon/jcsbIcon/地表位移.png" />
                        <span>地表位移</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    height: 100%;
    margin: 0;

    .first-line {
        width: 100%;
        height: 30%;
        display: flex;

        .echart-container {
            margin-top: 1%;
            height: 100%;
            width: 21%;
            padding: 0 20px;

            span {
                display: flex;
            }

            .charts1,
            .charts2,
            .charts3,
            .charts4 {
                height: calc(100% - 35px);
            }
        }
    }

    .second-line {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: center;

        .legend {
            height: 100%;
            width: 15%;

            .title {
                height: 36px;
                background-color: rgb(15, 160, 224, 0.8);
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .content {
                height: calc(100% - 36px);
                background-color: bisque;
                display: flex;

                .marker {
                    display: flex;
                    align-items: center;
                    width: 50%;
                    height: 10%;

                    img {
                        width: 16px;
                        height: 16px;
                        margin: 5px;
                    }

                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    }


}
</style>