<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-25 09:28:45
 * @FilePath: \DW-Systems\src\components\common\dialog\YjxxglView.vue
 * @Description: 预警信息列表页面
-->
<script setup>
import bus from 'vue3-eventbus'
import { ref, onMounted, computed } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { queryPageWarningInfo } from "@/api/sy";


const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

const dialogVisible = ref(false)//初始化窗口不进行显示
const timeValue1 = ref('')//用于保存选择开始时间的值
const timeValue2 = ref('')//用于保存选择结束时间的值
const yjdjValue = ref('')//用于保存预警等级选择框所选择的值
//初始化预警等级下拉列表数据
const options = [
    {
        value: "C4",
        color: "rgb(248, 68, 95)",
        label: "红"
    },
    {
        value: "C3",
        color: "rgb(251,141,51)",
        label: "橙"
    },
    {
        value: "C2",
        color: "rgb(245, 209, 69)",
        label: "黄"
    },
    {
        value: "C1",
        color: "rgb(43, 164, 232)",
        label: "蓝"
    }
]
const tableData = ref([]);//初始化表格数据
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

onMounted(() => {
    //获取预警信息
    getWarnInfo(warnInfoParams)
})
//打开预警信息列表
bus.on('clickMoreInfo', (res) => {
    dialogVisible.value = res
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
//初始化加载状态
const loading = ref(true)
const totalNumber = ref(0)
//得到预警监测信息
function getWarnInfo(params) {
    loading.value = true
    queryPageWarningInfo(params).then((res) => {
        if (res && res.result.total) {
            totalNumber.value = res.result.total
            loading.value = false
            res.result.list.forEach((item, key) => {
                tableData.value.push({
                    number: key + ((currentPage.value - 1) * 10 + 1),//根据当前页计算序号
                    name: item.monitorPointName,
                    address: item.adress,
                    //grade:item.
                    time: item.warningTime,
                })
            })
        }
    })
}
//编辑每一行表格数据
function handleClick() {
    console.log('编辑表格')
}
//设置特定列的文字样式
function cellStyle({ columnIndex }) {
    if (columnIndex === 1) {
        return {
            color: '#409eff',
            cursor: 'pointer'
        }
    }
}
//给表格的每个数据绑定事件，点击获取表格数据
function showCellData(row, column) {
    if (column.label === "监测点名称") {
        console.log(row.jcdmc)
    } else if (column.label === "地理位置") {
        console.log(row.position)
    }
}
</script>
<template>
    <div class="main-page">
        <el-dialog v-model="dialogVisible" title="预警信息列表" width="71%" top="5%" :close-on-click-modal='false'>
            <div class="container-top">
                <div class="date-picker">
                    <el-date-picker v-model="timeValue1" type="date" placeholder="开始时间" />
                </div>
                <span>-</span>
                <div class="date-picker">
                    <el-date-picker v-model="timeValue2" type="date" placeholder="结束时间" />
                </div>
                <el-select v-model="yjdjValue" placeholder="预警等级" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button type="primary">查询</el-button>
            </div>
            <div class="container-down">
                <div class="zhData">
                    <el-config-provider :locale="locale">
                        <el-table :data="tableData" style="width: 100%" :row-style="{ height: '20px' }" stripe
                            :cell-style="cellStyle" @cell-click="showCellData">
                            <el-table-column prop="number" label="序号" min-width="10%" show-overflow-tooltip/>
                            <el-table-column prop="name" label="监测点名称" min-width="25%" show-overflow-tooltip/>
                            <el-table-column prop="address" label="地理位置" min-width="25%" show-overflow-tooltip/>
                            <el-table-column prop="grade" label="预警等级" min-width="15%" show-overflow-tooltip/>
                            <el-table-column prop="time" label="预警发布时间" min-width="15%" show-overflow-tooltip/>
                            <el-table-column prop="cz" label="操作" min-width="15%">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination layout="->, total, prev, pager, next, jumper" :total="totalNumber"
                                :page-size="pageSize" @current-change="currentChange" @size-change="handleSizeChange"
                                :page-sizes="[1, 3, 6, 10]" :current-page="currentPage" background small></el-pagination>
                        </div>
                    </el-config-provider>
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

    .container-top {
        background-color: white;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        span {
            margin: 5px;
        }

        .date-picker {
            display: flex;
            align-items: center;
            justify-content: center;

            ::v-deep .el-input__wrapper {
                height: 25px;
            }

            ::v-deep .el-date-editor.el-input,
            .el-date-editor.el-input__wrapper {
                align-items: center;
            }
        }

        ::v-deep .el-select {
            margin-left: 10px;
        }

        ::v-deep .el-button {
            margin-left: 10px;
            height: 25px;
            width: 4%;
            font-size: 12px;
        }
    }

    .container-down {
        width: 100%;
        height: 56vh;
        box-sizing: border-box;
        z-index: 0;

        .map-tool {
            position: absolute;
            top: calc(100% - 215px);
            right: 1%;
            width: 32%;
        }

        .zhData {
            .block {
                position: absolute;
                bottom: 1%;
                right: 1%;
            }

            ::v-deep .el-table .el-table__cell {
                text-align: center;
                padding: 6px 0;
                line-height: 22px;
                font-size: 12px;
            }

            ::v-deep .el-table td.el-table__cell,
            .el-table th.el-table__cell.is-leaf {
                border-bottom: 1px solid #EBEEF5;
            }

            ::v-deep .el-table th,
            ::v-deep .el-table .is-group th {
                text-align: center;
                background-color: #ebf1fd !important;
                color: #00264b;
            }

            ::v-deep .el-pagination {
                color: #303133;
                font-weight: 700;
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