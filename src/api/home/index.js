/*
 * @Author: 陈巧龙
 * @Date: 2023-09-21 15:59:07
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-10-19 14:59:50
 * @FilePath: \vue3-vite\src\api\home\index.js
 * @Description: 
 */
import request from "../request"

const apiPath = 'api';

//请求后台默认的遇见期数据
export function getYjq(param) {
    return request.post(`${apiPath}/skkr/getYjq`, param)
}

//测试get请求
export function test() {
    return request.get(`${apiPath}/json_data`)
}
