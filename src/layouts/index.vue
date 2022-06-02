<template>
  <div class="common-layout">
    <div class="light-box">
      <div class="light-one" />
      <div class="light-two" />
      <div class="light-three" />
    </div>
    <el-container>
      <!-- 顶部nav -->
      <el-header>
        <MHeader />
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <MAside />
        <!-- 主路由 -->
        <el-main style="padding: 0 14px 16px 16px">
          <!-- 视图出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MHeader from "./layout/header.vue";
import MAside from "./layout/aside.vue";
</script>

<style lang="scss" scoped>
.padding0 {
  padding: 0 !important;
}

.common-layout {
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #e8e8e8, #f2f2f2);
  .el-container {
    height: 100vh;
    // background: url(../assets/svgs/Left-top.svg) no-repeat;
    // background-size: 40vw 37vh;

    .el-header {
      padding: 0;
      height: 6.6vh;
    }
  }
  .light-box {
    position: relative;
    z-index: 0;
    .light-one {
      width: 400px;
      height: 150px;
      left: 287px;
      top: -117px;
      position: absolute;
      z-index: 2;
      background-image: linear-gradient(
        to left,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
      transform: rotate(-20deg);
    }
    .light-two {
      width: 400px;
      height: 150px;
      left: 137px;
      top: -107px;
      position: absolute;
      z-index: 2;
      background-image: linear-gradient(
        to left,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
      transform: rotate(-20deg);
    }
    .light-three {
      width: 400px;
      height: 257px;
      left: -248px;
      top: 29px;
      position: absolute;
      z-index: 2;
      background-image: linear-gradient(
        to left,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
      transform: rotate(-122deg);
    }
  }
}
</style>
