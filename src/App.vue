<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped  lang="scss">
// .content {
//   width: 1200px;
//   height: 700px;
//   background-color: red;
// }
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 1191px;
  }
}
</style>