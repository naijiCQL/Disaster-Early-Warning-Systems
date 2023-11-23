/*
 * @Author: 陈巧龙
 * @Date: 2023-09-20 14:09:07
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-09-21 17:30:51
 * @FilePath: \vue3-vite\src\store\mystore.js
 * @Description: 
 */
import { defineStore } from "pinia";
// defineStore 第一个参数为 此状态的 id ,后面的就是此状态下面的配置了
export const useCounterStore = defineStore("counter", {
    // 状态参数 我们可以像之前写 vue2 一样使用 return 方式来进行返回一个不被污染的对象
    state: () => {
        return {
            num: 1,
            yjq: null,
        };
    },
    actions: {
        add(num) {
            this.num += num;
        },
        addYjq(num) {
            this.yjq = num
        }
    },
    getters: {
        numGetters() {
            return this.num + 10;
        },
        getYjq() {
            return this.yjq
        }
    },
});
