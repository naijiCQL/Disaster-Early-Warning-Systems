/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 14:09:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-27 11:16:05
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
            //颜色与灾害等级对应
            gradeColor: [
                {
                    "code": "C4",
                    "color": "rgb(248, 68, 95)",
                    "value": "红",
                    "backgroundColor": "rgba(248, 68, 95,0.1)",
                },
                {
                    "code": "C3",
                    "color": "rgb(251,141,51)",
                    "value": "橙",
                    "type": "warning",
                    "backgroundColor": "rgba(251,141,51,0.1)",
                },
                {
                    "code": "C2",
                    "color": "rgb(245, 209, 69)",
                    "value": "黄",
                    "backgroundColor": "rgba(245, 209, 69,0.1)",
                },
                {
                    "code": "C1",
                    "color": "rgb(43, 164, 232)",
                    "value": "蓝",
                    "backgroundColor": "rgba(43, 164, 232,0.1)",
                }
            ]
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
