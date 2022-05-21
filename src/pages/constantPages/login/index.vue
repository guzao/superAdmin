<template>
  <div class="_login">
    <div class="hedare"></div>

    <div class="content">
      <el-form
        ref="ruleFormRef"
        :model="userForm"
        status-icon
        :rules="rules"
        size="large"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="userForm.name"
            :prefix-icon="UserFilled"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="userForm.password"
            :prefix-icon="Key"
            type="password"
            autocomplete="off"
          >
            <!-- <template #suffix>
              <el-icon class="el-input__icon"><View /></el-icon>
            </template> -->
          </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <div class="d-f">
            <el-input
              v-model="userForm.captcha"
              :prefix-icon="CreditCard"
              autocomplete="off"
            />
            <img :src="img" style="width: 40%" alt="" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleLogin" color="#626aef" style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { UserFilled, Key, View, CreditCard } from "@element-plus/icons-vue";
import { useLogin } from "./index";

const { getCode, handleLogin, userForm, rules, ruleFormRef, img } = useLogin();
onMounted(() => {
  getCode();
});
</script>

<style lang="scss" scoped>
._login {
  height: 100vh;
  background-image: url(https://smartops.shanghai-electric.com/assets/img/login_bg.e008ae04.png);
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;

  .content {
    width: 360px;
    top: 50%;
    left: 50%;
    height: 60vh;
    position: absolute;
    transform: translate(-50%, -30%);
  }
}
</style>
