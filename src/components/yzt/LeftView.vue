<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-08 09:44:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-20 10:59:12
 * @FilePath: \DW-Systems\src\components\yzt\LeftView.vue
 * @Description: 一张图左侧区域
-->
<script setup>
import bus from 'vue3-eventbus'
import { storeToRefs } from "pinia";
import { ref, onMounted } from 'vue'
import { useCounterStore } from "@/store/mystore.js";
import BarChart from '@/components/common/charts/BarChart.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import { getPreviousHourTime } from "@/components/common/date/getTime.js"
import { countRainfallByDistrict, getJcdsmByXzqh, getJcdsByZhlx } from "@/api/sy";

const counterStore = useCounterStore();
//解构出来pinai存储的值
const { cityCode } = storeToRefs(counterStore);
//定义获取累计降雨量的初始参数
let rainParams = {
    districtCode: cityCode.value,
    startTime: getPreviousHourTime(168),
    endTime: getPreviousHourTime(0)
}
//定义获取雨量的参数
let jcdParams = {
    "userXzqh": cityCode.value
}

onMounted(() => {
    //默认窗口显示
    leftPageStyle.value.left = 0;
    //获取累计降雨量数据
    getRainData(rainParams)
    //获得监测点数据
    geJcdData(jcdParams)
    //获得灾害类型数据
    getZhlxData()
})
//从后端获取各地区的累计降雨量数据
function getRainData(params) {
    countRainfallByDistrict(params).then(res => {
        if (res && res.result) {
            let districtName = []
            let rainfall = []
            res.result.forEach(e => {
                districtName.push(e.districtName)
                //当rainfall为null或者0值时2，统一赋值为0
                if (e.rainfall) {
                    rainfall.push(e.rainfall)
                } else {
                    rainfall.push(0)
                }
            });

            xData.value = districtName
            series1.value[0].data = rainfall
        }
    })
}
//默认监测点数为2124个
let sum = ref(2124)
//获取监测点数据
function geJcdData(params) {
    getJcdsmByXzqh(params).then((res) => {
        if (res && res.result) {
            let xzqhmc = []
            let jcdsm = []
            let xzCode = res.result
            sum.value = 0
            res.result.forEach((e) => {
                xzqhmc.push(e.xzqhmc)
                jcdsm.push(e.jcdsm)
                sum.value += e.jcdsm
            })

            xData.value = xzqhmc
            series2.value[0].data = jcdsm
            series2.value[0].xzCode = xzCode
        }
    })
}
//获得灾害类型数据
function getZhlxData(params) {
    getJcdsByZhlx(params).then((res) => {
        if (res && res.result) {
            let zhlxData = []
            res.result.forEach((e, index) => {
                zhlxData.push({
                    value: Number(e.jcds),
                    name: `${e.zhlx}(${e.jcds})`,
                    label: {
                        color: color3[index]
                    }
                })
            })
            series3.value[0].data = zhlxData
        }
    })
}
//初始化横坐标数据
const xData = ref(['市辖区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳县', '五峰县', '宜都市', '当阳市', '枝江市'])
//柱状体颜色
const color1 = 'rgb(0,157,230)'
const color2 = 'rgb(118,131,246)'
//表一降雨量默认加载数据
const series1 = ref([
    {
        name: '雨量(mm)',
        data: [1.20, 2.48, 2.04, 4.90, 1.74, 1.20, 2.48, 2.04, 4.90, 1.74],
    },
])
//表二监测站默认加载数据
const series2 = ref([
    {
        name: '监测点数(个)',
        data: [120, 248, 204, 490, 175, 120, 248, 204, 490, 175],
        xzCode: {},
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
//初始化饼图默认数据
const series3 = ref([
    {
        name: '监测点数量',
        data: [],
    },
])
//默认图表上沿的距离
const pieTop = '0%'
//默认选择第三个选项
const selectValue = ref(168)
//选择选择框时触发事件
function changeValue() {
    rainParams.endTime = getPreviousHourTime(0)
    rainParams.startTime = getPreviousHourTime(selectValue.value)
    //获取累计降雨量数据
    getRainData(rainParams)
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
                        <span>监测点分布 ({{ sum }})个</span>
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
                        <pie-chart :series="series3" :color="color3" :top="pieTop" :position="position"
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