<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-19 15:00:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-27 15:38:14
 * @FilePath: \DW-Systems\src\components\common\dialog\JcdglView.vue
 * @Description: 监测点信息列表页面
-->
<script setup>
import bus from 'vue3-eventbus'
import { useStore } from "@/store/mystore.js";
import { ref, onMounted, computed } from 'vue';
import en from 'element-plus/dist/locale/en.mjs'
import MapView from '@/components/common/MapView.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import MapTool from '@/components/common/tools/MapTool.vue';
import { queryJcdlbByParams, listJcdw, listJcxm } from '@/api/jcsj/jcdgl'
import Treeselect from "vue3-treeselect"
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { getXzqhData } from '@/components/common/xzqhData.js'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

let dialogVisible = ref(false)//初始化窗口不进行显示
const xzqhValue = ref('4205')//初始化行政区划选择框
const jcdmcInput = ref('')//初始化监测点名称输入框
const zhlxValue = ref('')//初始化灾害类型选择框
const jcdbhInput = ref('')//初始化监测点编号输入框
const gjcInput = ref('')//初始化关键字输入框
const jcdwValue = ref('')//初始化检测单位选择框
const xmmcValue = ref('')//初始化项目名称选择框
const olMap = ref('')//初始化olMap
const treeData = getXzqhData()//定义行政区划数据
//定义灾害类型数据
const zhlxOptions = [
    {
        value: '07',
        label: '地面沉降',
    },
    {
        value: '06',
        label: '地裂缝',
    },
    {
        value: '04',
        label: '地面塌陷',
    },
    {
        value: '03',
        label: '泥石流',
    },
    {
        value: '02',
        label: '崩塌',
    },
    {
        value: '01',
        label: '滑坡',
    },
    {
        value: '00',
        label: '不稳定斜坡',
    },
]
const jcdwOptions = ref([])//初始化检测单位中选择框内的值
const xmmcOptions = ref([])//初始化项目名称中选择框内的值

onMounted(() => {
    getJcdwList()
    getXmmcList()
})
//初始化获取监测点分布信息数据的参数
let jcdxxParams = {
    "jcdbh": "",
    "jcdmc": "",
    "userXzqh": "",
    "searchParams": "",
    "zhlxList": [],
    "monitoringUnitId": "",
    "projectId": "",
    "pageNum": null,
    "pageSize": null,
}
//初始化获取灾害类型中监测点信息数据的参数
let zhlxParams = {
    "jcdbh": "",
    "jcdmc": "",
    "userXzqh": useStore().cityCode,
    "searchParams": "",
    "zhlxList": [],
    "monitoringUnitId": "",
    "projectId": "",
    "pageNum": null,
    "pageSize": null
}
const currentType = ref(true)//记录打开dialog窗口的类型，ture代表打开的监测点分布，false代表打开的是灾害类型
//触发点击柱状图事件后，打开dialog弹窗
bus.on('clickBarChart', (res) => {
    //将行政编码保存进参数中
    jcdxxParams.userXzqh = res
    //显示dialog页面
    dialogVisible.value = true
    //记录打开dialog窗口的类型
    currentType.value = true
    //将监测点分布数据全部进行获取
    getAllJcdxxData(jcdxxParams)
})
//触发点击饼图事件后，打开dialog弹窗
bus.on('clickPieChart', (res) => {
    //显示dialog页面
    dialogVisible.value = res
    //记录打开dialog窗口的类型
    currentType.value = false
    //初始化显示点击的灾害类型
    zhlxOptions.forEach((element) => {
        if (element.label === useStore().zhlx) {
            zhlxParams.zhlxList = [element.value]
            zhlxValue.value = element.value
        }
    })
    //将灾害类型数据全部进行获取
    getAllJcdxxData(zhlxParams)
})
//自定义键名
function normalizer(node) {
    return {
        id: node.xzqhdm,
        label: node.xzqhmc,
        children: node.children,
    }
}
//选择行政地区
function handleTreeSelect(node) {
    console.log(node.xzqhdm)
}
//初始化图层开始显示的要素
let active = ref(true)
//根据不同的图层进行切换样式
function toggleLayers(activeLayer) {
    const book = document.querySelector('.book');
    const map = document.querySelector('.map');

    if (activeLayer === 'book') {
        book.style.backgroundColor = '#409EFF';
        map.style.backgroundColor = 'white';
        active.value = false;
        //默认当前页为第一页
        currentPage.value = 1

        if (currentType.value) {
            //每次点击后初始化显示第一页
            jcdxxParams.pageNum = 1
            //显示十条数据
            jcdxxParams.pageSize = 10
            //获取监测点表格数据
            getJcdxxData(jcdxxParams)
        } else {
            //每次点击后初始化显示第一页
            zhlxParams.pageNum = 1
            //显示十条数据
            zhlxParams.pageSize = 10
            //初始化显示点击的灾害类型
            getJcdxxData(zhlxParams)
        }
    } else {
        map.style.backgroundColor = '#409EFF';
        book.style.backgroundColor = 'white';
        active.value = true

        //重新根据条件进行渲染
        if (currentType.value) {
            jcdxxParams.pageNum = null
            jcdxxParams.pageSize = null
            getAllJcdxxData(jcdxxParams)
        } else {
            zhlxParams.pageNum = null
            zhlxParams.pageSize = null
            getAllJcdxxData(zhlxParams)
        }
    }
}
// 计算页面大小函数
function calculatePageSize() {
    const screenHeight = (window.innerHeight * 0.85 - 40) / 60;
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
    if (currentType.value) {
        jcdxxParams.pageNum = val
        getJcdxxData(jcdxxParams)
    } else {
        zhlxParams.pageNum = val
        getJcdxxData(zhlxParams)
    }
}
//编辑每一行表格数据
function handleClick() {
    console.log('编辑表格')
}
//删除表格的某行数据
function deleteRow(index) {
    ElMessageBox.confirm(
        '确定要删除吗?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            //删除数据
            tableData.value.splice(index, 1)
            ElMessage({
                type: 'success',
                message: '删除成功！',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除！',
            })
        })
}
//初始化加载状态
const loading = ref(true)
//初始化表格数据
const tableData = ref([]);
const totalNumber = ref(0)
//分页获取监测点信息数据
function getJcdxxData(params) {
    loading.value = true
    queryJcdlbByParams(params).then((res) => {
        tableData.value = []
        if (res && res.result) {
            totalNumber.value = res.result.total
            loading.value = false
            const result = res.result.list
            result.forEach((element, key) => {
                tableData.value.push({
                    number: key + ((currentPage.value - 1) * 10 + 1),//根据当前页计算序号
                    jcdbh: element.jcaa02a015,
                    jcdmc: element.jcaa02a030,
                    position: element.jcaa02a050,
                    zhlx: element.jcaa02a090,
                    jcdw: element.jcdwmc,
                    jcdld: element.jcaa02a010,
                    yhdbh: element.jcaa02a020,
                })
            });
        }
    })
}
//整体全部获取监测点信息数据
function getAllJcdxxData(params) {
    queryJcdlbByParams(params).then((res) => {
        if (res && res.result) {
            const result = res.result.list
            olMap.value.addMarker(result)
        }
    })
}
//设置特定列的文字样式
function cellStyle({ columnIndex }) {
    if (columnIndex === 2 || columnIndex === 3) {
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
//获取监测单位下拉列表数据
function getJcdwList() {
    listJcdw().then((res) => {
        if (res && res.result) {
            jcdwOptions.value = []
            res.result.forEach((element) => {
                jcdwOptions.value.push({
                    value: element.csid,
                    label: element.csmc
                })
            })
        }
    })
}
//获取项目名称下拉列表数据
function getXmmcList(params) {
    listJcxm(params).then((res) => {
        if (res && res.result) {
            xmmcOptions.value = []
            res.result.forEach((element) => {
                xmmcOptions.value.push({
                    value: element.projectId,
                    label: element.projectName
                })
            })
        }
    })
}
//选择检测单位
function chooseJcdw() {
    //根据单位匹配相应的项目名称
    getXmmcList(jcdwValue.value)
    //清除项目名称的选择
    xmmcValue.value = ''
    if (currentType.value) {
        jcdxxParams.projectId = ''
        jcdxxParams.monitoringUnitId = jcdwValue.value
        //获取监测点表格数据
        getJcdxxData(jcdxxParams)
        //getAllJcdxxData(jcdxxParams)
    } else {
        zhlxParams.projectId = ''
        zhlxParams.monitoringUnitId = jcdwValue.value
        //获取监测点表格数据
        getJcdxxData(zhlxParams)
        //getAllJcdxxData(zhlxParams)
    }
}
//选择项目名称
function chooseXmmc() {
    if (currentType.value) {
        jcdxxParams.projectId = xmmcValue.value
        //获取监测点表格数据
        getJcdxxData(jcdxxParams)
    } else {
        zhlxParams.projectId = xmmcValue.value
        //获取监测点表格数据
        getJcdxxData(zhlxParams)
    }
}
//选择灾害类型
function chooseZhlx() {
    if (currentType.value) {
        jcdxxParams.zhlxList = zhlxValue.value === "" ? [] : [zhlxValue.value];
        //获取监测点表格数据
        getJcdxxData(jcdxxParams)
    } else {
        zhlxParams.zhlxList = zhlxValue.value === "" ? [] : [zhlxValue.value];
        //获取监测点表格数据
        getJcdxxData(zhlxParams)
    }
}
//关闭dielog的回调函数，并且将所选择的参数都进行重置
function handleClose() {
    xzqhValue.value = ''
    jcdmcInput.value = ''
    zhlxValue.value = ''
    jcdbhInput.value = ''
    gjcInput.value = ''
    jcdwValue.value = ''
    xmmcValue.value = ''
    jcdxxParams.monitoringUnitId = ''
    zhlxParams.monitoringUnitId = ''
    jcdxxParams.projectId = ''
    zhlxParams.projectId = ''
    jcdxxParams.zhlxList = []
    zhlxParams.zhlxList = []
    dialogVisible.value = false
    const book = document.querySelector('.book');
    const map = document.querySelector('.map');
    map.style.backgroundColor = '#409EFF';
    book.style.backgroundColor = 'white';
    active.value = true
}
</script>

<template>
    <div class="main-page">
        <el-dialog v-model="dialogVisible" title="监测点信息列表" width="86%" top="4%" :close-on-click-modal='false'
            :before-close="handleClose" :destroy-on-close='true'>
            <div class="container-top">
                <span>行政区划：</span>
                <treeselect class="treeSelect" v-model="xzqhValue" :options="treeData" no-options-text="暂无数据"
                    placeholder="请选择行政区划" @select="handleTreeSelect" :normalizer="normalizer">
                </treeselect>
                <span>监测点名称：</span>
                <el-input v-model="jcdmcInput" placeholder="请输入监测点" clearable style="width: 11%" />
                <span>监测点编号：</span>
                <el-input v-model="jcdbhInput" placeholder="请输入监测点" clearable style="width: 11%" />
                <span>灾害类型：</span>
                <el-select v-model="zhlxValue" class="select1-style" placeholder="请选择灾害类型" :popper-append-to-body="false"
                    @change="chooseZhlx" clearable>
                    <el-option v-for="item in zhlxOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>关键字：</span>
                <el-input v-model="gjcInput" placeholder="请输入关键字" clearable style="width: 10%" />
                <span>检测单位：</span>
                <el-select v-model="jcdwValue" placeholder="请输入检测单位" :popper-append-to-body="false" @change="chooseJcdw"
                    clearable>
                    <el-option v-for="item in jcdwOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>项目名称：</span>
                <el-select v-model="xmmcValue" placeholder="请选择项目名称" :popper-append-to-body="false" @change="chooseXmmc"
                    clearable>
                    <el-option v-for="item in xmmcOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </div>
            <div class="container-middle">
                <div>
                    <el-button type="primary"><el-icon>
                            <Plus />
                        </el-icon>新建</el-button>
                    <el-button type="primary"><el-icon>
                            <DocumentCopy />
                        </el-icon>全部导出</el-button>
                </div>
                <div class="choose-content">
                    <div class="book" @click="toggleLayers('book')">
                        <img v-if="active" src="@/assets/images/syView/book_off.png" />
                        <img v-else src="@/assets/images/syView/book_on.png" />
                    </div>
                    <div class="map" @click="toggleLayers('map')">
                        <img v-if="active" src="@/assets/images/syView/map_on.png" />
                        <img v-else src="@/assets/images/syView/map_off.png" />
                    </div>
                </div>
            </div>
            <div class="container-down">
                <MapView ref="olMap" v-if="active" :id="'olMap3'"></MapView>
                <div class="map-tool" v-if="active">
                    <map-tool></map-tool>
                </div>
                <div class="zhData" v-else>
                    <el-config-provider :locale="locale">
                        <el-table v-loading="loading" :data="tableData" style="width: 100%" :row-style="{ height: '20px' }"
                            stripe :cell-style="cellStyle" @cell-click="showCellData">
                            <el-table-column prop="number" label="序号" min-width="10%" show-overflow-tooltip />
                            <el-table-column prop="jcdbh" label="监测点编号" min-width="20%" show-overflow-tooltip />
                            <el-table-column prop="jcdmc" label="监测点名称" min-width="30%" show-overflow-tooltip />
                            <el-table-column prop="position" label="地理位置" min-width="35%" show-overflow-tooltip />
                            <el-table-column prop="zhlx" label="灾害类型" min-width="10%" show-overflow-tooltip />
                            <el-table-column prop="jcdw" label="监测单位" min-width="10%" show-overflow-tooltip />
                            <el-table-column prop="cz" label="操作" min-width="15%">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
                                    <el-button link type="danger" size="small"
                                        @click.prevent="deleteRow(scope.$index)">删除</el-button>
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

        .treeSelect {
            width: 15%;

            ::v-deep .vue-treeselect__placeholder,
            ::v-deep .vue-treeselect__single-value {
                line-height: 30px;
            }

            ::v-deep .vue-treeselect__control {
                height: 30px;
            }
        }

        span {
            font-size: 12px;
            width: 7%;
            text-align: right;
            margin: 12px 0px;
        }

        ::v-deep .el-button {
            margin-left: 10px;
            height: 28px;
            width: 3%;
            font-size: 12px;
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

            .book,
            .map {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.4286rem 0.5rem;
            }

            .book {
                border: 1px solid rgb(64, 158, 255);
            }

            .map {
                border: 1px solid rgb(64, 158, 255);
                background-color: #409EFF;
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

.treeSelect-style {
    width: 15.5%;

    ::v-deep .el-input__inner {
        font-size: 12px;
    }
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