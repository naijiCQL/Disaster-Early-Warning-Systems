<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-25 10:35:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-25 20:13:50
 * @FilePath: \DW-Systems\src\components\common\dialog\SbxxView.vue
 * @Description: 设备信息列表页面
-->
<script setup>
import bus from 'vue3-eventbus'
import { useStore } from "@/store/mystore.js";
import { ref, onMounted, computed } from 'vue';
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { listCsmc, listJcdw, listByDicCode, querySblbByParams } from '@/api/sbyx/sbck'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

let dialogVisible = ref(false)//初始化窗口不进行显示
const xzqhValue = ref('')//初始化行政区划选择框
const csmcValue = ref('')//初始化灾害类型选择框
const jclxValue = ref('')//初始化监测类型选择框
const sbbhInput = ref('')//初始化设备编号输入框
const sblxValue = ref(["0"])//初始化设备类型选择框
const sbmcInput = ref('')//初始化设备名称输入框
const jcdmcInput = ref('')//初始化监测点名称输入框
const sbztValue = ref('')//初始化检测单位选择框
const jcdwValue = ref('')//初始化项目名称选择框

//定义行政区划数据
const data = [
    {
        value: '1',
        label: '宜昌市',
        children: [
            {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                    {
                        value: '1-1-1',
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
]
const csmcOptions = ref([])//初始化厂商名称选择框内的值
const jclxOptions = ref([])//初始化检测类型选择框内的值
//初始化设备类型选择框内的值
const sblxOptions = ref([
    {
        label: '自动化监测',
        value: '0'
    },
    {
        label: '人工监测',
        value: '1'
    },
])
const sbztOptions = ref([])//初始化检设备状态选择框内的值
const jcdwOptions = ref([])//初始化监测单位中选择框内的值

const jclxParam = { dicCodes: 'JCAA01A030' }//获取监测类型参数
const sbztParam = { dicCodes: 'JCAA07A030' }//获取设备状态参数
//分页查询设备数据参数
const sbxxParams = {
    "csmc": "",
    "startTime": "",
    "endTime": "",
    "jcdmc": "",
    "jclx": "",
    "sbmc": "",
    "sbzt": "",
    "jcdw": null,
    "hasMonitorPoint": "",
    "userXzqh": "",
    "xzqh": useStore().cityCode,
    "pageNum": 1,
    "pageSize": 8,
    "monitorPointProgress": null,
    "projectId": null,
    "lx": "0",
}

onMounted(() => {

})

bus.on('clickJcsbView', (res) => {
    dialogVisible.value = true
    //得到厂商数据
    getCsData()
    //得到监测类型数据
    getJclxData(jclxParam)
    //得到设备状态数据
    getSbztData(sbztParam)
    //得到监测单位数据
    getJcdwData()
    //点击了在线的窗口
    if (res == '1') {
        sbxxParams.sbzt = '1'
        sbztValue.value = '1'
    }
    //分页查询设备信息数据
    getSbxxData(sbxxParams)
})
//得到厂商数据
function getCsData() {
    listCsmc().then((res) => {
        if (res && res.result) {
            csmcOptions.value = []
            res.result.forEach((item) => {
                csmcOptions.value.push({
                    label: item.csmc,
                    value: item.csid
                })
            })
        }
    })
}
//得到监测类型数据
function getJclxData(param) {
    listByDicCode(param).then((res) => {
        if (res && res.result) {
            jclxOptions.value = []
            let key = Object.keys(res.result)
            res.result[key].forEach((item) => {
                jclxOptions.value.push({
                    label: item.value,
                    value: item.value,
                    dicCode: item.dicCode
                })
            })
        }
    })
}
//得到设备状态数据
function getSbztData(param) {
    listByDicCode(param).then((res) => {
        if (res && res.result) {
            sbztOptions.value = []
            let key = Object.keys(res.result)
            res.result[key].forEach((item) => {
                sbztOptions.value.push({
                    label: item.value,
                    value: item.code,
                    dicCode: item.dicCode
                })
            })
        }
    })
}
//得到监测单位数据
function getJcdwData() {
    listJcdw().then((res) => {
        if (res && res.result) {
            jcdwOptions.value = []
            res.result.forEach((item) => {
                jcdwOptions.value.push({
                    label: item.csmc,
                    value: item.csid
                })
            })
        }
    })
}
//分页查询获取表格数据
function getSbxxData(param) {
    loading.value = true
    querySblbByParams(param).then((res) => {
        if (res && res.result) {
            loading.value = false
            totalNumber.value = res.result.total
            tableData.value = []
            res.result.list.forEach((item) => {
                let szzt = item.zt === '1' ? '在线' : '离线'
                tableData.value.push({
                    zt: szzt,
                    sbbh: item.sbbb,
                    sbmc: item.sbmc,
                    jcdmc: item.jcdmc,
                    csmc: item.csmc,
                    dlwz: item.dlwz,
                    jclx: item.jclx
                })
            })
        }
    })
}
// 计算页面大小函数
function calculatePageSize() {
    const screenHeight = (window.innerHeight * 0.85 - 40) / 75;
    return Math.max(1, screenHeight.toFixed(0)); // 至少为1条数据
}
// 在窗口大小改变时重新计算 pageSize
window.addEventListener('resize', () => {
    pageSize.value = calculatePageSize();
});

const currentPage = ref(1)//初始化当前页
const pageSize = ref(calculatePageSize());//根据页面大小计算每个表格所容纳的个数
//每页条数改变时触发 选择一页显示多少行
function handleSizeChange(val) {
    pageSize.value = val;
}
//当前页改变时触发 跳转其他页
function currentChange(val) {
    currentPage.value = val;
    sbxxParams.pageNum = val
    getSbxxData(sbxxParams)
}
//编辑每一行表格数据
function handleClick() {
    console.log('编辑表格')
}

const loading = ref(true)//初始化加载状态
const tableData = ref([]);//初始化表格数据
const totalNumber = ref(0)//初始化表格中数据总量
//选择设备类型
function selectSblxValue() {
    let sblx = sblxValue.value.toString()
    console.log(sblx)
    sbxxParams.lx = sblx
    getSbxxData(sbxxParams)
}
//按照设备状态修改其标签颜色
function getSpanStyle(zt) {
    if (zt === '离线') {
        return { backgroundColor: 'red' };
    }
}
//选择设备状态
function selectSbztValue() {
    console.log(sbztValue.value)
    sbxxParams.sbzt = sbztValue.value
    getSbxxData(sbxxParams)
}
//dialog窗口组件销毁前，将所有状态进行初始化
function handleClose() {
    sbxxParams.sbzt = ''
    sbxxParams.pageNum = '1'
    sbztValue.value = ''
    sbxxParams.lx = '0'
    sblxValue.value = ["0"]
    dialogVisible.value = false
}
</script>
<template>
    <div class="main-page">
        <el-dialog v-model="dialogVisible" title="设备信息列表" width="86%" top="5%" :close-on-click-modal='false'
            :before-close="handleClose" :destroy-on-close='true'>
            <div class="container-top">
                <span>行政区划：</span>
                <el-tree-select v-model="xzqhValue" :data="data" :render-after-expand="false" placeholder="请选择行政区划"
                    class="treeSelect-style" />
                <span>厂商名称：</span>
                <el-select v-model="csmcValue" class="select1-style" placeholder="请选择" :popper-append-to-body="false"
                    clearable>
                    <el-option v-for="item in csmcOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>监测类型：</span>
                <el-select v-model="jclxValue" class="select1-style" placeholder="请选择监测类型" :popper-append-to-body="false"
                    clearable>
                    <el-option v-for="item in jclxOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>设备编号：</span>
                <el-input v-model="sbbhInput" placeholder="请输入设备编号" clearable style="width: 12%" />
                <span>设备类型：</span>
                <el-select v-model="sblxValue" class="select1-style" placeholder="请选择设备类型" :popper-append-to-body="false"
                    clearable multiple collapse-tags collapse-tags-tooltip @change="selectSblxValue">
                    <el-option v-for="item in sblxOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>设备名称：</span>
                <el-input v-model="sbmcInput" placeholder="请输入设备名称" clearable style="width: 15%" />
                <span>监测点名称：</span>
                <el-input v-model="jcdmcInput" placeholder="请输入监测点名称" clearable style="width: 15%" />
                <span>设备状态：</span>
                <el-select v-model="sbztValue" placeholder="请输入设备状态" :popper-append-to-body="false"
                    @change="selectSbztValue" clearable>
                    <el-option v-for="item in sbztOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>监测单位：</span>
                <el-select v-model="jcdwValue" placeholder="请选择" :popper-append-to-body="false" clearable>
                    <el-option v-for="item in jcdwOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="container-middle">
                <div>
                    <el-button type="primary"> <el-icon>
                            <Bottom />
                        </el-icon>导出</el-button>
                    <el-button type="primary"> <el-icon>
                            <Bottom />
                        </el-icon>全部导出</el-button>
                    <el-button type="primary"> <el-icon>
                            <Bottom />
                        </el-icon>下载设备二维码</el-button>
                </div>
                <div class="choose-content">
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </div>
            </div>
            <div class="container-down">
                <div class="zhData">
                    <el-config-provider :locale="locale">
                        <el-table v-loading="loading" :data="tableData" style="width: 100%" :row-style="{ height: '20px' }"
                            stripe>
                            <el-table-column type="selection" prop="number" min-width="5%" />
                            <el-table-column prop="zt" label="状态" min-width="10%">
                                <template #default="scope">
                                    <span class="zt" :style="getSpanStyle(scope.row.zt)"></span>
                                    <span>{{ scope.row.zt }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sbbh" label="设备编号" min-width="15%" show-overflow-tooltip />
                            <el-table-column prop="sbmc" label="设备名称" min-width="15%" show-overflow-tooltip />
                            <el-table-column prop="jcdmc" label="监测点名称" min-width="15%" show-overflow-tooltip />
                            <el-table-column prop="csmc" label="厂商名称" min-width="10%" show-overflow-tooltip />
                            <el-table-column prop="dlwz" label="地理位置" min-width="15%" show-overflow-tooltip />
                            <el-table-column prop="jclx" label="检测类型" min-width="15%" show-overflow-tooltip />
                            <el-table-column prop="cz" label="操作" min-width="15%">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="handleClick">设备详情</el-button>
                                    <el-button link type="primary" size="small">数据查看</el-button>
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

    .container-top {
        background-color: rgb(245, 247, 250);
        border-bottom: 1px solid #e3e3e3;
        border-top: 1px solid #e3e3e3;
        background: #f5f7fa;
        padding: 10px 0px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        span {
            font-size: 12px;
            width: 7%;
            text-align: right;
            margin: 12px 0px;
        }
    }

    .container-middle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.9rem 0.625rem;

        .choose-content {
            display: flex;
            cursor: pointer;
            width: 7%;


            ::v-deep .el-button {
                margin-left: 5px;
                height: 28px;
                width: 45%;
                font-size: 12px;
            }
        }

        ::v-deep .el-button {
            height: 28px;
            font-size: 12px;
            padding: 10px;
        }

        ::v-deep .el-icon {
            margin-right: 5px;
        }
    }

    .container-down {
        width: 100%;
        height: 50vh;
        box-sizing: border-box;
        z-index: 0;

        .zhData {
            .block {
                position: absolute;
                bottom: 1%;
                right: 1%;
            }

            .zt {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 8px;
                background: green;
                margin-right: 5px;
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

.treeSelect-style {
    width: 15%;

    ::v-deep .el-input__inner {
        font-size: 12px;
    }
}

::v-deep .el-select .el-select__tags-text {
    max-width: none !important;
}

::v-deep .el-select .el-input__wrapper {
    max-height: 28px;
}

.select1-style {
    width: 12%;

    ::v-deep .el-input__inner {
        font-size: 12px;
    }



}

::v-deep .el-input__inner {
    height: 28px;
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