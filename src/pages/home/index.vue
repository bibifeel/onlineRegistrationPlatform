<template>
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 首页搜索医院的表单区域 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
        <el-col :span="20">
            <!-- 等级地区子组件 -->
            <Level @getLevel="getLevel" @getRegion="getRegion" />
            <!-- 展示医院的结构 -->
            <div class="hospital" v-if="hasHospitalArr.length > 0">
                <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :small="false" :disabled="false" :background="true" layout="prev, pager, next, ->, total" :total="total"
                    @current-change="currentChange" @size-change="sizeChange"></el-pagination>
            </div>
            <el-empty v-else description="没有医院"></el-empty>
        </el-col>
        <el-col :span="4">
            <homeTip />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted, ref } from 'vue';
import { reqHospital } from '../../api/home/index.ts';
// 引入首页轮播图组件
import Carousel from '../../components/carousel/index.vue';
import Search from '../../components/search/index.vue';
import Level from '../../components/level/index.vue';
import Card from '../../components/cardBox/index.vue';
import homeTip from '../../components/homeTip/index.vue';
import { Content, HospitalResponseData } from '@/api/home/type';

// 分页器页码
let pageNo = ref<number>(1);
// 分页器一页展示多少数据
let pageSize = ref<number>(10);
// 存储已有的医院的数据
let hasHospitalArr = ref<Content>([]);
// 存储医院总个数
let total = ref(0);
// 存储医院的等级响应数据
let hostype = ref<string>('');
// 存储医院的地区响应数据
let districtCode = ref<string>('');

// 组件挂载完毕：发一次请求
onMounted(() => {
    getHospitalInfo();
});


// 获取已有的医院的数据
const getHospitalInfo = async () => {
    let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value);
    if (result.code === 200) {
        // 存储已有的医院的数据
        hasHospitalArr.value = result.data.content;
        // 存储医院的总个数
        total.value = result.data.totalElements;
    };
};


// 分页器页码发生变化时候的回调
const currentChange = () => {
    getHospitalInfo();
};
const sizeChange = () => {
    getHospitalInfo();
};

// 子组件的自定义事件：获取儿子给父组件传递的数据
const getLevel = (level: string) => {
    // 收集参数：等级参数
    hostype.value = level;
    // 再次发送请求
    getHospitalInfo();
};
const getRegion = (land: string) => {
    // 收集参数：等级参数
    districtCode.value = land;
    // 再次发送请求
    getHospitalInfo();
};
</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 20px;

    .item {
        width: 48%;
        margin: 10px 0px;
    }

    .el-pagination {
        width: 100%
    }
}
</style>