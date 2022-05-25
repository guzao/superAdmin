<template>
  <div class="_login">



    <div class="content">

      <!-- logo -->
      <div class="logo flex justify-center ">
        <img src="../../../assets/images/logo.png" alt="">
      </div>

      <!-- 表单 -->
      <el-form
        ref="ruleFormRef"
        :model="userForm"
        status-icon
        :rules="rules"
        size="large"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input v-model="userForm.name" autocomplete="off" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="userForm.password" type="password" autocomplete="off">
            <template #suffix>
              <el-icon class="el-input__icon cursor-pointer">
                <View />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="authentication">
          <SliderVerification @status-change="statusChange"  />
        </el-form-item>


        <el-form-item >
          <el-checkbox v-model="remember"  fill="pink" size="large" > 
            <span> 记住密码 </span>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleLogin" color="rgba(216,34,44,1)" style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- 页脚 -->
    <div class="footer">版权所有 &#169 2022 南京零探智能科技有限公司 保留所有权利 · 苏ICP备20008705号-1 · 苏公网安备 12345678901234号</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { View } from "@element-plus/icons-vue";
import SliderVerification from '@/components/common/SliderVerification.vue'
import { useLogin } from "./index";

const {  handleLogin, userForm, rules, ruleFormRef, remember, statusChange } = useLogin();


onMounted(() => {});
</script>

<style lang="scss" scoped>
._login {
  height: 100vh;
  background: linear-gradient(135deg, #e8e8e8, #f2f2f2);
  .content {
    width: 400px;
    top: 50%;
    left: 50%;
    // height: 380px;
    position: absolute;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    padding: 49px 30px 34px 30px;
    box-sizing: border-box;
    .logo {
      height: 26px;
      margin-bottom: 49px;
      img {
        height: 26px;
      }
    }
  }


  .footer {
    position: fixed;
    bottom: 20px;
    text-align: center;
    width: 100%;
    color: rgba(0,0,0,0.50);
    line-height: 17px;
  }
}
</style>
