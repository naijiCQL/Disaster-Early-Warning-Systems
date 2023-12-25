<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-25 10:53:00
 * @FilePath: \DW-Systems\src\components\yzt\RightView.vue
 * @Description: 一张图右侧页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import { queryCgqzxlByCs } from '@/api/zhzs'
import { getFirst, selectSbcgq, queryPageWarningInfo } from "@/api/sy";
import { useStore } from "@/store/mystore.js";
import LegendView from '@/components/common/LegendView.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import { getCurrentDate } from "@/components/common/date/getTime.js"
import MapTool from '../common/tools/MapTool.vue';
import { listByDicCode } from '@/api/common/index.js'
import bus from 'vue3-eventbus'

//定义获取当天各级预警数量的参数
let yjNumberParams = {
    "startTime": getCurrentDate(),
    "userXzqh": useStore().cityCode
}
//定义获取当天预警信息的参数
let warnInfoParams = {
    "disasterPointName": "",
    "disasterPointType": "",
    "pageNum": 1,
    "pageSize": 6,
    "userXzqh": "",
    "startTime": "",
    "endTime": "",
    "warningLevel": "",
    "warningProcessStatus": "A"
}
//初始化颜色和等级对应
let gradeColor = [
    {
        "code": "C4",
        "color": "rgb(248, 68, 95)",
        "value": "红"
    },
    {
        "code": "C3",
        "color": "rgb(251,141,51)",
        "value": "橙"
    },
    {
        "code": "C2",
        "color": "rgb(245, 209, 69)",
        "value": "黄"
    },
    {
        "code": "C1",
        "color": "rgb(43, 164, 232)",
        "value": "蓝"
    }
]
onMounted(() => {
    //默认窗口显示
    rightPageStyle.value.right = 0;
    //获取该地区在当天的各级预警数量
    getYjNumber(yjNumberParams)
    //获取该地区当天各级预警信息
    getWarnInfo(warnInfoParams)
    //获取设备数据
    getJcsbData()
    //获得监测设备类型数据
    getJcsbType()
})
//定义预警初始化数量
let yjNumber = ref({
    "red": 0,
    "orange": 0,
    "yellow": 0,
    "blue": 0,
})
//初始化预警页面无信息
let noInfo = ref(true);
//获取该区域在当天的各级预警数量
function getYjNumber(params) {
    selectSbcgq(params).then((res) => {
        if (res && res.result) {
            yjNumber.value = res.result
            //显示预警信息
            noInfo.value = false
        }
    })
}
//获取该区域当天预警信息
function getWarnInfo(params) {
    queryPageWarningInfo(params).then((res) => {
        if (res && res.result && res.result.total) {
            const warnContainer = document.getElementById('yjInfo');
            res.result.list.forEach((item) => {
                const warnInfo = document.createElement('div')
                warnInfo.className = 'warn-info-container'

                const label = document.createElement('label')
                const span = document.createElement('span')

                const warningLevel = item.warningLevel
                const warningTime = item.warningTime
                const monitorPointName = item.monitorPointName

                gradeColor.forEach((item) => {
                    if (warningLevel === item.code) {
                        label.style.backgroundColor = item.color
                        span.title = `${warningTime}${monitorPointName}检测点发布${item.value}色预警`
                        span.textContent = `${warningTime}${monitorPointName}检测点发布${item.value}色预警`
                    }
                })

                warnInfo.appendChild(label)
                warnInfo.appendChild(span)
                warnContainer.appendChild(warnInfo)

            })

            // 获取所有 .marker 元素的引用
            const elements = document.querySelectorAll('.warn-info-container');
            elements.forEach((item) => {
                item.style.margin = '3px 0'
                item.style.display = 'flex'
                item.style.alignItems = 'center';

                const labelElement = item.querySelector('label')
                if (labelElement) {
                    labelElement.style.display = 'inline-block'
                    labelElement.style.width = '13px'
                    labelElement.style.height = '13px'
                    labelElement.style.borderRadius = '50%'
                    labelElement.style.margin = '0 8px'
                    labelElement.style.verticalAlign = 'middle'
                }

                const spanElement = item.querySelector('span');
                if (spanElement) {
                    spanElement.style.width = 'calc(100% - 15px)'
                    spanElement.style.whiteSpace = 'nowrap';/* 不换行 */
                    spanElement.style.overflow = 'hidden'; /* 隐藏溢出部分 */
                    spanElement.style.textOverflow = 'ellipsis'; /* 显示省略号 */
                    spanElement.style.display = 'inline-block';
                    spanElement.style.cursor = 'pointer';
                }

            })
        }
    })
}
//默认监测设备显示数量
let jcsbData = ref({})
//获取监测设备数据（在线、离线）
function getJcsbData() {
    getFirst().then((res) => {
        if (res && res.result) {
            jcsbData.value = res.result
        }
    })
}
//获得检测设备类型
function getJcsbType() {
    queryCgqzxlByCs().then((res) => {
        if (res && res.result) {
            let jcsbAllData = []
            res.result.forEach((e, index) => {
                jcsbAllData.push({
                    value: e.total,
                    name: e.lx,
                    //添加颜色标签
                    label: {
                        color: color3[index]
                    }
                })
            })
            series3.value[0].data = jcsbAllData
        }
    })
}
//初始化left-page的样式
const rightPageStyle = ref({
    right: '-23.1%'
});
//初始化显示第一个icon
let currentIcon = ref(true);
//发送页面
function handleIconClick() {
    if (currentIcon.value) {
        rightPageStyle.value.right = '-23.1%';
    } else {
        rightPageStyle.value.right = 0;
    }
    currentIcon.value = !currentIcon.value
}
//饼图颜色
let color3 = [
    "#4FC5EA",
    "#6C6FBF",
    "#F86846",
    "#78C446",
    "#FFB11A",
    "#3A94EF",
    "#4FC5EA",
    "#9C6CBF",
    "#5ED8A9",
    "#F8445F",
    "#257FC3",
    "#666666"
];
//默认饼图上沿距离
const pieTop = '12%'
//饼图数据
const series3 = ref([
    {
        name: '数量',
        data: [],
    },
])

const position = ['30%', '55%', '40%', '50%']

function getDicData(param) {
    listByDicCode(param).then((res) => {
        console.log(res)
    })
}
//点击获取更多信息
function getMoreInfo() {
    bus.emit('clickMoreInfo', true)
}
//打开检测设备页面
function showJcsbView(param) {
    bus.emit('clickJcsbView', param)
}

</script>

<template>
    <div class="main-page">
        <div class="container" :style="rightPageStyle">
            <div class="first-container">
                <div class="map-tool">
                    <map-tool :select="true"></map-tool>
                </div>
                <div class="legend">
                    <legend-view></legend-view>
                </div>
            </div>
            <div class="icon" @click="handleIconClick">
                <el-icon color="white" v-if="currentIcon">
                    <CaretRight />
                </el-icon>
                <el-icon color="white" v-else>
                    <CaretLeft />
                </el-icon>
            </div>
            <div class="second-container">
                <div class="yjxx">
                    <div class="container-icon">
                        <el-icon color="#1979C4">
                            <Grid />
                        </el-icon>
                        <span>预警信息</span>
                    </div>
                    <div class="yjxx-container">
                        <div class="infoTab infoTab1">
                            <div class="info">
                                <span>警报级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">{{ yjNumber.red }}</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab2">
                            <div class="info">
                                <span>警戒级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">{{ yjNumber.orange }}</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab3">
                            <div class="info">
                                <span>警示级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">{{ yjNumber.yellow }}</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab4">
                            <div class="info">
                                <span>注意级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">{{ yjNumber.blue }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="more" @click="getMoreInfo">
                        更多>>
                    </div>
                    <div style="height: 57%;">
                        <div class="noInfo" v-if="noInfo">
                            <img src="@/assets/images/syView/noneWaringInfo.png" />
                            <span>暂无预警信息</span>
                        </div>
                        <div id="yjInfo" v-else>
                        </div>
                    </div>
                </div>
                <div class="jcsb">
                    <div class="container-icon">
                        <el-icon color="#1979C4">
                            <Histogram />
                        </el-icon>
                        <span>检测设备</span>
                    </div>
                    <div class="jcsb-container">
                        <div class="jcsb-info" @click="showJcsbView('')">
                            <span>设备总数</span>
                            <span>{{ jcsbData.deviceNum }}</span>
                        </div>
                        <div class="jcsb-info" @click="showJcsbView('1')">
                            <span>在线</span>
                            <span>{{ jcsbData.online }}</span>
                        </div>
                        <div class="jcsb-info">
                            <span>离线</span>
                            <span>{{ jcsbData.offline }}</span>
                        </div>
                        <div class="jcsb-info">
                            <span>在线率</span>
                            <span>{{ (Number(jcsbData.deviceOnline) * 100).toFixed(2) }}%</span>
                        </div>
                    </div>
                    <div class="right-pie-chart">
                        <pie-chart :series="series3" :color="color3" :top="pieTop" :position="position"
                            :id="'right-pie-chart'"></pie-chart>
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
    pointer-events: none;

    .container {
        width: 38%;
        display: flex;
        position: fixed;
        top: 70px;
        height: calc(100% - 70px);
        display: flex;
        align-items: center;
        transition: right 1s linear;
        pointer-events: none;

        .first-container {
            width: 35%;
            height: 98%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 10px;
            align-items: flex-end;
            pointer-events: none;

            .map-tool {
                width: 90%;
                pointer-events: auto;
            }

            .legend {
                height: 37%;
                margin-bottom: 12px;
                pointer-events: auto;
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
            pointer-events: auto;
        }

        .second-container {
            width: 59%;
            height: 98%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            pointer-events: auto;

            .container-icon {
                display: flex;
                align-items: center;
                margin-left: 10px;

                span {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: #666666;
                    height: 35px;
                    margin-left: 10px;
                }
            }

            .yjxx {
                height: 52.35%;
                width: 100%;
                background-color: white;

                .yjxx-container {
                    width: 100%;
                    height: 32%;
                    flex-wrap: wrap;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    cursor: pointer;

                    .infoTab {
                        width: 45%;
                        height: 45%;
                        border-radius: 4px;
                        margin: 5px;
                        display: flex;

                        .info {
                            height: 100%;
                            width: 50%;

                            span {
                                line-height: 300%;
                                /* 行高是字体大小的150% */
                                color: #fff;
                                font-size: 16px;
                                font-weight: 500;
                            }

                            .spanNum {
                                font-size: 20px;
                                font-weight: 600;
                                line-height: 250%;
                            }
                        }
                    }

                    .infoTab1 {
                        background: linear-gradient(to right, rgb(252, 142, 153), rgb(248, 68, 95));
                    }

                    .infoTab2 {
                        background: linear-gradient(to right, rgb(246, 179, 101), rgb(253, 120, 24));
                    }

                    .infoTab3 {
                        background: linear-gradient(to right, rgb(249, 213, 108), rgb(245, 209, 69));
                    }

                    .infoTab4 {
                        background: linear-gradient(to right, rgb(43, 164, 232), rgb(37, 127, 195));
                    }
                }

                .more {
                    text-align: right;
                    font-size: 13px;
                    color: #2ba4e8;
                    font-weight: 600;
                    margin-right: 20px;
                    margin-top: 10px;
                    position: absolute;
                    right: 0;
                    width: 10%;
                    cursor: pointer;
                }

                .noInfo {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                    height: 100%;

                    img {
                        width: 55%;
                    }

                    span {
                        color: rgb(102, 102, 102);
                        font-size: 14px;
                    }
                }

                #yjInfo {
                    padding-top: 30px;
                    display: flex;
                    flex-direction: column;
                    color: rgb(102, 102, 102);
                    font-size: 13px;
                }
            }

            .jcsb {
                height: 46%;
                width: 100%;
                background-color: white;


                .jcsb-container {
                    width: calc(100% - 20px);
                    height: 18%;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10px;
                    cursor: pointer;

                    .jcsb-info {
                        width: 22%;
                        border-radius: 4px;
                        border: 1px solid #4fc5ea;

                        span {
                            height: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 13px;
                            color: rgb(102, 102, 102);
                        }
                    }
                }

                .right-pie-chart {
                    margin-top: 10px;
                    height: 65%;
                }
            }
        }
    }
}
</style>