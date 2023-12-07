<!--
 * @Author: 陈巧龙
 * @Date: 2023-09-20 10:58:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-07 10:59:53
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
  <!-- 主页面菜单导航栏页面的布局样式 -->
  <div class="head">
    <!-- 左侧logo与系统名字布局 -->
    <div class="logo">
      <img style="margin-left: 10px;" src="@/assets/images/home/header/logo.png" />
      <span>宜昌市地质灾害专业监测预警系统</span>
    </div>
    <!-- 菜单样式 -->
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
    <!-- 右侧管理设置 -->
    <div class="glsz">
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
        <el-icon :size="13" color="white">
          <switch-button />
        </el-icon>
        <span>退出</span>
      </div>
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
      margin-left: 10px;
      font-family: '宋体';
      font-weight: bold;
    }
  }

  //修改menu样式
  .menu {
    width: 50%;
    height: 100%;

    .el-menu {
      height: 70px;
    }

    //修改下划线颜色
    ::v-deep .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom-color: #ffce01;
      background: #16375a !important;
    }

    //去掉el-menu的下边框线
    ::v-deep .el-menu--horizontal {
      border-bottom: none;
    }

    //修改el-menu的默认的padding
    ::v-deep .el-menu-item {
      padding: 0 15px;
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

  .glsz {
    width: 16%;
    display: flex;
    align-items: center;

    .cjgly {
      display: flex;
      align-items: center;
      width: 65%;

      img {
        height: 35px;
        margin: 5%
      }

      span {
        color: #cccccc;
        font-size: 14px;
        display: flex;
      }

      span:hover {
        color: white;
      }

    }

    .exit {
      text-align: center;
      color: #cccccc;
      border-left: 1px solid #7190ad;
      cursor: pointer;
      width: 35%;
      height: 40%;
      font-size: 14px;
      margin-left: 5px;

      &:hover {
        color: white;
      }

      span {
        margin: 5px;
      }
    }
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
