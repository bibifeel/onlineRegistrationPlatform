// 定义用户相关的仓库
import { defineStore } from "pinia";
// 引入获取验证码的请求方法
import { reqCode, reqUserLogin } from '@/api/hospital/index.ts';
import type { LoginData, UserLoginResponseData } from "@/api/hospital/type";
import type { UserState } from './interface/index.ts';
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/user.ts';
const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            visiable: false, // 用于控制登录组件的dialog显示与隐藏
            code: '', // 存储用户的验证码
            userInfo: JSON.parse(GET_TOKEN() as string) || {},
        }
    },
    actions: {
        // 获取验证码的方法
        async getCode(phone: string) {
            let result: any = await reqCode(phone);
            if (result.code == 200) {
                this.code = result.data;
                return 'ok';
            }
        },
        // 用户手机号码登录
        async userLogin(loginData: LoginData) {
            let result: UserLoginResponseData = await reqUserLogin(loginData);
            if (result.code == 200) {
                this.userInfo = result.data;
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 用户退出的方法
        logout() {
            this.userInfo = { name: '', token: '' };
            REMOVE_TOKEN();
        },
        // 查询微信扫码的结果，看本地存储是否存储数据
        queryState() {
            let timer = setInterval(() => {
                // 本地存储已有数据：扫码成功
                if (GET_TOKEN()) {
                    this.visiable = false;
                    this.userInfo = JSON.parse(GET_TOKEN() as string);
                    clearInterval(timer);
                }
            })
        },
    },
    getters: {

    }
});

export default useUserStore;