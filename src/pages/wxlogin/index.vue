<template></template>
    
<script setup lang='ts'>
// 获取用户信息
// 重定向通过query参数获取
import { SET_TOKEN } from '@/utils/user';
import { useRoute } from 'vue-router';
// 获取路由对象
let $route = useRoute();

// 持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query));
// 此路由代码执行成功代表执行成功
let html: any = document.querySelector('html');
html.style.display = 'none';
</script>
    
<style lang='scss' scoped></style>
    