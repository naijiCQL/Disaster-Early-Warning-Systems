/*
 * @Author: 陈巧龙
 * @Date: 2023-11-23 20:57:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-14 11:08:03
 * @FilePath: \DW-Systems\src\store\user.js
 * @Description: 
 */
import { defineStore } from "pinia" //由于我们在main.js中已经挂载pinia，所以我们这里直接使用

export const useUserStore = defineStore('user', {
    state: () => ({
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBRE1JTiIsIlVzZXJJZCI6IjEiLCJzY29wZSI6WyJhbGwiXSwiVXNlclJlYWxOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiVXNlclh6cWhkbSI6IjQyMDUiLCJleHAiOjI1NjY1MTYyMzksImp0aSI6IjlkNzdiM2NlLTIyZDMtNDhhZS1iMjZiLTI5ODUzMTkwMDY0MiIsImNsaWVudF9pZCI6InVzZXItc2VydmljZSJ9.b-IiOlZIQGUvxhbzzOXNkKCcG9dZ9gUfhenY1vJ0ZG1ZfDBLTUrP-lbT-GLLlvAxU0GeUqJjZb0yOU2nLVdwEuxaPz8AVzymzoLXNd9_jrOIPchJkoAzL2NiqinCSdsWooHJxxyfaZDnyHa0fml-48UxvlT917dt95cHTutDjfL7HpXwoLf8YqiEQHvsHdo6Ww6fii13yPSEVkFOGR7BUL-Ol5IxHY1Im0J1sjn6_tsQrMMcwSqukY9C_K_jFMv_loZb1y1wB13TKwhBaO-97S-Od4YgQzs52hXuA_X8XhQJ11HLPDytKB31k2A-KhUmJ_MSp1TPs_DlLbpaDh3NSA", //token
    }),
});