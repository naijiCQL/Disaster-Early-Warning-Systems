<!--
 * @Author: 陈巧龙
 * @Date: 2023-11-29 20:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-15 16:50:09
 * @FilePath: \DW-Systems\src\components\dcpj\DcpjView.vue
 * @Description: 调查评价页面
-->
<script setup>
import { ref, onMounted } from 'vue';

//初始化窗口不进行显示
const dialogVisible = ref(false)

const value = ref()

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
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

onMounted(() => {

})

</script>

<template>
    <div class="main-page">
        <el-button type="primary" @click="dialogVisible = true">
            Click to open the Dialog
        </el-button>
        <el-dialog v-model="dialogVisible" title="监测点信息列表" width="86%" top="4%" :close-on-click-modal='false'>
            <div class="container-top">
                <span>行政区划：</span>
                <el-tree-select v-model="value" :data="data" :render-after-expand="false" size="middle"
                    placeholder="请选择行政区划" class="treeSelect-style" />
                <span>监测点名称：</span>
                <el-input v-model="input" placeholder="请输入监测点" clearable style="width: 10%" />
                <span>监测点编号：</span>
                <el-input v-model="input" placeholder="请输入监测点" clearable style="width: 10%" />
                <span>灾害类型：</span>
                <el-select v-model="value" class="select1-style" placeholder="请选择灾害类型" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>关键字：</span>
                <el-input v-model="input" placeholder="请输入关键字" clearable style="width: 9%" />
                <span>检测单位：</span>
                <el-select v-model="value" placeholder="请输入检测单位" :popper-append-to-body="false">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span>项目名称：</span>
                <el-select v-model="value" placeholder="请选择项目名称" :popper-append-to-body="false">
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
                <div>333</div>
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
        padding: 15px 10px;

        ::v-deep .el-button {
            height: 28px;
            font-size: 12px;
            padding: 10px;
        }

        ::v-deep .el-icon {
            margin-right: 5px;
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