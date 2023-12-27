<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-19 15:00:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-27 17:55:04
 * @FilePath: \DW-Systems\src\components\dcpj\DcpjView.vue
 * @Description: 监测点信息列表页面
-->
<script setup>
import { ref, onMounted } from 'vue';
import MapTool from '@/components/common/tools/MapTool.vue';
import Treeselect from "vue3-treeselect"
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { useStore } from "@/store/mystore.js";

let dialogVisible = ref(false)//初始化窗口不进行显示

onMounted(() => {

})

function handleClose() {
    console.log('窗口关闭')
    dialogVisible.value = false
}
</script>
<template>
    <div class="main-page">
        <el-button type="primary" @click="dialogVisible = true">点击按钮</el-button>
        <el-dialog v-model="dialogVisible" title="预警分析" width="83%" top="4%" :close-on-click-modal='false'
            :before-close="handleClose" :destroy-on-close='true'>
            <div class="container">
                <div class="left-page">
                    <MapTool></MapTool>
                </div>
                <div class="right-page">
                    <div class="right-header">
                        <span>预警信息列表 (1)</span>
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

            .right-header {
                background-color: #164676;
                line-height: 32px;
                padding-left: 10px;
                color: white;
                font-size: 13px;
                display: flex;
            }

            .right-container {
                background-color: aqua;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 5px;
                justify-content: space-between;

                .date-picker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 49%;

                    ::v-deep .el-input__wrapper {
                        height: 25px;
                        font-size: 12px;
                    }

                    ::v-deep .el-date-editor.el-input,
                    .el-date-editor.el-input__wrapper {
                        align-items: center;
                    }
                }

                .treeSelect {
                    width: 49%;

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
                    width: 49%;

                    ::v-deep .el-input__inner {
                        font-size: 12px;
                    }
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