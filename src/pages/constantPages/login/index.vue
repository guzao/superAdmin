<template>
  <div class="_login">
    <div class="light light-one" />
    <div class="light light-two" />
    <div class="light light-three" />
    <div class="light light-four" />
    <div class="light light-five" />
    <div class="left_bgc"></div>

    <div class="content">
      <!-- logo -->
      <div class="logo flex justify-center">
        <img src="../../../assets/images/logo.png" alt />
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
          <SliderVerification @status-change="statusChange" />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="remember" fill="pink" size="large" class="red-checkbox">
            <span>记住密码</span>
          </el-checkbox>
        </el-form-item>

        <el-button
          @click="handleLogin"
          color="rgba(216,34,44,1)"
          class="login-button"
          style="width: 100%"
        >
          <div class="light light-button" />登录
        </el-button>
      </el-form>
    </div>

    <!-- 页脚 -->
    <div
      class="footer"
    >版权所有 &#169; 2022 南京零探智能科技有限公司 保留所有权利 · 苏ICP备20008705号-1 · 苏公网安备 12345678901234号</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { View } from "@element-plus/icons-vue";
import SliderVerification from "@/components/common/SliderVerification.vue";
import { useLogin } from "./index";

const {
  handleLogin,
  userForm,
  rules,
  ruleFormRef,
  remember,
  statusChange
} = useLogin();

onMounted(() => {});
</script>

<style lang="scss" scoped>
._login {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f2f2f2;
  background-size: cover;

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

    .red-checkbox {
      :deep .is-checked {
        .el-checkbox__inner {
          border-color: rgba(216, 34, 44, 1);
          background-color: rgba(216, 34, 44, 1);
        }
      }
      :deep .el-checkbox__inner {
        border-radius: 10px;
      }
      :deep .el-checkbox__label {
        font-weight: 500;
        color: black !important;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 20px;
    text-align: center;
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
    line-height: 17px;
  }

  .light {
    position: absolute;
    z-index: 0;
    background-image: linear-gradient(
      to left,
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0)
    );
  }
  .light-one {
    width: 800px;
    height: 400px;
    right: 50px;
    top: -250px;
    transform: rotate(-20deg);
  }
  .light-two {
    width: 800px;
    height: 400px;
    right: 500px;
    top: -250px;
    transform: rotate(-20deg);
  }
  .light-three {
    width: 800px;
    height: 400px;
    left: -60px;
    bottom: -28px;
    transform: rotate(55deg);
  }
  .light-four {
    width: 800px;
    height: 400px;
    left: -404px;
    top: 144px;
    transform: rotate(-125deg);
  }
  .light-five {
    width: 1000px;
    height: 400px;
    left: -377px;
    top: 458px;
    transform: rotate(-125deg);
  }
  .login-button {
    position: relative;
    overflow: hidden;
    .light-button {
      width: 200px;
      height: 100px;
      left: 0px;
      top: -79px;
      transform: rotate(-46deg);
    }
  }
}
</style>
