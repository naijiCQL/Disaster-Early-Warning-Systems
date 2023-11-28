/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 11:33:10
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-11-28 19:22:59
 * @FilePath: \DW-Systems\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'

const routes = [
    {
        path: '/',
        name: '首页',
        component: Home,
        redirect: '/sy',
        children: [
            {
                path: '/sy',
                name: '一张图',
                component: () => import("@/components/yzt/YztView.vue"),
            },
            {
                path: '/jcyj',
                name: '监测预警',
                component: () => import("@/components/jcyj/JcyjView.vue"),
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
