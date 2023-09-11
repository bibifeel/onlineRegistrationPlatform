<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line">|</div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">·</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item"
                    :class="{ active: !(item.status == -1 || item.availableNumber == -1), cur: item.workDate == workTime.workDate }"
                    v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="item_top">{{ item.workDate }}<br>{{ item.dayOfWeek }}</div>
                    <div class="item_bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '约满了' : `有号（${item.availableNumber}）` }}
                        </div>
                        <div v-if="item.status == 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNo" layout="prev,pager,next" :total="workData.total"
                @current-change="fetchWorkData"></el-pagination>
        </div>
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="will" v-if="workTime.status == 1">
                <span class="time">2023年6月3日08:30</span>
                <span class="willText">放号</span>
            </div>
            <!-- 展示医生结构 -->
            <div class="doctor" v-else>
                <div class="moring">
                    <!-- 顶部文字提示 -->
                    <div class="tip">
                        <svg t="1691919644916" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9418" width="32" height="32">
                            <path
                                d="M843.42 184.17c7.27 7.27 7.24 19.03 0 26.3-7.27 7.27-19.03 7.27-26.3 0-7.24-7.27-7.24-19.03 0-26.27 7.27-7.27 19.03-7.27 26.3-0.03zM843.42 407.19c7.27 7.27 7.24 19.03 0 26.3-7.27 7.27-19.03 7.27-26.3 0-7.24-7.27-7.24-19.03 0-26.3 7.27-7.25 19.03-7.25 26.3 0z"
                                fill="#F5BA45" p-id="9419"></path>
                            <path
                                d="M751.43 211.4c10.26 0 18.59 8.33 18.59 18.59s-8.33 18.59-18.59 18.59-18.59-8.33-18.59-18.59 8.33-18.59 18.59-18.59zM909.11 369.1c10.26 0 18.59 8.33 18.59 18.57 0 10.29-8.33 18.59-18.59 18.59s-18.57-8.3-18.57-18.59c0-10.27 8.3-18.57 18.57-18.57z"
                                fill="#FECD57" p-id="9420"></path>
                            <path
                                d="M705.61 295.68c7.27-7.24 19.03-7.24 26.3 0.03 7.27 7.24 7.24 19 0 26.27-7.27 7.24-19.03 7.27-26.3 0-7.24-7.27-7.24-19.03 0-26.3zM928.62 295.68c7.27-7.24 19.03-7.24 26.3 0 7.24 7.27 7.24 19.03 0 26.3-7.27 7.27-19.03 7.27-26.3 0-7.24-7.27-7.24-19.03 0-26.3z"
                                fill="#F5BA45" p-id="9421"></path>
                            <path
                                d="M732.84 387.67c0-10.26 8.33-18.57 18.59-18.57s18.59 8.3 18.59 18.57c0 10.26-8.33 18.59-18.59 18.59s-18.59-8.33-18.59-18.59zM890.54 229.99c0-10.26 8.3-18.59 18.57-18.59 10.26 0 18.59 8.33 18.59 18.59s-8.33 18.57-18.59 18.57c-10.27 0.02-18.57-8.31-18.57-18.57z"
                                fill="#FECD57" p-id="9422"></path>
                            <path d="M830.27 308.83m-55.75 0a55.75 55.75 0 1 0 111.5 0 55.75 55.75 0 1 0-111.5 0Z"
                                fill="#FECD57" p-id="9423"></path>
                            <path
                                d="M830.27 234.51c-41.05 0-74.35 33.27-74.35 74.32 0 41.05 33.3 74.35 74.35 74.35s74.35-33.3 74.35-74.35c-0.01-41.05-33.3-74.32-74.35-74.32z m0 111.51c-20.5 0-37.16-16.69-37.16-37.19 0-20.5 16.66-37.16 37.16-37.16 20.5 0 37.16 16.66 37.16 37.16 0 20.5-16.66 37.19-37.16 37.19z"
                                fill="#F5BA45" p-id="9424"></path>
                            <path
                                d="M343.57 691.89c-0.03-0.03-0.03-0.03-0.03-0.06l-90.98-204.69c-0.03-0.06-0.08-0.11-0.11-0.16-1.8-4-5.01-7.35-9.34-9.28-9.36-4.16-20.36 0.05-24.53 9.45L69.92 821.66c-4.16 9.36 0.06 20.33 9.42 24.53 2.48 1.09 5.04 1.61 7.54 1.61 7.13 0 13.91-4.14 16.99-11.05l52.92-119.05h157.57l52.89 119.05c3.08 6.91 9.88 11.05 17.02 11.05 2.5 0 5.06-0.52 7.51-1.61 9.39-4.19 13.61-15.16 9.45-24.53l-57.66-129.77z m-170.25-11.38l62.26-140.06 62.26 140.06H173.32zM793.11 476.09c-6.02 0-11.35 2.89-14.76 7.3l-152.5 169.36-153.46-170.5c-0.03-0.06-0.08-0.08-0.14-0.11-3.4-3.7-8.25-6.04-13.66-6.04-10.26 0-18.59 8.33-18.59 18.59V829.2c0 10.26 8.33 18.57 18.59 18.57s18.59-8.3 18.59-18.57V543.11l134.84 149.84c0.43 0.49 0.9 0.95 1.39 1.39l0.03 0.03c0.14 0.11 0.27 0.22 0.43 0.33 0.33 0.3 0.68 0.57 1.03 0.84 0.19 0.14 0.41 0.27 0.63 0.44 0.3 0.19 0.62 0.41 0.93 0.57 0.22 0.14 0.46 0.25 0.68 0.38 0.33 0.16 0.65 0.33 0.98 0.49 0.22 0.11 0.43 0.19 0.65 0.27 0.35 0.16 0.71 0.3 1.09 0.41 0.22 0.08 0.41 0.14 0.62 0.22 0.38 0.11 0.79 0.22 1.17 0.3 0.19 0.05 0.38 0.08 0.6 0.14 0.43 0.08 0.87 0.14 1.31 0.19 0.16 0.03 0.33 0.06 0.49 0.08 0.6 0.06 1.2 0.08 1.8 0.08 5.09 0 10.13-2.07 13.8-6.15L774.51 543.2v286c0 10.26 8.33 18.57 18.59 18.57s18.57-8.3 18.57-18.57V494.68c0-10.26-8.3-18.59-18.56-18.59z"
                                fill="#D94452" p-id="9425"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <!-- 每个医生的信息 -->
                    <div class="doc_info" v-for="doctor in moringArr" :key="doctor.id">
                        <div class="doc_left">
                            <!-- 姓名技能 -->
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <div class="doc_right">
                            <!-- 挂号剩余和金额 -->
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button class="btn" type="primary" size="default" @click="goStep2(doctor)">剩余{{
                                doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="moring">
                    <div class="tip">
                        <svg t="1691919628755" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="8017" width="32" height="32">
                            <path
                                d="M763.54 477.28c-0.79-3.49-2.62-6.79-5.48-9.35-7.34-6.63-18.66-6.03-25.26 1.31L585.9 632.36 438.19 468.24a0.256 0.256 0 0 0-0.13-0.1c-3.27-3.56-7.94-5.82-13.15-5.82-9.88 0-17.9 8.02-17.9 17.9v322c0 9.88 8.02 17.87 17.9 17.87 9.88 0 17.87-7.99 17.87-17.87V526.83L572.6 671.06c3.54 3.93 8.41 5.92 13.29 5.92h0.03c0.58 0 1.15-0.03 1.73-0.08 0.16-0.03 0.32-0.05 0.47-0.08 0.42-0.05 0.84-0.1 1.26-0.18 0.18-0.05 0.37-0.08 0.58-0.13 0.37-0.1 0.73-0.18 1.1-0.29 0.21-0.08 0.42-0.13 0.63-0.21 0.34-0.1 0.68-0.24 1.02-0.39 0.21-0.08 0.42-0.16 0.63-0.26 0.34-0.16 0.65-0.32 0.97-0.47 0.21-0.13 0.42-0.24 0.63-0.37 0.31-0.16 0.6-0.37 0.89-0.58l0.63-0.39c0.34-0.26 0.66-0.53 1-0.81 0.13-0.1 0.26-0.21 0.39-0.31l0.03-0.03c0.47-0.42 0.92-0.86 1.34-1.34L729 526.91v275.3c0 9.88 8.02 17.87 17.9 17.87 9.88 0 17.87-7.99 17.87-17.87v-322c0-1.09-0.45-2.06-1.23-2.93zM246.01 462.32H102.9c-9.88 0-17.9 8.02-17.9 17.9v322c0 9.88 8.02 17.87 17.9 17.87 9.88 0 17.87-7.99 17.87-17.87v-89.46H246c69.15 0 125.23-56.05 125.23-125.2 0.01-69.16-56.07-125.24-125.22-125.24z m0 214.66H120.78v-178.9h125.23c49.32 0 89.43 40.12 89.43 89.46 0 49.33-40.12 89.44-89.43 89.44z"
                                fill="#967ADA" p-id="8018"></path>
                            <path
                                d="M836.81 408.65c-49.58 0-89.91-40.33-89.91-89.93 0-37.47 23.35-70.38 56.92-83.67 4.32 62.37 54.29 112.36 116.66 116.66-13.26 33.57-46.18 56.94-83.67 56.94z"
                                fill="#FECD57" p-id="8019"></path>
                            <path
                                d="M929.23 334.13c-59.53 0-107.8-48.27-107.8-107.8 0-4.9 0.32-9.72 0.94-14.44-52.7 7.05-93.37 52.2-93.37 106.83 0 59.56 48.27 107.83 107.8 107.83 54.66 0 99.81-40.67 106.86-93.39-4.71 0.63-9.53 0.97-14.43 0.97z m-92.42 56.63c-39.7 0-72.04-32.31-72.04-72.04 0-21.88 9.93-41.8 25.73-55.13 6.42 24.08 19.1 46.17 37.18 64.25 18.11 18.11 40.17 30.79 64.25 37.21-13.3 15.77-33.24 25.71-55.12 25.71z"
                                fill="#F5BA45" p-id="8020"></path>
                        </svg>
                        <span>下午号源</span>
                    </div>
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <div class="doc_left">
                            <!-- 姓名技能 -->
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <div class="doc_right">
                            <!-- 挂号剩余和金额 -->
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button class="btn" type="primary" size="default" @click="goStep2(doctor)">剩余{{
                                doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital';
import { useRoute, useRouter } from 'vue-router';
import { HospitalWorkData } from '@/api/hospital/type';

// 获取路由器对象
let $route = useRoute();
let $router = useRouter();
// 分页器当前页码
let pageNo = ref<number>(1);
// 每一页展示几条数据
let limit = ref<number>(6);
// 存储医院科室挂号的数据
let workData = ref<any>({});
// 存储排班日期
let workTime = ref<any>({});
// 存储排班医生的数据
let docArr = ref<any>([]);
// 组件挂载完毕发一次请求
onMounted(() => {
    fetchWorkData();
});
let moringArr = computed(() => {
    return docArr.value.filter((doc: any) => {
        return doc.workTime == 0;
    });
});
let afterArr = computed(() => {
    return docArr.value.filter((doc: any) => {
        return doc.workTime == 1;
    });
});
// 获取挂号的数据
const fetchWorkData = async () => {
    let result: HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    if (result.code === 200) {
        workData.value = result.data;
        // 存储第一天的数据
        workTime.value = workData.value.bookingScheduleList[0];
        // 获取一次医生的数据
        getDoctorWorkData();
    };
};
// 获取医生某一天医生排班的数据
const getDoctorWorkData = async () => {
    // 医院的编号
    let hoscode: string = $route.query.hoscode as string;
    // 科室的编号
    let depcode: string = $route.query.depcode as string;
    // 时间
    let workDate: string = workTime.value.workDate;
    let result: any = await reqHospitalDoctor(hoscode, depcode, workDate);
    if (result.code == 200) {
        docArr.value = result.data;
    };
};
// 点击顶部某一天的时候触发
const changeTime = (item: any) => {
    // 存储用户选择时间
    workTime.value = item;
    getDoctorWorkData();
};
// 路由跳转进入到选择就诊人的页面
const goStep2 = (doctor: any) => {
    $router.push({ path: '/hospital/register_step2', query: { docId: doctor.id } });
};
</script>
    
<style lang='scss' scoped>
.top {
    display: flex;
    color: #7f7f7f;

    .line {
        margin: 0px 5px;
        color: #4dabf7;
    }

    .dot {
        margin: 0px 5px;
    }
}

.center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
        font-weight: bold;
    }

    .container {
        display: flex;
        width: 100%;

        .item {
            flex: 1;
            border: 2px solid #cdcdcd;
            margin: 30px 6px;
            border-radius: 30px 15px 30px 15px;
            overflow: hidden;
            transition: all .3s;
            cursor: pointer;

            .item_top {
                background-color: #cdcdcd;
                color: #858585;
                font-weight: bold;
                text-align: center;
                padding: 10px 0px;

            }

            .item_bottom {
                padding: 22px 0px;
                text-align: center;
                color: #858585;
            }

            &.cur {
                transform: scale(1.1);
            }
        }

        .active {
            flex: 1;
            border: 2px solid #4dabf7;
            margin: 30px 6px;

            .item_top {
                background-color: #a5d8ff;
                color: #1864ab;
                font-weight: bold;
                text-align: center;
                padding: 10px 0px;
            }

            .item_bottom {
                padding: 22px 0px;
                text-align: center;
                color: #1864ab;
            }
        }
    }
}

.bottom {
    .will {
        text-align: center;
        font-size: 30px;
        font-weight: bold;

        .time {
            color: red;
        }

        .willText {
            color: #4dabf7;
        }
    }

    .doctor {
        .moring {
            .tip {
                display: flex;
                align-items: center;

                span {
                    color: #7f7f7f;
                    font-size: 20px;
                    font-weight: bold;
                    margin-left: 10px;
                }
            }

            .doc_info {
                display: flex;
                justify-content: space-between;
                margin: 20px 0px;
                border-bottom: 1px solid #d1d1d1;

                .doc_left {
                    .info {
                        color: #339af0;
                        margin: 10px 0px;

                        span {
                            margin: 0px 5px;
                            font-size: 18px;
                            font-weight: bold;
                        }
                    }

                    .skill {
                        margin: 10px 0px;
                        color: #7f7f7f;
                    }
                }

                .doc_right {
                    display: flex;
                    width: 180px;
                    justify-content: space-between;
                    align-items: center;

                    .money {
                        color: #fa5252;
                        font-weight: bold;
                    }

                    .btn {
                        width: 80px;
                    }
                }
            }
        }
    }
}
</style>
    