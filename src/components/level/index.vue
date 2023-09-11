<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content oneRow">
            <div class="left">
                等级：
            </div>
            <ul class="hospital">
                <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">全部</li>
                <li v-for="item in levelArr" :key="item.value" :class="{ active: activeFlag == item.value }"
                    @click="changeLevel(item.value)">{{ item.name }}</li>
            </ul>

        </div>
        <div class="content twoRow">
            <div class="left">
                地区：
            </div>
            <ul class="hospital">
                <li :class="{ active: active2Flag == '' }" @click="changeLand('')">全部</li>
                <li v-for="item in landArr" :key="item.value" :class="{ active: active2Flag == item.value }"
                    @click="changeLand(item.value)">{{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelLandRegion } from '@/api/home';
import type { HospitalLevelLandRegionResponseData, HospitalLevelLandRegionArr } from '@/api/home/type';
import { onMounted, ref } from 'vue';
// 定义一个数据：存储医院等级的数组
let levelArr = ref<HospitalLevelLandRegionArr>([]);
// 控制医院等级高亮响应式数据
let activeFlag = ref<string>('');
// 定义一个数据：存储医院等级的数组
let landArr = ref<HospitalLevelLandRegionArr>([]);
// 控制医院等级高亮响应式数据
let active2Flag = ref<string>('');

onMounted(() => {
    getLevel();
    getLand();
});
// 获取医院等级数据的函数
const getLevel = async () => {
    let result: HospitalLevelLandRegionResponseData = await reqHospitalLevelLandRegion('HosType');
    // 存储医院等级的数据
    if (result.code == 200) {
        levelArr.value = result.data;
    }
}
// 获取医院地区数据的函数
const getLand = async () => {
    let result = await reqHospitalLevelLandRegion('Beijin');
    if (result.code == 200) {
        landArr.value = result.data;
    }
}
// 点击等级的按钮回调
const changeLevel = (value: string) => {
    // 高亮的响应式数据存储value
    activeFlag.value = value;
    // 触发自定义事件：将医院等级参数传回给父组件
    $emit('getLevel', value);
}
const changeLand = (value: string) => {
    active2Flag.value = value;
    $emit('getRegion', value);
}


let $emit = defineEmits(['getLevel', 'getRegion']);
</script>

<style lang="scss" scoped>
.level {
    color: #6b798e;

    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }

    .content {
        display: flex;

        .left {
            margin-right: 15px;
        }

        .hospital {
            display: flex;

            li {
                margin-right: 15px;

                &.active {
                    color: #409eff;
                    font-weight: bold;
                }
            }

            li:hover {
                color: #409eff;
                cursor: pointer;
            }
        }
    }

    .twoRow {
        .left {
            margin-top: 10px;
            width: 56px;
        }

        .hospital {
            flex-wrap: wrap;
            margin-top: 10px;

            li {
                margin-bottom: 10px;
            }
        }
    }
}
</style>