/*
 * @Author: 陈巧龙
 * @Date: 2023-11-23 20:57:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-13 11:22:18
 * @FilePath: \DW-Systems\src\store\user.js
 * @Description: 
 */
import { defineStore } from "pinia" //由于我们在main.js中已经挂载pinia，所以我们这里直接使用

export const useUserStore = defineStore('user', {
    state: () => ({
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBRE1JTiIsIlVzZXJJZCI6IjEiLCJzY29wZSI6WyJhbGwiXSwiVXNlclJlYWxOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiVXNlclh6cWhkbSI6IjQyMDUiLCJleHAiOjI1NjY0MzYzMDEsImp0aSI6ImIzMTcxMDQ4LWNlNzktNGE3ZS1iNzkzLTkwNzVlYjMyNWFkOCIsImNsaWVudF9pZCI6InVzZXItc2VydmljZSJ9.TOGqJ5xKHtyPI2FEFXT7yMJI8cZrBftY0jc2UAlfHYWIs3B7IusJH3Br-helPRDCl1ziToXRhRD74zf0SnjNF1cLdFqwUbK3KDRhvewEzzSJnzQx6zZPb9KUmM2bsF3pFqIi3lW_3J9L-QcB3MR2q2e-X8W1mvzuZQp8mStGiwiTIl4el2N0afwP5OkK874cbQdwMJLigPmgUA3olGaFeYRRvXN1EBRUD6-Qpzuml0HeUxrlUN3VLSau0sfBfdfNuNwO88VbK6hOFYz7ayUgG9EWct81m5qfv2nFpWA84w1g8DisPs4gskEwOPzOcganA8iHKFGiBiScx5aQ9L23tA", //token
    }),
});