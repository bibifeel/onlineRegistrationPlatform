<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <el-card class="box-card">
            <!-- 卡片头部 -->
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button :icon="User" type="primary" size="default">添加就诊人</el-button>
                </div>
            </template>
            <!-- 展示就诊人信息 -->
            <div class="user">
                <client @click="changeIndex(index)" v-for="(user, index) in userArr" :key="user.id" class="item"
                    :user="user" :index="index" :currentIndex="currentIndex" />
            </div>
        </el-card>
        <!-- 卡片展示医生的信息 -->
        <el-card>
            <!-- 卡片的头部 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 卡片的身体部分 -->
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期：
                        </div>
                    </template>
                    {{ docInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院：
                        </div>
                    </template>
                    {{ docInfo.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室：
                        </div>
                    </template>
                    {{ docInfo.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名：
                        </div>
                    </template>
                    {{ docInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称：
                        </div>
                    </template>
                    {{ docInfo.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长：
                        </div>
                    </template>
                    {{ docInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生服务费：
                        </div>
                    </template>
                    <span style="color: red;">{{ docInfo.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确定挂号按钮 -->
        <div class="button">
            <el-button class="ConfirmButton" type="primary" :disabled="currentIndex == -1 ? true : false"
                @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { User } from '@element-plus/icons-vue';
import { reqDoctorInfo, reqGetUser } from '@/api/hospital/index.ts';
// 就诊人组件
// @ts-ignore
import client from './client.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { reqSubmitOrder } from '@/api/user/index.ts';
import type { SubmitOrder } from '@/api/user/type.ts';
import { ElMessage } from 'element-plus';

// 存储就诊人信息
let userArr = ref<any>([]);
// 存储医生的信息
let docInfo = ref<any>([]);
// 存储用户确定就诊人的索引值 
let currentIndex = ref<number>(-1);

let $route = useRoute();
let $router = useRouter();

// 组件挂载完毕后获取响应数据
onMounted(() => {
    // 获取医生信息
    fetchInfo();
    // 获取就诊人信息
    fetchUserData();
});
// 获取医生信息
const fetchInfo = async () => {
    let result: any = await reqDoctorInfo($route.query.docId as string);
    if (result.code == 200) {
        docInfo.value = {
            ...result.data.param,
            ...result.data,
        };
    };
};
// 获取就诊人信息
const fetchUserData = async () => {
    // 获取就诊人信息：当前老师的账号下曾经已有四个就诊人信息
    let result: any = await reqGetUser();
    if (result.code === 200) {
        userArr.value = result.data;
    };
};
// 点击就诊人子组件的回调
const changeIndex = (index: number) => {
    currentIndex.value = index;
};
// 确定挂号按钮的回调
const submitOrder = async () => {
    // 医院编号
    let hoscode = docInfo.value.hoscode;
    // 医生的Id
    let scheduleId = docInfo.value.id;
    // 就诊人的Id
    let patientId = userArr.value[currentIndex.value].id;
    // console.log(hoscode, scheduleId, patientId) 获取成功
    // 提交订单
    // @ts-ignore
    let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId);
    // 提交订单成功
    if (result.code == 200) {
        $router.push({ path: '/user/order', query: { orderId: result.data } });
    } else {
        ElMessage({
            type: 'error',
            message: result.message,
        });
    };
};
</script>
    
<style lang='scss' scoped>
.container {
    .tip {
        font-weight: bold;
        color: #7f7f7f;
        font-size: 26px;
    }

    .box-card {
        margin: 20px 0px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 30%;
                margin: 20px 1.66%;
            }
        }
    }

    .button {
        display: flex;
        justify-content: center;
        margin: 20px 0px;

        .ConfirmButton {
            width: 600px;
            height: 40px;
            font-size: 18px;
        }
    }
}
</style>
    