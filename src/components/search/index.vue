<template>
    <div class="search">
        <!-- 首页搜索医院的表单区域 -->
        <el-autocomplete @select="goDetail" clearable placeholder="请你输入医院的名称" class="form" v-model="hosname"
            :fetch-suggestions="fetchData" :trigger-on-focus="false" />
        <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
// 引入element-plus的图标
import { Search } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';
import { ref } from "vue";
// 引入请求方法
import { reqHospitalInfo } from "@/api/home";
import type { HospitalInfo } from "../../api/home/type";
// 创建路由器对象
let $router = useRouter();
// 收集搜索的关键字（医院的名字）
let hosname = ref<string>('');
// 深度选择器：>>> 原生   /deep/ lass   ::v-deep sass
// 顶部组件的回调
const fetchData = async (keyword: string, cb: any) => {
    // 当用户输入完关键字函数会执行一次，发请求获取需要展示的数据即可
    let result: HospitalInfo = await reqHospitalInfo(keyword);
    let showData = result.data.map((item) => {
        return {
            ...item,
            value: item.hosname,
        }
    });
    cb(showData);
};
// 点击某个推荐项触发的函数
const goDetail = (item: any) => {
    // 点击推荐项目进入医院详情页，将来需要携带query参数（医院编码）
    $router.push({ path: '/hospital/register', query: { hosCode: item.hoscode } });
}
</script>

<style scoped lang="scss">
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;

    :deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 10px;
    }
}
</style>