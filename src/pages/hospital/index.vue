<template>
    <div class="hospital">
        <!-- 左侧导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span class="info">/ 医院信息</span>
            </div>
            <el-menu :default-active="`/hospital/register` + `?hosCode=${$route.query.hosCode}`"
                class="el-menu-vertical-demo" router="true">
                <el-menu-item :index="`/hospital/register` + `?hosCode=${$route.query.hosCode}`">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/detail` + `?hosCode=${$route.query.hosCode}`">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/notice` + `?hosCode=${$route.query.hosCode}`">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约须知</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/close` + `?hosCode=${$route.query.hosCode}`">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item :index="`/hospital/search` + `?hosCode=${$route.query.hosCode}`">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区域：路由组件展示位置 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
// 左侧菜单所需图标
import {
    Calendar,
    Document,
    InfoFilled,
    Search,
    Bell,
    HomeFilled
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
// 引入生命周期函数onMounted
import { onMounted } from 'vue';
// 引入仓库
import useDetailStore from '@/store/modules/hospitalDetail';
// 获取仓库对象
let detailStore = useDetailStore();

// 获取路由
let $route = useRoute();

// 组件挂载完毕通知pinia仓库发请求获取医院相关数据，存储与仓库当中
onMounted(() => {
    // 获取医院详情的数组
    detailStore.getHostail($route.query.hosCode as string);
    // 获取某一个医院科室的数据
    detailStore.getDeparment($route.query.hosCode as string);
});
</script>

<style scoped>
.hospital {
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
        flex: 8
    }
}
</style>