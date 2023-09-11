<template>
    <div class="info">
        <h1>{{ hospitalStore.hospitalInfo.data?.hospital.hosname }}停诊信息</h1>
        <el-empty description="维护中...."></el-empty>
    </div>
</template>
      
<script setup lang='ts'>
import useDetailStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore();
</script>
      
<style lang='scss' scoped>
    .info{
        h1{
            text-align: center;
            font-size: 30px;
            margin-bottom: 120px;
        }
    }
</style>
      