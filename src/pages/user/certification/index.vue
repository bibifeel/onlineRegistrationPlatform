<template>
    <!-- 实名认证组件 -->
    <el-card class="box-card">
        <!-- 卡片的头部 -->
        <template #header>
            实名信息
        </template>
        <!-- 实名认证结构的提示部分 -->
        <div class="tip" style="color: #7f7f7f;">
            <el-icon>
                <InfoFilled />
            </el-icon>
            <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前进行实名认证。</p>
        </div>
        <!-- 卡片身体的底部 -->
        <el-descriptions v-if="false" class="margin-top" :column="1" border style="margin: 20px auto;">
            <el-descriptions-item label-align="center" width="30px">
                <template #label>
                    <div class="cell-item">
                        用户姓名
                    </div>
                </template>
                罗小黑
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="30px">
                <template #label>
                    <div class="cell-item">
                        证件类型
                    </div>
                </template>
                身份证
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="30px">
                <template #label>
                    <div class="cell-item">
                        证件号码
                    </div>
                </template>
                620103200008271435
            </el-descriptions-item>
        </el-descriptions>

        <!-- 用户未验证时的结构 -->
        <el-form style="width: 40%; margin: 20px auto;">
            <el-form-item label="用户姓名">
                <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select placeholder="请选择证件类型" style="width: 100%;">
                    <el-option label="身份证"></el-option>
                    <el-option label="户口本"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload list-type="picture-card">
                    <img style="width: 100%;height: 100%;" src="../../../assets/images/auth_example.png" alt="">
                </el-upload>
                <el-dialog>
                    <img w-full alt="Preview Image">
                </el-dialog>
            </el-form-item>
            <el-form-item style="margin-left: 18%;">
                <el-button type="primary">提交</el-button>
                <el-button>重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { InfoFilled, Plus } from '@element-plus/icons-vue';


</script>

<style lang="scss" scoped>
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 40px;

        p {
            margin-left: 10px;
        }
    }
}
</style>