<!--
 * @Author: 陈巧龙
 * @Date: 2023-09-20 10:58:23
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-11-29 20:47:18
 * @FilePath: \DW-Systems\src\components\header\HeaderView.vue
 * @Description: 
-->
<script setup>
import { ref, onMounted } from 'vue'

const activeIndex = ref('/sy')

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
    <div class="menu">
      <el-menu :default-active="activeIndex" router class="el-menu" mode="horizontal" @select="handleSelect"
        background-color="#00264B" text-color="#fff" active-text-color="#fff" :ellipsis="false">
        <el-menu-item index="/sy">一张图</el-menu-item>
        <el-menu-item index="/jcyj">检测预警</el-menu-item>
        <el-menu-item index="/dcpj">调查评价</el-menu-item>
        <el-menu-item index="/zhzl">综合治理</el-menu-item>
        <el-menu-item index="/wlw">物联网</el-menu-item>
        <el-menu-item index="/zbzs">值班值守</el-menu-item>
        <el-menu-item index="/xtgl">系统管理</el-menu-item>
        <el-menu-item index="/fxfz">风险防控</el-menu-item>
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
  height: 70px;
  background-color: #00264B;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;
    width: 35%;

    span {
      color: white;
      font-size: 20px;
      margin-left: 15px;
      font-family: '宋体';
      font-weight: bold;
    }
  }

  //修改menu样式
  .menu {
    width: 30%;
    height: 100%;

    .el-menu {
      height: 70px;
    }

    //修改下划线颜色
    ::v-deep .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom-color: #ffce01;
      background: #16375a !important;
    }

    ::v-deep .el-menu--horizontal {
      border-bottom: none;
    }

    //修改导航栏选中的背景颜色
    ::v-deep .el-menu-item.is-active {
      background-color: #16375A !important;
      color: #fff;

      span {
        color: #fff !important;
      }
    }
  }

  .cjgly {
    display: flex;
    align-items: center;
    margin-left: 20%;
    width: 10%;

    img {
      height: 35px;
    }

    span {
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

::v-deep .example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}


//去除鼠标放置时出现外边框的现象
::v-deep .el-tooltip__trigger:focus-visible {
  outline: unset;
}
</style>
