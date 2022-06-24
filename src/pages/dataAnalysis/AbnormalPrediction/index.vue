<template>
  <div class="app-contant">
    <HeaderCard>
      <HeaderInfo />
    </HeaderCard>
    <BodyCard>
      <el-tabs v-model="activeName" class="battery-tabs">
        <el-tab-pane label="电池异常预测" name="电池异常预测">
          <abnormal />
        </el-tab-pane>
        <el-tab-pane label="电池特性预测" name="电池特性预测">
          <characteristic />
        </el-tab-pane>
      </el-tabs>
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from "./component/HeaderInfo.vue";
import abnormal from "./component/abnormal/index.vue";
import characteristic from "./component/characteristic/index.vue";
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import { ref } from "vue";

const activeName = ref("电池异常预测");
</script>

<style lang="scss" scoped>
.battery-tabs {
  height: 100%;
  :deep .el-tabs__nav {
    padding-left: 20px !important;
  }
  :deep .el-tabs__item {
    font-size: 12px !important;
    font-weight: 600 !important;
  }
  :deep .el-tabs__item:hover {
    color: #d8222c !important;
  }
  :deep .is-active {
    color: #d8222c !important;
  }
  :deep .el-tabs__active-bar {
    background-color: #d8222c !important;
  }
  :deep .el-tabs__header {
    margin: 0 !important;
  }
  :deep .el-tabs__content {
    height: calc(100% - 40px);
  }
  :deep .el-tab-pane {
    height: 100%;
  }
}
</style>
