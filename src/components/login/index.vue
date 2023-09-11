<template>
    <div class="login_container">
        <!-- 登录组件 -->
        <!-- title是对话框左上角的标题 v-model是控制对话框的显示与隐藏 -->
        <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog" @close="close">
            <div class="content">
                <el-row :gutter="0">
                    <!-- 左侧结构，手机号码登录右侧扫一扫 -->
                    <el-col :span="12" v-if="scene == 0">
                        <div class="login">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || !flag ? true : false" @click="getCode">
                                        <span v-if="flag">获取验证码</span>
                                        <span v-else>获取验证码({{ time }}s)</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>

                            <div class="bottom">
                                <el-button style="width: 100%;" type="primary" size="default"
                                    :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                    @click="login">用户登录</el-button>
                                <p @click="changeScene">微信扫码登录</p>
                                <svg @click="changeScene" t="1691306439265" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2364" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2365"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2366"></path>
                                </svg>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" v-if="scene == 1">
                        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                            <div id="Tdc"></div>
                            <div class="phone">
                                <p @click="changeSceneToZero">手机短信验证码登录</p>
                                <svg @click="changeSceneToZero" t="1691746377185" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4097" width="16" height="16">
                                    <path
                                        d="M708.928 0H315.072C247.168 0 192 52.16 192 116.352v791.296C192 971.84 247.168 1024 315.072 1024h393.856C776.832 1024 832 971.84 832 907.648V116.352C832 52.16 776.832 0 708.928 0zM512 977.472c-40.832 0-73.856-31.232-73.856-69.824 0-38.656 33.024-69.824 73.856-69.824 40.832 0 73.856 31.168 73.856 69.76 0 38.656-33.024 69.888-73.856 69.888z m221.568-186.24H290.432V139.712h443.136v651.648z"
                                        fill="#3CB1FF" p-id="4098"></path>
                                </svg>
                            </div>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <div class="leftContent">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/images/code_login_wechat.png" alt="">
                                    <svg t="1691306816642" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2612" width="16" height="16">
                                        <path
                                            d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                            fill="#5D5D5D" p-id="2613"></path>
                                    </svg>
                                    <p>微信扫一扫关注</p>
                                    <p>“快速预约挂号”</p>
                                </div>
                                <div class="item">
                                    <img src="../../assets/images/code_app.png" alt="">
                                    <svg t="1691307290967" class="icon" viewBox="0 0 1138 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5462" width="16" height="16">
                                        <path
                                            d="M914.432 518.144q27.648 21.504 38.912 51.712t9.216 62.976-14.336 65.536-31.744 59.392q-34.816 48.128-78.848 81.92t-91.136 56.32-94.72 35.328-89.6 18.944-75.264 7.68-51.712 1.536-49.152-2.56-68.096-10.24-78.336-21.504-79.872-36.352-74.24-55.296-59.904-78.848q-16.384-29.696-22.016-63.488t-5.632-86.016q0-22.528 7.68-51.2t27.136-63.488 53.248-75.776 86.016-90.112q51.2-48.128 105.984-85.504t117.248-57.856q28.672-10.24 63.488-11.264t57.344 11.264q10.24 11.264 19.456 23.04t12.288 29.184q3.072 14.336 0.512 27.648t-5.632 26.624-5.12 25.6 2.048 22.528q17.408 2.048 33.792-1.536t31.744-9.216 31.232-11.776 33.28-9.216q27.648-5.12 54.784-4.608t49.152 7.68 36.352 22.016 17.408 38.4q2.048 14.336-2.048 26.624t-8.704 23.04-7.168 22.016 1.536 23.552q3.072 7.168 14.848 13.312t27.136 12.288 32.256 13.312 29.184 16.384zM656.384 836.608q26.624-16.384 53.76-45.056t44.032-64 18.944-75.776-20.48-81.408q-19.456-33.792-47.616-57.344t-62.976-37.376-74.24-19.968-80.384-6.144q-78.848 0-139.776 16.384t-105.472 43.008-72.192 60.416-38.912 68.608q-11.264 33.792-6.656 67.072t20.992 62.976 42.496 53.248 57.856 37.888q58.368 25.6 119.296 32.256t116.224 0.512 100.864-21.504 74.24-33.792zM522.24 513.024q20.48 8.192 38.912 18.432t32.768 27.648q10.24 12.288 17.92 30.72t10.752 39.424 1.536 42.496-9.728 38.912q-8.192 18.432-19.968 37.376t-28.672 35.328-40.448 29.184-57.344 18.944q-61.44 11.264-117.76-11.264t-88.064-74.752q-12.288-39.936-13.312-70.656t16.384-66.56q13.312-27.648 40.448-51.712t62.464-38.912 75.264-17.408 78.848 12.8zM359.424 764.928q37.888 3.072 57.856-18.432t21.504-48.128-15.36-47.616-52.736-16.896q-27.648 3.072-43.008 23.552t-17.408 43.52 9.728 42.496 39.424 21.504zM778.24 6.144q74.752 0 139.776 19.968t113.664 57.856 76.288 92.16 27.648 122.88q0 33.792-16.384 50.688t-35.328 17.408-35.328-14.336-16.384-45.568q0-40.96-22.528-77.824t-59.392-64.512-84.48-43.52-96.768-15.872q-31.744 0-47.104-15.36t-14.336-34.304 18.944-34.304 51.712-15.36zM778.24 169.984q95.232 0 144.384 48.64t49.152 146.944q0 30.72-10.24 43.52t-22.528 11.264-22.528-14.848-10.24-35.84q0-60.416-34.816-96.256t-93.184-35.84q-19.456 0-28.672-10.752t-9.216-23.04 9.728-23.04 28.16-10.752z"
                                            p-id="5463"></path>
                                    </svg>
                                    <p>扫一扫下载</p>
                                    <p>“快速挂号”APP</p>
                                </div>
                            </div>
                            <p class="tip">尚医通官方指定平台</p>
                            <p class="tip">快速挂号 安全放心</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <el-button type="primary" size="default" @click="closeWindow">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
// 获取user仓库的数据（visiable）可以控制login组件的对话框显示与隐藏
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { reqWxLogin } from '@/api/hospital';
import { WxLoginResponseData } from '@/api/hospital/type';
// 引入微信扫码登录的请求
// import { reqWxLogin } from '@/api/hospital';

let scene = ref<number>(0); // 0代表手机号码登录 1代表微信扫码登录
let flag = ref<boolean>(true); // 真 开启倒计时
let time = ref<number>(5); // 倒计时的数值
let form = ref<any>();

// 手机表单数据 手机号码
let loginParam = reactive({
    phone: '', // 收集手机号码
    code: '', // 收集对应的验证码
})

// 计算出当前表单元素手机的内容是否是手机号码格式
let isPhone = computed(() => {
    // 手机号码正则表达式
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    return reg.test(loginParam.phone);
})

let userStore = useUserStore();
const closeWindow = () => {
    userStore.visiable = false;
    // 清空表单数据
    Object.assign(loginParam, { phone: '', code: '' });
    // 移除表单校验结果
    form.value.resetFields();
};
// const changeScene = async () => {
//     scene.value = 1;
//     // 生成二维码的页面
//     // 向服务器发送请求，获取微信扫码登录页面的参数
//     // 携带参数告诉服务器授权成功后重定向到项目某一个页面
//     // let redirect_URI = encodeURIComponent(window.location.origin + '/wxlogin');
//     // reqWxLogin(redirect_URI);

//     setTimeout(() => {
//         console.log(document.getElementById('Tdc'));
//     }, 500);
//     await console.log(document.getElementById('Tdc'));
//     //@ts-ignore
//     await new WxLogin({
//         self_redirect: true,// true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
//         id: "Tdc", // 显示二维码容器设置
//         appid: "", // 应用位置标识appid
//         scope: "snsapi_login", // 当前微信扫码登录页面已经授权了
//         redirect_uri: "", // 后台提供给我们的 作用是前端有一个网页
//         state: "",
//         style: "black",
//         href: "",
//     });
// };


const changeScene = async () => {
    scene.value = 1;
    // 生成二维码的页面
    // 向服务器发送请求，获取微信扫码登录页面的参数
    // 携带参数告诉服务器授权成功后重定向到项目某一个页面
    let redirect_URI = encodeURIComponent(window.location.origin + '/wxlogin');
    let result: WxLoginResponseData = await reqWxLogin(redirect_URI);
    // setTimeout(() => {
    //@ts-ignore
    new WxLogin({
        self_redirect: true,// true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
        id: "Tdc", // 显示二维码容器设置
        appid: result.data.appid, // 应用位置标识appid
        scope: "snsapi_login", // 当前微信扫码登录页面已经授权了
        redirect_uri: result.data.redirectUri, // 后台提供给我们的 作用是前端有一个网页
        state: result.data.state,
        style: "black",
        href: "",
    });
    // });
};



// 获取验证码按钮的回调
const getCode = async () => {
    flag.value = false;

    // 通知pinia仓库存储验证码
    try {
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (e) {
        console.log(e);
    }
};

// 点击用户登录按钮的回调
const login = async () => {
    await form.value.validate();

    try {
        // 用户登陆成功
        await userStore.userLogin(loginParam);
        userStore.visiable = false;
    } catch (e) {
        ElMessage({
            type: 'error',
            message: (e as Error).message,
        });
    }
};

// 监听flag.value值
watch(
    () => flag.value,
    () => {
        let timer = setInterval(() => {
            time.value--;
            if (time.value < 0) {
                clearInterval(timer);
                time.value = 5;
                flag.value = true;
            }
        }, 1000);
    }
);


// 自定义手机号码的校验规则
// @ts-ignore
const validatorPhone = (rule: any, value: any, callback: any) => {
    // rule:即为表单校验规则的对象
    // value:即为当前文本的内容
    // callback:回调函数
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的手机号码形式'));
    }
}
// @ts-ignore
const validatorCode = (rule: any, value: any, callback: any) => {
    // rule:即为表单校验规则的对象
    // value:即为当前文本的内容
    // callback:回调函数
    if (/^\d{6}$/.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的验证码形式'));
    }
}
// 表单校验的规则对象
const rules = {
    // 手机号码的校验规则
    // required:代表当前字段务必进行校验
    // message:代表的校验错误信息
    // trigger:代表表单校验触发的时机
    // change:文本发生变化的时候进行校验
    // min代表最小位数
    // max代表最大位数
    // phone: [
    //     { required: true, message: '手机号码务必11位', trigger: 'change', min: 11 }
    // ],
    // code: [
    //     { required: true, message: '验证码务必6位', trigger: 'blur', min: 6, max: 6 }
    // ]

    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}
// dialog关闭事件的回调
const close = () => {
    // 清空表单数据
    Object.assign(loginParam, { phone: '', code: '' });
    // 移除表单校验结果
    form.value.resetFields();
};
// 将页面变为手机验证码登录页面
const changeSceneToZero = () => {
    scene.value = 0;
};
// 监听场景的数据
watch(
    () => scene.value,
    (val: number) => {
        if (val === 1) {
            userStore.queryState();
        }
    }
);
</script>

<style lang='scss' scoped>
#Tdc {
    display: flex;
    justify-content: center;
}

.login_container {
    :deep(.el-dialog) {
        width: 38%;
    }

    :deep(.el-dialog__body) {
        border-top: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
    }

    .login {
        border: 1px solid #ccc;
        padding: 20px;

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                margin: 15px;
            }
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                img {
                    width: 130px;
                    height: 130px;
                    margin: 5px 0px;
                }

                p {
                    margin: 5px 0px;
                }

                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .tip {
            font-size: 20px;
            margin: 20px 0px;
            text-align: center;
        }
    }

    .content {
        .phone {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                margin-bottom: 20px;
            }
        }
    }
}
</style>