<!--
 * @Author: 陈巧龙
 * @Date: 2023-12-19 15:00:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-20 13:47:05
 * @FilePath: \DW-Systems\src\components\jcdgl\JcdglView.vue
 * @Description: 监测点管理dialog页面
-->
<script setup>
import { ref, onMounted, computed } from 'vue';
import MapView from '@/components/common/MapView.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import bus from 'vue3-eventbus'
import { queryJcdlbByParams } from '@/api/jcsj/jcdgl'
import { ElMessage, ElMessageBox } from 'element-plus'
import MapTool from '@/components/common/tools/MapTool.vue';

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

let dialogVisible = ref(false)//初始化窗口不进行显示
const xzqhValue = ref('')//初始化行政区划选择框
const jcdmcInput = ref('')//初始化监测点名称输入框
const zhlxValue = ref('')//初始化灾害类型选择框
const jcdbhInput = ref('')//初始化监测点编号输入框
const gjcInput = ref('')//初始化关键字输入框
const jcdwValue = ref('')//初始化检测单位选择框
const xmmcValue = ref('')//初始化项目名称选择框

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

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    }
]
//初始化获取监测点信息数据参数
let jcdxxParams = {
    "jcdbh": "",
    "jcdmc": "",
    "userXzqh": "",
    "searchParams": "",
    "zhlxList": null,
    "monitoringUnitId": "",
    "projectId": "",
    "pageNum": 1,
    "pageSize": 10
}
//触发点击事件后，打开dialog弹窗
bus.on('clickBarChart', (res) => {
    currentPage.value = 1
    jcdxxParams.userXzqh = res
    jcdxxParams.pageNum = 1
    getJcdxxData(jcdxxParams)
    dialogVisible.value = true
})

onMounted(() => {

})
//初始化图层开始显示的要素
let active = ref(true)
//根据不同的图层进行切换样式
function toggleLayers(activeLayer) {
    const book = document.querySelector('.book');
    const map = document.querySelector('.map');

    if (activeLayer === 'book') {
        book.style.backgroundColor = '#409EFF';
        map.style.backgroundColor = 'white';
        active.value = false
    } else {
        map.style.backgroundColor = '#409EFF';
        book.style.backgroundColor = 'white';
        active.value = true
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
    console.log(val)
    currentPage.value = val;
    loading.value = true
    jcdxxParams.pageNum = val
    getJcdxxData(jcdxxParams)
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
//获取监测点信息数据
function getJcdxxData(params) {
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
    if (column.label === "监测点名称" || column.label === "地理位置") {
        console.log(row)
    }
}
</script>

<template>
    <div class="main-page">
        <el-dialog v-model="dialogVisible" title="监测点信息列表" width="86%" top="4%" :close-on-click-modal='false'>
            <div class="container-top">
                <span>行政区划：</span>
                <el-tree-select v-model="xzqhValue" :data="data" :render-after-expand="false" placeholder="请选择行政区划"
                    class="treeSelect-style" />
                <span>监测点名称：</span>
                <el-input v-model="jcdmcInput" placeholder="请输入监测点" clearable style="width: 10%" />
                <span>监测点编号：</span>
                <el-input v-model="jcdbhInput" placeholder="请输入监测点" clearable style="width: 10%" />
                <span>灾害类型：</span>
                <el-select v-model="zhlxValue" class="select1-style" placeholder="请选择灾害类型" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>关键字：</span>
                <el-input v-model="gjcInput" placeholder="请输入关键字" clearable style="width: 9%" />
                <span>检测单位：</span>
                <el-select v-model="jcdwValue" placeholder="请输入检测单位" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>项目名称：</span>
                <el-select v-model="xmmcValue" placeholder="请选择项目名称" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
                <MapView ref="olMap" v-if="active"></MapView>
                <div class="map-tool" v-if="active">
                    <map-tool></map-tool>
                </div>
                <div class="zhData" v-else>
                    <el-config-provider :locale="locale">
                        <el-table v-loading="loading" :data="tableData" style="width: 100%" :row-style="{ height: '20px' }"
                            stripe :cell-style="cellStyle" @cell-click="showCellData">
                            <el-table-column prop="number" label="序号" min-width="10%" />
                            <el-table-column prop="jcdbh" label="监测点编号" min-width="20%" />
                            <el-table-column prop="jcdmc" label="监测点名称" min-width="30%" />
                            <el-table-column prop="position" label="地理位置" min-width="35%" />
                            <el-table-column prop="zhlx" label="灾害类型" min-width="10%" />
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

        span {
            font-size: 12px;
            width: 8.5%;
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
    ::v-deep .el-input__inner {
        width: 130px;
    }
}

.select1-style {
    ::v-deep .el-input__inner {
        width: 100px;
    }
}

::v-deep .el-input__inner {
    height: 28px;
    line-height: 28px;
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