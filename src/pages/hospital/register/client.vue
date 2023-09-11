<template>
    <div class="client">
        <div class="top">
            <div class="left">
                <span class="free">{{ user?.isInsure == 1 ? '医保' : '自费' }}</span>
                <span class="username">{{ user?.contactsName }}</span>
            </div>
            <div class="right">
                <el-button type="primary" :icon="Edit" circle />
            </div>
        </div>
        <div class="bottom">
            <p>证件类型：{{ user?.param.certificatesTypeString }}</p>
            <p>证件号码：{{ user?.certificatesNo }}</p>
            <p>用户性别：{{ user?.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期：{{ user?.birthdate }}</p>
            <p>手机号码：{{ user?.phone }}</p>
            <p>婚姻状况：{{ user?.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址：{{ user?.param.cityString }}</p>
            <p>详细地址：{{ user?.param.fullAddress.slice(12) }}</p>
            <Transition name="confirm">
                <div class="confirm" v-if="index == currentIndex">已选择</div>
            </Transition>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { Edit } from '@element-plus/icons-vue';
// 接受父组件传递过来的就诊人信息
defineProps(['user', 'index', 'currentIndex']);

</script>
    
<style lang='scss' scoped>
.client {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    .top {
        height: 60px;
        background: #f1f3f5;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .left {
            .free {
                background: white;
                font-size: 12px;
                padding: 3px 5px;
                margin-right: 5px;
                border: .5px solid #e9ecef;
                border-radius: 5px;
            }
        }

        .right {
            margin-left: 20px;
        }
    }

    .bottom {
        position: relative;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
            margin-left: 22px;
            line-height: 200%;
        }

        .confirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            left: 14%;
            top: 14%;
            opacity: 0.3;
            transform: rotate(30deg);
        }

        .confirm-enter-from {
            transform: scale(1);
        }

        .confirm-enter-active {
            transition: all .3s;
        }

        .confirm-enter-to {
            transform: scale(1.2);
        }
    }
}
</style>
    