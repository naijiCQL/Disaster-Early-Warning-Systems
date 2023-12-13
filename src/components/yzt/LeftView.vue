<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-08 09:44:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-13 17:23:21
 * @FilePath: \DW-Systems\src\components\yzt\LeftView.vue
 * @Description: 一张图左侧区域
-->
<script setup>
import bus from 'vue3-eventbus'
import { ref, onMounted } from 'vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import { countRainfallByDistrict } from "@/api/sy/index";
import { getPreviousHourTime } from "@/components/common/date/getTime.js"

//定义获取累计降雨量的初始参数
let params = {
    districtCode: "4205",
    startTime: getPreviousHourTime(168),
    endTime: getPreviousHourTime(0)
}

onMounted(() => {
    //默认窗口显示
    leftPageStyle.value.left = 0;
    //获取累计降雨量数据
    getRainValue(params)
})
//从后端获取各地区的累计降雨量数据
function getRainValue(params) {
    countRainfallByDistrict(params).then(res => {
        console.log(res.result)
        let districtName = []
        let rainfall = []
        res.result.forEach(e => {
            districtName.push(e.districtName)
            rainfall.push(e.rainfall)
        });

        xData.value = districtName
        series1.value[0].data = rainfall
    })
}
//初始化横坐标数据
let xData = ref(['市辖区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳县', '五峰县', '宜都县', '当阳市', '枝江市'])
//柱状体颜色
const color1 = 'rgb(0,157,230)'
const color2 = 'rgb(118,131,246)'
//表一数据
const series1 = ref([
    {
        name: '雨量(mm)',
        data: [1.20, 2.48, 2.04, 4.90, 1.74, 1.20, 2.48, 2.04, 4.90, 1.74],
    },
])
//表二数据
const series2 = ref([
    {
        name: '监测点数(个)',
        data: [120, 248, 204, 490, 174, 120, 248, 204, 490, 175],
    },
])
//饼图颜色
let color3 = [
    "#4fc5ea",
    "#6c6fbf",
    "#5ed8a9",
    "#8f55e7",
    "#605ad8",
];
//定义饼图的大小与位置
const position = ['40%', '70%', '45%', '50%'] //[内半径,外半径,圆心距离左侧的距离,圆心距离上侧的距离]
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
//默认选择第三个选项
const selectValue = ref(168)
//选择选择框时触发事件
function changeValue() {
    params.endTime = getPreviousHourTime(0)
    params.startTime = getPreviousHourTime(selectValue.value)
    //获取累计降雨量数据
    getRainValue(params)
}

const options = [
    {
        value: 1,
        label: '近一小时',
    },
    {
        value: 24,
        label: '近24小时',
    },
    {
        value: 168,
        label: '近7天',
    },
]
//初始化left-page的样式
const leftPageStyle = ref({
    left: '-22.1%'
});
//初始化显示第一个icon
const currentIcon = ref(true);
//发送页面
function handleIconClick() {
    if (currentIcon.value) {
        leftPageStyle.value.left = '-22.1%';
    } else {
        leftPageStyle.value.left = 0;
    }
    currentIcon.value = !currentIcon.value
}
</script>

<template>
    <div class="main-container">
        <div class="first-container" :style="leftPageStyle">
            <div class="container">
                <div class="echart-container">
                    <div class="container1">
                        <div class="container-icon">
                            <el-icon color="#1979C4">
                                <DataAnalysis />
                            </el-icon>
                            <span>累计降雨量</span>
                        </div>
                        <el-select v-model="selectValue" class="rain-select" placeholder="近7天" size="small"
                            @change="changeValue">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="left-bar-chart1">
                        <bar-chart :xData="xData" :series="series1" :color="color1" :id="'left-bar-chart1'"></bar-chart>
                    </div>
                </div>
                <div class="echart-container">
                    <div class="container-icon">
                        <el-icon color="#1979C4">
                            <Tickets />
                        </el-icon>
                        <span>监测点分布</span>
                    </div>
                    <div class="left-bar-chart2">
                        <bar-chart :xData="xData" :series="series2" :color="color2" :id="'left-bar-chart2'"></bar-chart>
                    </div>
                </div>
                <div class="echart-container">
                    <div class="container-icon">
                        <el-icon color="#1979C4">
                            <Compass />
                        </el-icon>
                        <span>灾害类型</span>
                    </div>
                    <div class="left-pie-chart">
                        <pie-chart :series="series3" :color="color3" :position="position"
                            :id="'left-pie-chart'"></pie-chart>
                    </div>
                </div>
            </div>
            <div class="icon" @click="handleIconClick">
                <el-icon color="white" v-if="currentIcon">
                    <CaretLeft />
                </el-icon>

                <el-icon color="white" v-else>
                    <CaretRight />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-container {
    margin: 0;
    width: 100%;
    height: 100%;

    .first-container {
        display: flex;
        position: fixed;
        top: 70px;
        width: 23%;
        height: calc(100% - 70px);
        display: flex;
        align-items: center;
        transition: left 1s linear;

        .container {
            width: calc(100% - 24px);
            height: 97%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;

            .echart-container {
                height: 32%;
                background-color: white;

                span {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: #666666;
                    height: 35px;
                    margin-left: 10px;
                }

                .container1 {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-right: 10px;

                    .rain-select {
                        width: 30%;
                    }

                }

                .left-bar-chart1,
                .left-bar-chart2,
                .left-pie-chart {
                    height: calc(100% - 35px);
                }

                .container-icon {
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
                }
            }
        }

        .icon {
            top: 50%;
            background-color: rgba(51, 122, 179, 0.9);
            height: 32px;
            width: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
}
</style>