/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 10:58:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-15 10:32:08
 * @FilePath: \DW-Systems\src\main.js
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia"
import eventBus from 'vue3-eventbus' //事件总线

const app = createApp(App)
const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
/* 全局挂载 */
app.use(router)
app.use(pinia); 
app.use(ElementPlus)
app.use(eventBus)

app.mount('#app')
