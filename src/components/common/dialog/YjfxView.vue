<!--
 * @Author: 陈巧龙
 * @Date: 2024-01-05 21:08:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-05 21:11:39
 * @FilePath: \DW-Systems\src\components\common\dialog\YjfxView.vue
 * @Description: 预警分析页面
-->
<script setup>
import { ref, onMounted, computed } from 'vue';
import MapTool from '@/components/common/tools/MapTool.vue';
import Treeselect from "vue3-treeselect"
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { useStore } from "@/store/mystore.js";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import bus from 'vue3-eventbus'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

let dialogVisible = ref(false)//初始化窗口不进行显示

onMounted(() => {

})

let yjNumber = ref(0)

bus.on('clickYjfxView', (res) => {
    console.log(res)
    yjNumber.value = res
    dialogVisible.value = true
})

// 计算页面大小函数
function calculatePageSize() {
    const screenHeight = (window.innerHeight * 0.85 - 40) / 60;
    return Math.max(1, screenHeight.toFixed(0)); // 至少为1条数据
}
// 在窗口大小改变时重新计算 pageSize
window.addEventListener('resize', () => {
    pageSize.value = calculatePageSize();
});

const currentPage = ref(1)//当前页
const pageSize = ref(calculatePageSize());//计算页面的大小计算显示的数据条数
//每页条数改变时触发 选择一页显示多少行
function handleSizeChange(val) {
    pageSize.value = val;
}
//当前页改变时触发 跳转其他页
function currentChange(val) {
    currentPage.value = val;
}

const totalNumber = ref(0)

function handleClose() {
    dialogVisible.value = false
}
</script>
<template>
    <div class="main-page">
        <el-dialog v-model="dialogVisible" title="预警分析" width="83%" top="4%" :close-on-click-modal='false'
            :before-close="handleClose" :destroy-on-close='true'>
            <div class="container">
                <div class="left-page">
                    <MapTool></MapTool>
                </div>
                <div class="right-page">
                    <div class="right-header">
                        <span>预警信息列表 ({{ yjNumber }})</span>
                    </div>
                    <div class="right-container">
                        <div class="date-picker">
                            <el-date-picker v-model="timeValue1" type="date" placeholder="开始时间"
                                @change="selectTimeValue1" />
                        </div>
                        <span>-</span>
                        <div class="date-picker">
                            <el-date-picker v-model="timeValue2" type="date" placeholder="结束时间"
                                @change="selectTimeValue2" />
                        </div>
                        <treeselect class="treeSelect" no-options-text="暂无数据" placeholder="请选择行政区划">
                        </treeselect>
                        <el-select class="select-style" v-model="yjdjValue" placeholder="预警等级"
                            :popper-append-to-body="false" @change="selectYjdjValue" clearable>
                            <el-option v-for="item in useStore().gradeColor" :key="item.code" :label="item.value"
                                :value="item.code" />
                        </el-select>
                        <el-select class="select-style" v-model="jcdwValue" placeholder="请输入检测单位"
                            :popper-append-to-body="false" @change="chooseJcdw" clearable>
                            <el-option v-for="item in jcdwOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <el-select class="select-style" v-model="zhlxValue" placeholder="灾害类型"
                            :popper-append-to-body="false" @change="chooseZhlx" clearable>
                            <el-option v-for="item in zhlxOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <el-input class="input-style" v-model="jcdmcInput" placeholder="请输入监测点名称" clearable
                            style="width: 48%" />
                        <el-button class="button-style" type="primary">查询</el-button>
                    </div>
                    <div class="right-list">

                    </div>
                    <div class="right-bottom">
                        <el-config-provider :locale="locale">
                            <el-pagination layout="->, total, prev, pager, next, jumper" :total="totalNumber"
                                :page-size="pageSize" @current-change="currentChange" @size-change="handleSizeChange"
                                :page-sizes="[1, 3, 6, 10]" :current-page="currentPage" background small></el-pagination>
                        </el-config-provider>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.main-page {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        display: flex;
        justify-content: space-between;

        .left-page {
            width: 10%;
        }

        .right-page {
            position: relative;
            width: 31%;
            margin-top: 5%;
            background-color: aqua;

            .right-header {
                background-color: #164676;
                line-height: 32px;
                padding-left: 10px;
                color: white;
                font-size: 13px;
                display: flex;
            }

            .right-container {

                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 10px;
                justify-content: space-between;

                .date-picker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48%;

                    ::v-deep .el-input__wrapper {
                        height: 25px;
                        font-size: 12px;
                    }

                    ::v-deep .el-date-editor.el-input,
                    .el-date-editor.el-input__wrapper {
                        align-items: center;
                        height: 25px;
                    }
                }

                .treeSelect {
                    width: 48%;
                    padding: 5px 0;

                    ::v-deep .vue-treeselect__placeholder,
                    ::v-deep .vue-treeselect__single-value {
                        line-height: 30px;
                        font-size: 12px;
                    }

                    ::v-deep .vue-treeselect__control {
                        height: 30px;
                    }
                }


                .select-style {
                    width: 48%;

                    ::v-deep .el-input__inner {
                        font-size: 12px;
                    }
                }

                .input-style {
                    padding-top: 5px;
                }

                .button-style {
                    width: 10%;
                    margin-top: 5px;
                    height: 25px;
                    font-size: 12px;
                    margin-right: 38%;
                }

            }

            .right-list {
                height: 350px;
            }

            .right-bottom {
                position: absolute;
                bottom: 1%;
                right: 1%;

                ::v-deep .el-pagination__total {
                    display: none;
                }

                ::v-deep .el-pagination__jump {
                    margin-left: 0;
                }
            }
        }
    }
}

::v-deep .el-input__inner {
    height: 25px;
    line-height: 28px;
    font-size: 12px;
}

::v-deep .el-dialog__header {
    display: flex;
    padding: 10px 15px;
    background-color: #17467A;
    height: 20px;
    margin: 0;
}

::v-deep .el-dialog__title {
    font-size: 16px;
    color: white;
}

::v-deep .el-dialog__headerbtn {
    position: absolute;
    top: 0px;
    padding: 10px 0;
    width: 50px;
    height: 40px;
    cursor: pointer;
}

::v-deep .el-dialog__headerbtn:focus {
    outline: none;
    /* 在获得焦点时再次确保去掉轮廓样式 */
}

::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: white;
}

::v-deep .el-dialog__body {
    padding: 10px 10px;
}
</style>

