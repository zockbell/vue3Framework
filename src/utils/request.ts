import axios from 'axios';

console.log(process.env.NODE_ENV, '环境')
let dev_pro = process.env.NODE_ENV;

let baseURL = '';

if (dev_pro == 'production') {
  baseURL = '/'; // 生产环境配置
} else {
  baseURL = '/api/'; // 开发环境配置
}

//1. 创建axios对象
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000, // request timeout
  // withCredentials: true,// 异步请求携带cookie
  // headers: {
  // 设置后端需要的传参类型
  // 'Content-Type': 'application/json',
  // 'token': x-auth-token',//一开始就要token
  // 'X-Requested-With': 'XMLHttpRequest',
  // },
});

//2. 请求拦截器
service.interceptors.request.use(config => {
  /*
  // 去localStor获取token
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    // 添加请求头
    config.headers["Authorization"]="Bearer "+ token
  }
  */
  return config;
}, error => {
  Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use(response => {
  //判断code码
  return response;
}, error => {
  return Promise.reject(error);
});

export default service;