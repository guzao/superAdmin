<template>
  <div class="common-layout">
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
    .el-header {
      padding: 0;
      height: 6.6vh;
    }
  }
}
</style>
