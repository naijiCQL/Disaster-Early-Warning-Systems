import axios from 'axios'
import { useUserStore } from "@/store/user"
import { storeToRefs } from "pinia"
import { ElMessage } from 'element-plus'

// 创建axios实例
const ajax = axios.create({
  baseURL: "/",
  timeout: 50000,
});

// 请求 拦截器
ajax.interceptors.request.use(config => {

  let userStore = useUserStore();

  //采用pinia的storeToRefs方法来处理响应式数据
  const { token } = storeToRefs(userStore);

  if (token.value) {
    config.headers['Authorization'] = `Bearer ${token.value}`;
  }
  return config;
}, error => {
  console.log('请求拦截器', error)
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  const { data } = response;
  if (data.type === "FeatureCollection" || data.type === "Feature") { //筛选是否为地图数据请求
    return response.data;
  } else if (data.code || data.status || data.status === undefined) {
    return response.data;
  } else {
    let errorMsg = data.message;
    if (errorMsg) {
      if (errorMsg.indexOf('凭据') > -1) {
        jumpLoginpage("凭据");
      } else if (errorMsg === '权限不足') {
        jumpLoginpage("权限");
      } else {
        showErrMsg(errorMsg)
      }
    } else {
      //其他
      errorLog(data, response.config)
    }
  }
}, error => {
  if (error.response) {
    if (error.response.data.message) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      if (error.response.data.message.indexOf('凭据') > -1 && error.response.data.status === false) {
        jumpLoginpage("凭据");
      } else if (error.response.data.message === '权限不足' && error.response.data.status === false) {
        jumpLoginpage("权限");
      } else {
        showErrMsg(error.message);
      }
    } else {
      //其他
      console.log(error.response.data);
    }
  } else {
    // 服务器没有响应
    console.log('server', error.message);
  }
});

// 弹出错误提示
function showErrMsg(errorMsg) {
  ElMessage({
    showClose: true,
    message: errorMsg,
    type: 'error'
  });
}

// 打印错误提示
function errorLog(data, config) {
  let errorObj = {
    url: config.url,
    code: data.code,
    msg: data.message,
  };
  config.params && (errorObj.params = config.params);
  config.data && (errorObj.data = JSON.parse(config.data));
  console.log(errorObj);
}

//跳转登录页面
function jumpLoginpage(type) {
  if (type === '凭据') {
    showErrMsg("登录凭据已过期，正在跳转登录页面，请稍后...");
  } else if (type === '权限') {
    showErrMsg("登录权限不足，正在跳转登录页面，请稍后...");
  }
  //清楚store缓存数据
  store.dispatch('user/logoutAct');
  //跳转登录页面
  setTimeout(() => {
    router.push("/login")
  }, 2000)
}

export default ajax;
