/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 14:09:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-20 16:27:34
 * @FilePath: \DW-Systems\src\store\mystore.js
 * @Description: 
 */
import { defineStore } from "pinia";
// defineStore 第一个参数为 此状态的 id ,后面的就是此状态下面的配置了
export const useStore = defineStore("myStore", {
    // 状态参数 我们可以像之前写vue2一样使用return方式来进行返回一个不被污染的对象
    state: () => {
        return {
            cityCode: '4205',//保存宜昌市的行政编码
            xzCode: {},//保存宜昌市里各区县的行政编码
            zhlx: '',//保存所选择的灾害类型
        };
    },
    actions: {
        getXzCode(param) {
            this.xzCode = param
        },
        getZhlx(param) {
            this.zhlx = param
        }
    },
    getters: {

    },
});
