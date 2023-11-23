import { defineStore } from "pinia" //由于我们在main.js中已经挂载pinia，所以我们这里直接使用

export const useUserStore = defineStore('user', {
    state: () => ({
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBRE1JTiIsIlVzZXJJZCI6IjEiLCJzY29wZSI6WyJhbGwiXSwiVXNlclJlYWxOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiVXNlclh6cWhkbSI6IjQyMDUiLCJleHAiOjI1MTk3NzIwMTAsImp0aSI6ImExNTcxYzk1LTBkNjMtNDkyYi1iOWEyLTE2ZTIzNTQ5ZTY1ZiIsImNsaWVudF9pZCI6InVzZXItc2VydmljZSJ9.ebNVZrw9LbhKaj2w6RR8b2wccQiDkhvBeq79SxxCK-yWiOlIFqBkotTN4TNJg8umcpyYvLILwvqXWRJhffEtgi25sX2y6MqLIWM4kMZ9d8ptdnSmTpBPhltSiQOM0KFa1kl5nSDCBwYOLn-pESJglam76cjpgZNoC88x3iNHacdiXDItY0rtY85HrQ26uyJu9UovKtmYmZRHsIbGMpDta5Q1p4vfaCIr-YUayDrCweZJiQDEEcOSpWJ7O7RMk3pRkX_4UmPHFzrOI2lMp1jQIhxnSTE7EVAz_4z8h8r46muSkpF54Ic4XSawHKqdSLHx8T05LB0MpvOzWMPS6c1uHA", //token
        userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}, //登录用户基本信息
    }),
});