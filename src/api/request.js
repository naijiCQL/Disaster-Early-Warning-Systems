/*
 * @Author: 陈巧龙
 * @Date: 2023-09-21 15:56:09
 * @LastEditors: 陈巧龙
 * @LastEditTime: 2023-09-21 17:12:29
 * @FilePath: \vue3-vite\src\api\request.js
 * @Description: 
 */
import axios from 'axios'
import { useUserStore } from "@/store/user"
import { storeToRefs } from "pinia"
import { ElMessage } from 'element-plus'

// let userStore = useUserStore();
// const { token } = storeToRefs(userStore);

//创建axios实例
const ajax = axios.create({
    baseURL: "/",
    timeout: 20000,
});
let status401Bool = true; //监听是否出现401状态（默认true）

//请求拦截器
ajax.interceptors.request.use(config => {
    //需要将这个代码编写在request内部
    //原因：request 他是一个特殊的js文件，它会在程序开始的时候立刻执行（因为调用了接口）。但是这时pinia还没有初始化完成，所以才会报错
    let userStore = useUserStore();
    //采用pinia的storeToRefs方法来处理响应式数据
    const { token } = storeToRefs(userStore);

    if (token.value) {
        config.headers['Authorization'] = `Bearer ${token.value}`;
    }
    return config;
});

//响应 拦截器
ajax.interceptors.response.use(response => {
    const { data } = response;
    //判断数据是不是区划数据或者本地的geojson数据
    //区划数据直接抛出，不做后续判断
    //multipart/form-data表单类型文件数据直接抛出不做后续判断
    if (data.length > 0) {
        return data
    } else if (data.type == 'FeatureCollection' || data.type == 'GeometryCollection') {
        return data
    } else if (data.type == 'multipart/form-data') {
        return data
    } else if (data.code == 200) {
        return data
    }

    const msg = data.message ?? "";
    //根据提示信息判断是否需要重新登录
    if (msg.indexOf('凭据') > -1) {
        showErrMsg('登录凭据已过期，正在跳转登录页面，请稍后...');
        logout(); //退出登录
        return
    }

    //如果请求出错，data.success应该为false
    if (!data.success) {
        //抛出错误信息，同时将数据返回给接口
        showErrMsg(msg)
        return data;
    }

    //如果以上情况都未出现，则视为请求成功
    status401Bool = true;
    return data;
},
    error => {
        console.log("错误信息", error)
        if (error.response.status == 401) { //如果状态码为401
            if (status401Bool) {
                status401Bool = false;
                showErrMsg('登录凭据过期或权限不足，正在跳转登录页面，请稍后...');
                logout(); //退出登录
            }
        }
    });

//退出登录
function logout() {
    console.log('logout');
}

//打印错误提示
function showErrMsg(errorMsg) {
    ElMessage({
        showClose: true,
        message: errorMsg,
        type: 'error'
    });
}

export default ajax;