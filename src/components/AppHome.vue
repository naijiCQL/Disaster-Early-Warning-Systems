<!--
 * @Author: 陈巧龙
 * @Date: 2023-09-20 10:58:23
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-11-23 17:53:50
 * @FilePath: \宜昌市监测预警\src\components\AppHome.vue
 * @Description: 
-->
<script setup>
import { ref, onMounted } from 'vue'
import bus from 'vue3-eventbus'

const activeIndex = ref('1')

function handleSelect(key, keyPath) {
  console.log(key, keyPath)
}

onMounted(() => {

})

</script>

<template>
  <div class="head">
    <div class="logo">
      <img style="margin-left: 15px;" src="@/assets/images/home/header/logo.png" />
      <span>宜昌市地质灾害专业监测预警系统</span>
    </div>
    <div style="width: 30%;">
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect"
        background-color="#00264B" text-color="#fff" active-text-color="#fff" :ellipsis="false">
        <el-menu-item index="1">一张图</el-menu-item>
        <el-menu-item index="2">检测预警</el-menu-item>
        <el-menu-item index="3">调查评价</el-menu-item>
        <el-menu-item index="4">综合治理</el-menu-item>
        <el-menu-item index="5">物联网</el-menu-item>
        <el-menu-item index="6">值班值守</el-menu-item>
        <el-menu-item index="7">系统管理</el-menu-item>
        <el-menu-item index="8">风险防控</el-menu-item>
      </el-menu>
    </div>
    <div class="cjgly">
      <img src="@/assets/images/home/header/avatar.png" />
      <el-dropdown>
        <span class="el-dropdown-link">
          超级管理员
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="exit">
      <el-icon :size="15" color="white">
        <switch-button />
      </el-icon>
      <span>退出</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.head {
  width: 100%;
  background-color: #00264B;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;

    span {
      color: white;
      font-size: 20px;
      margin-left: 15px;
      font-family: '宋体';
      font-weight: bold;
    }
  }

  .cjgly {
    display: flex;
    align-items: center;
    padding-left: 20%;
    img{
      height: 30px;
    }
    span{
      color: #fff;
    }
  }

  .exit {
    width: 8%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cccccc;
    border-left: 1px solid #7190ad;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  span {
    margin: 5px;
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-menu {
  height: 70px;
  border-right: none !important;
}

//修改下划线颜色
::v-deep .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #ffce01;
}

//修改导航栏选中的背景颜色
::v-deep .el-menu-item.is-active {
  background-color: #16375A !important;
  color: #fff;

  span {
    color: #fff !important;
  }
}
</style>
