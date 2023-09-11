<template>
    <div class="user">
        <!-- 左侧展示导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span class="info">/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router="true">
                <el-menu-item :index="`/user/certification`" @click="goUser('/user/certification')">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item :index="`/user/order`" @click="goUser('/user/order')">
                    <el-icon>
                        <Paperclip />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item :index="`/user/patient`" @click="goUser('/user/patient')">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item :index="`/user/profile`" @click="goUser('/user/profile')">
                    <el-icon>
                        <Notebook />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item :index="`/user/feedback`" @click="goUser('/user/feedback')">
                    <el-icon>
                        <ChatDotSquare />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧展示会员中心二级路由组件区域 -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Postcard,
    Paperclip,
    User,
    Notebook,
    ChatDotSquare,
    HomeFilled
} from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';

let $route = useRoute();
let $router = useRouter();

const goUser = (path: string) => {
    $router.push({ path: path });
    console.log($route);
};

</script>

<style lang="scss" scoped>
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            color: #7f7f7f;
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .info {
                margin-left: 5px;
            }
        }

    }

    .content {
        flex: 8;
    }
}
</style>