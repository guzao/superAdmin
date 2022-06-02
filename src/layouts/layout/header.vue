<template>
  <div class="header d-f j-c-s-b a-i-center">
    <!-- 左侧 -->
    <div class="header_left"></div>

    <!-- 右侧操作栏目 -->
    <div class="header_right flex j-c-s-b items-center">
      <!-- 页面全屏 -->
      <el-button type="primary" color="#fff" @click="toggleFullscreen" :icon="FullScreen">
        <span class="action_button_text">{{ screenText }}</span>
      </el-button>

      <SizeBoxVue :block="false" width="16px" />

      <!-- 右侧操作部分 -->
      <el-dropdown class="cursor-pointer" trigger="click">
        <el-button :icon="UserFilled" class="action_button_text" color="#fff">
          {{ user.userInfo.full_name }}
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userLoginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CaretBottom, UserFilled, FullScreen } from "@element-plus/icons-vue";
import { useUserData } from "@/stores";
import SizeBoxVue from "@/components/common/Size-box.vue";
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen(document.body);
const user = useUserData();
const userLoginOut = () => user.loginOut();
const toggleFullscreen = async () => {
  await toggle();
};
const screenText = computed(() =>
  isFullscreen.value ? "退出全屏" : "全屏模式"
);
</script>

<style lang="scss" scoped>
.header {
  height: 6.6vh;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  .header_left {
    position: relative;
    z-index: 2;
    width: 176px;
    height: 20px;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: cover;
  }

  .header_right {
    .action_button_text {
      color: rgba(51, 51, 51, 1);
      font-weight: 550;
    }
  }
}
</style>
