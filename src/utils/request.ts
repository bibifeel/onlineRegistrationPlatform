// 对于axios函数库进行二次封装
// 你工作的时候是否axios进行二次封装？ 二次封装的目的是什么？
// 目的：1.利用axios自带的请求、响应拦截器功能
// 目的：2.请求拦截器，一般可以再请求头中携带公共的参数：token
// 目的：3.相应拦截器，可以简化服务器返回的数据，处理http网络错误
import axios from 'axios';
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';


// 利用axios.create方法创建一个axios实例：可以设置基础路径、超时时间的设置
const request = axios.create({
    baseURL: '/api', // 请求的基础路径的设置
    timeout: 5000 // 超时时间的设置，超出5秒就是失败
});


// 请求拦截器
request.interceptors.request.use((config) => {
    let userStore = useUserStore();
    // 公共参数token：如果用户登陆了需要携带token发送请求 否则服务器无法识别用户是否成功登录
    if (userStore.userInfo.token) {
        config.headers.token = userStore.userInfo.token;
    };
    // config：请求拦截器回调注入的对象（配置对象），配置对象的身上最重要的一件事情headers属性
    // 可以通过请求头携带公共参数-token
    return config;
});


// 响应拦截器
request.interceptors.response.use((response) => {
    // 响应拦截器成功的回调，一般会进行数据简化
    return response.data;
}, (error) => {
    // 处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            // 错误提示信息
            ElMessage({
                type: 'error',
                message: error.message + ' 请求失败路径出现问题'
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type: 'error',
                message: error.message + ' 服务器出现问题'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: error.message + ' 参数有误'
            })
            break;
    }
    return Promise.reject(new Error(error.message));
});


// 务必对外暴露axios
export default request;