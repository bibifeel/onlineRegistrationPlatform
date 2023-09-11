<template>
    <div class="detail">
        <!-- 医院名字与医院等级的结构 -->
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.data?.hospital.hosname }}</div>
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
        <!-- 医院的logo与路线 -->
        <div class="logo">
            <div class="left">
                <img :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.data?.hospital.logoData}`" alt="">
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1691216492789" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2310" width="16" height="16">
                        <path
                            d="M960 480h-65.6C879.2 293.6 730.4 144.8 544 129.6V64h-64v65.6C293.6 144.8 144.8 293.6 129.6 480H64v64h65.6c15.2 186.4 164 335.2 350.4 350.4v65.6h64v-65.6c186.4-15.2 335.2-164 350.4-350.4h65.6v-64z m-448 352c-176.8 0-320-143.2-320-320s143.2-320 320-320 320 143.2 320 320-143.2 320-320 320z m128-320c0 70.4-57.6 128-128 128s-128-57.6-128-128 57.6-128 128-128 128 57.6 128 128z"
                            p-id="2311" fill="#259ddc"></path>
                    </svg>
                    <span>具体位置：{{ hospitalStore.hospitalInfo.data?.hospital.param.fullAddress }}</span>
                </div>
                <div class="route">
                    规划路线：{{ hospitalStore.hospitalInfo.data?.hospital.route }}
                </div>
            </div>
        </div>
        <!-- 医院的介绍 -->
        <div class="footer">
            <h1>医院介绍</h1>
            <p>{{ hospitalStore.hospitalInfo.data?.hospital.intro}}</p>
        </div>
    </div>
</template>
      
<script setup lang='ts'>
import useDetailStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore();
</script>
      
<style lang='scss' scoped>
.detail {
    .top {
        display: flex;

        .name {
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

    .logo {
        display: flex;
        margin: 10px 0px;
        margin-top: 50px;

        .left {
            img {
                width: 80px;
                height: 80px;
                border-radius: 15px;
            }
        }

        .right {
            color: #7f7f7f;
            margin-left: 10px;
            display: flex;
            flex-wrap: wrap;
            line-height: 30px;

            .address {
                width: 100%;
                display: flex;
                align-items: center;

                .icon {
                    margin-right: 6px;
                }
            }

            .route {
                margin-left: 22px;
                width: 100%;
            }
        }
    }

    .footer {
        margin-top: 50px;
        color: #7f7f7f;

        p {
            margin-top: 10px;
            line-height: 30px;
        }
    }
}
</style>
      