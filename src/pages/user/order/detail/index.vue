<template>
    <!-- 展示订单详情的结构 -->
    <el-card class="box-card">
        <!-- 卡片头部 -->
        <template #header>
            <div class="detail">挂号详情</div>
        </template>
        <!-- 展示身体的顶部 -->
        <div class="top">
            <!-- 左侧标签 -->
            <el-tag class="ml-2" type="primary">
                <div class="tag">
                    <svg t="1693041053960" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1748" width="16" height="16">
                        <path
                            d="M603.648 497.664c16.896 0 31.232 13.824 31.232 31.232 0 16.896-13.824 31.232-31.232 31.232H493.568v132.096c-0.512 16.896-14.848 30.72-32.256 30.208-16.384-0.512-29.184-13.824-30.208-30.208v-132.096H321.536c-16.896 0-31.232-13.824-31.232-31.232 0-16.896 13.824-31.232 31.232-31.232h109.568V442.368H321.536c-16.896-0.512-30.72-14.848-30.208-32.256 0.512-16.384 13.824-29.184 30.208-30.208h95.232L335.872 299.008c-12.288-11.776-13.312-31.232-1.024-43.52 11.776-12.288 31.232-13.312 43.52-1.024l1.024 1.024 83.968 83.968L547.84 253.952c11.776-11.776 31.744-11.776 43.52 0s11.776 31.744 0 43.52l-81.92 82.432h94.208c16.896-0.512 31.744 12.288 32.256 30.208 0.512 16.896-12.288 31.744-30.208 32.256H493.568v55.296h110.08z"
                            fill="#1296db" p-id="1749"></path>
                        <path
                            d="M512 930.304c-231.936 0-420.352-188.416-420.352-420.352S280.064 89.088 512 89.088s420.352 188.416 420.352 420.352c0 17.92-14.336 32.256-32.256 32.256s-32.256-14.336-32.256-32.256c0-196.608-159.744-356.352-356.352-356.352S155.136 312.832 155.136 509.44s159.744 356.352 356.352 356.352c17.92 0 32.256 14.336 32.256 32.256s-13.824 32.256-31.744 32.256z"
                            fill="#1296db" p-id="1750"></path>
                        <path
                            d="M747.52 599.04c80.896 0 146.944 66.048 146.944 146.944s-66.048 146.944-146.944 146.944-146.944-66.048-146.944-146.944S666.624 599.04 747.52 599.04m0-51.2c-109.568 0-198.144 88.576-198.144 198.144s88.576 198.144 198.144 198.144 198.144-88.576 198.144-198.144c0.512-109.568-88.576-198.144-198.144-198.144z"
                            fill="#1296db" p-id="1751"></path>
                        <path
                            d="M687.616 852.992c-6.656 0-12.8-2.56-17.92-7.68-10.24-10.24-10.24-26.112 0-36.352l62.976-62.976v-105.472c0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6v115.712c0 7.168-2.56 13.824-7.68 18.432L705.536 844.8c-4.608 5.12-10.752 8.192-17.92 8.192z"
                            fill="#1296db" p-id="1752"></path>
                    </svg>
                    <span>{{ orderInfo?.orderStatusString }}</span>
                </div>
            </el-tag>
            <!-- 右侧标签 -->
            <div class="right_info">
                <img src="../../../../assets/images/code_app.png" alt="">
                <div>
                    <p>
                        关注微信号
                        “wxid_t6kt1dpwxrm122”
                    </p>
                    <p>快速预约挂号
                        <svg t="1693041459415" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2867" width="16" height="16">
                            <path
                                d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                fill="#3dca40" p-id="2868"></path>
                        </svg>
                    </p>
                </div>
            </div>
        </div>
        <!-- 展示身体的底部 -->
        <div class="bottom">
            <div class="left">
                <el-descriptions class="margin-top" :column="1" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊人信息</div>
                        </template>
                        {{ orderInfo?.patientName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊日期</div>
                        </template>
                        {{ orderInfo?.reserveDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊医院</div>
                        </template>
                        {{ orderInfo?.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊科室</div>
                        </template>
                        {{ orderInfo?.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生职称</div>
                        </template>
                        {{ orderInfo?.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊服务费</div>
                        </template>
                        <span style="color: red;">{{ orderInfo?.amount }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">挂号单号</div>
                        </template>
                        {{ orderInfo?.outTradeNo }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">挂号时间</div>
                        </template>
                        {{ orderInfo?.createTime }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-popconfirm title="确定取消预约？" @confirm="cancel"
                    v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
                    <template #reference>
                        <el-button class="btn btnC">
                            取消预约
                        </el-button>
                    </template>
                </el-popconfirm>
                <el-button @click="openDialog" v-if="orderInfo.orderStatus == 0" class="btn btnP"
                    type="primary">支付</el-button>
            </div>
            <div class="right">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                    </template>
                    <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                    <p style="color: red;">2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前在医院取号，未取号视为爽约该号不退不换；</p>
                    <p style="color: red;">3.【退号】在{{ orderInfo.quitTime }}前可在线退号，逾期将不可办理退号退费；</p>
                    <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>
                    <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号；</p>
                </el-card>
            </div>
        </div>
    </el-card>
    <!-- 展示支付二维码的结构 -->
    <!-- 对话框时通过 v-model 来控制显示与隐藏的 true：展示 false：隐藏 -->
    <el-dialog v-model="dialogTableVisible" title="微信支付" width="400" center @close="close">
        <!-- 支付需要使用的二维码图片 -->
        <div class="qrcode">
            <img :src="imgURL" alt="">
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
        </div>
        <!-- 支付的结构 -->
        <template #footer>
            <el-button size="default" @click="closeDialog">关闭窗口</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqOrderInfo, reqCancelOrder, reqQrcode, reqQueryPayState } from '@/api/user';
import { useRoute } from 'vue-router';
import { ElMessage, ElPopconfirm } from 'element-plus';
// @ts-ignore
import QRCode from "qrcode";

let $route = useRoute();

let orderInfo = ref<any>({});
let dialogTableVisible = ref<boolean>(false);
let imgURL = ref<string>('');
let timer = ref<any>();

// 组件挂载完毕
onMounted(() => {
    getOrderInfo();
});
// 获取订单详情的数据
const getOrderInfo = async () => {
    let result: any = await reqOrderInfo($route.query.orderId as string);
    console.log(orderInfo.value);
    if (result.code == 200) {
        orderInfo.value = {
            ...result.data,
            ...result.data.param
        }
    };
    console.log(orderInfo.value);
};
// 取消订单   订单的状态三种 orderstatus -1取消预约 0预约没有支付 1预约并支付成功
const cancel = async () => {
    try {
        // 取消预约成功
        let result = await reqCancelOrder($route.query.orderId as string);
        console.log(result);
        // 再次获取订单详情的数据
        getOrderInfo();
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '取消预约失败'
        })
    }
};
// 点击支付按钮的回调
const openDialog = async () => {
    dialogTableVisible.value = true;
    // 获取支付需要使用二维码信息
    let result = await reqQrcode($route.query.orderId as string);
    // 根据服务器返回的二维码信息生成二维码图片
    let imgUrl = await QRCode.toDataURL(result.data.codeUrl);
    imgURL.value = imgUrl;
    timer.value = setInterval(async () => {
        let queryResult = await reqQueryPayState($route.query.orderId as string);
        if (queryResult.data) {
            dialogTableVisible.value = false;
            ElMessage({
                type: 'success',
                message: '支付成功！'
            })
            clearInterval(timer.value);
            getOrderInfo();
        }
    }, 2000);

};
const closeDialog = () => {
    dialogTableVisible.value = false;
    clearInterval(timer.value);
};
const close = () => {
    clearInterval(timer.value);
};
</script>

<style lang="scss" scoped>
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: bold;
    }

    .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding-top: 10px;
        padding-bottom: 20px;

        .tag {
            display: flex;
            align-items: center;

            span {
                margin-left: 3px;
            }
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            p {
                font-size: 12px;
                line-height: 20px;
                display: flex;
                margin-left: 5px;
                align-items: center;

                .icon {
                    margin-left: 5px;
                }
            }
        }
    }

    .bottom {
        display: flex;

        .left {
            margin-top: 20px;
            flex: 4;

            .btn {
                margin-top: 15px;
                height: 35px;
            }
        }

        .right {
            margin-top: 20px;
            margin-left: 20px;
            flex: 6;

            p {
                line-height: 28px;
            }
        }
    }
}

.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        line-height: 30px;
    }
}
</style>