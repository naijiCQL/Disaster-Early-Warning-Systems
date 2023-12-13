<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-12 20:44:57
 * @FilePath: \DW-Systems\src\components\yzt\RightView.vue
 * @Description: 一张图右侧页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import LegendView from '@/components/common/LegendView.vue'
import PieChart from '@/components/common/charts/PieChart.vue'

onMounted(() => {
    //默认窗口显示
    rightPageStyle.value.right = 0;
})
//初始化left-page的样式
const rightPageStyle = ref({
    right: '-23.1%'
});
//初始化显示第一个icon
const currentIcon = ref(true);
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
    "#4fc5ea",
    "#6c6fbf",
    "#5ed8a9",
    "#8f55e7",
    "#605ad8",
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

const position = ['30%', '55%', '40%', '50%']

</script>

<template>
    <div class="main-page">
        <div class="container" :style="rightPageStyle">
            <div class="first-container">
                <div class="map-tool">
                    <div class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
                        <img src="/markerIcon/tool/ss.png" title="搜索" />
                    </div>
                    <div class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
                        <img src="/markerIcon/tool/tc.png" title="图层管理" />
                    </div>
                    <div class="tool" style="border-right: 1px solid rgb(211, 211, 211);">
                        <img src="/markerIcon/tool/cjl.png" title="距离量算" />
                    </div>
                    <div class="tool">
                        <img src="/markerIcon/tool/cmj.png" title="面积量算" />
                    </div>
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
                                <span class="spanNum">0</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab2">
                            <div class="info">
                                <span>警戒级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">0</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab3">
                            <div class="info">
                                <span>警示级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">0</span>
                            </div>
                        </div>
                        <div class="infoTab infoTab4">
                            <div class="info">
                                <span>注意级</span>
                            </div>
                            <div class="info">
                                <span class="spanNum">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="more">
                        更多>>
                    </div>
                    <div class="page-content-info">
                        <img src="@/assets/images/syView/noneWaringInfo.png" />
                        <span>暂无预警信息</span>
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
                        <div class="jcsb-info">
                            <span>设备总数</span>
                            <span>4808</span>
                        </div>
                        <div class="jcsb-info">
                            <span>在线</span>
                            <span>4488</span>
                        </div>
                        <div class="jcsb-info">
                            <span>离线</span>
                            <span>320</span>
                        </div>
                        <div class="jcsb-info">
                            <span>在线率</span>
                            <span>93.34%</span>
                        </div>
                    </div>
                    <div class="right-pie-chart">
                        <pie-chart :series="series3" :color="color3" :position="position" :id="'right-pie-chart'"></pie-chart>
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

    .container {
        width: 38%;
        display: flex;
        position: fixed;
        top: 70px;
        height: calc(100% - 70px);
        display: flex;
        align-items: center;
        transition: right 1s linear;

        .first-container {
            width: 35%;
            height: 98%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 10px;
            align-items: flex-end;

            .map-tool {
                width: 90%;
                display: flex;
                align-items: center;
                display: flex;
                height: 28px;
                border-radius: 3px;
                background-color: rgba(255, 255, 255, 0.8);
                justify-content: space-between;
                line-height: 8px;
                padding: 0 5px;
                cursor: pointer;

                .tool {
                    width: 25%;
                }
            }

            .legend {
                height: 37%;
                margin-bottom: 12px;
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

        .second-container {
            width: 59%;
            height: 98%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

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

                .page-content-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                    height: 57%;

                    img {
                        width: 55%;
                    }

                    span {
                        color: rgb(102, 102, 102);
                        font-size: 14px;
                    }

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