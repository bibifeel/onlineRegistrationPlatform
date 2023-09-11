<template>
    <div class="register">
        <div class="top">
            <div class="title">{{ hospitalStore.hospitalInfo.data?.hospital.hosname }}</div>
            <div class="level">
                <svg t="1691135934713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2316" width="16" height="16">
                    <path
                        d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z"
                        fill="#d81e06" p-id="2317"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.data?.hospital.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 展示内容区域 -->
        <div class="content">
            <div class="left">
                <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.data?.hospital.logoData" alt="">
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    <span>预约周期：{{ hospitalStore.hospitalInfo.data?.bookingRule.cycle }}天</span>
                    <span>放号时间：{{ hospitalStore.hospitalInfo.data?.bookingRule.releaseTime }}</span>
                    <span>停挂时间：{{ hospitalStore.hospitalInfo.data?.bookingRule.stopTime }}</span>
                </div>
                <div class="address">具体位置：{{ hospitalStore.hospitalInfo.data?.hospital.param.fullAddress }}</div>
                <div class="route">
                    具体路线：{{ hospitalStore.hospitalInfo.data?.hospital.route }}
                </div>
                <div class="releaseTime">
                    退号时间：就诊前一工作日{{ hospitalStore.hospitalInfo.data?.bookingRule.quitTime }}前取消
                </div>
                <div class="rule">挂号预约规则</div>
                <div class="ruleInfo" v-for="(item, index) in hospitalStore.hospitalInfo.data?.bookingRule.rule"
                    :key="index">{{ index + 1 }}.{{ item }}</div>
            </div>
        </div>
        <!-- 展示科室区域 -->
        <div class="showDepartment">
            <div class="leftNav">
                <ul>
                    <li :class="{ active: index == currentIndex }"
                        v-for="(item, index) in hospitalStore.departmentInfo.data" :key="item.depcode"
                        @click="changeIndex(index)">{{
                            item.depname }}</li>
                </ul>
            </div>
            <div class="department">
                <div class="showSmallDepartment" v-for="item in hospitalStore.departmentInfo.data" :key="item.depcode">
                    <h1 class="cur">{{ item.depname }}</h1>
                    <!-- 每一个大的科室下的小的科室 -->
                    <ul>
                        <li @click="showLogin(it)" v-for="it in item.children" :key="it.depcode">{{ it.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import useDetailStore from '@/store/modules/hospitalDetail';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 获取路由器
let $route = useRoute();
let $router = useRouter();

let hospitalStore = useDetailStore();
// 控制科室选项高亮的响应式数据
let currentIndex = ref<number>(0);
const changeIndex = (index: number) => {
    currentIndex.value = index;
    // 点击导航获取右侧科室标题
    let allCur = document.querySelectorAll('.cur');
    // 滚动到对应科室的位置
    allCur[currentIndex.value].scrollIntoView({
        behavior: 'smooth',
    });
}

const showLogin = (item: any) => {
    // 点击某个科室按钮就进入到详情页
    // item就是用户选中科室的数据
    // 跳转到预约挂号详情页面
    console.log($route.query);
    $router.push({ path: '/hospital/register_step1', query: { hoscode: $route.query.hosCode, depcode: item.depcode } });
}
</script>
    
<style lang='scss' scoped>
.register {
    .top {
        display: flex;

        .title {
            font-size: 30px;
            font-weight: bold;
        }

        .level {
            color: #7f7f7f;
            margin-left: 20px;
            height: 40px;
            line-height: 40px;
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }
    }

    .content {
        display: flex;
        margin-top: 20px;

        .left {
            width: 80px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 15px;
            }
        }

        .right {
            flex: 1;
            margin-top: 20px;
            margin-left: 20px;

            .time,
            .address,
            .releaseTime,
            .route,
            .ruleInfo {
                margin-top: 10px;
                color: #7f7f7f;
                font-size: 15px;
                line-height: 20px;

                span {
                    margin-right: 20px;
                }
            }

            .rule {
                margin-top: 10px;
                font-size: 16px;
                line-height: 20px;
            }

        }
    }

    .showDepartment {
        width: 100%;
        height: 600px;
        display: flex;
        margin-top: 30px;

        .leftNav {
            width: 90px;
            height: 100%;

            ul {
                width: 100%;
                height: 100%;
                background: #f8f9fa;
                display: flex;
                flex-direction: column;

                li {
                    flex: 1;
                    text-align: center;
                    line-height: 50px;

                    &.active {
                        cursor: pointer;
                        border-left: 3px solid #228be6;
                        background: #e7f5ff;
                        transition: 50ms;
                        color: #1864ab;
                    }

                    &:hover {
                        cursor: pointer;
                        border-left: 3px solid #228be6;
                        background: #e7f5ff;
                        transition: 50ms;
                        color: #1864ab;
                    }
                }
            }
        }

        .department {
            flex: 1;
            height: 100%;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            .showSmallDepartment {
                h1 {
                    background: #f8f9fa;
                    color: #1864ab;
                    font-weight: bold;
                    margin-left: 15px;
                    line-height: 30px;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        color: #76b2eb;
                        width: 30%;
                        margin-left: 3%;
                        line-height: 30px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
    