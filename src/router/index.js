/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 11:33:10
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-10-13 16:11:25
 * @FilePath: \vue3-vite\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
