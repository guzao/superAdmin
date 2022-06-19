<template>
  <div class="app-contant">
    <HeaderCard>
      <HeaderInfo @show-form="showForm" />
    </HeaderCard>
    <BodyCard>
      <!-- 筛选框 -->
      <SerachFrom
        @on-open="onOpen"
        @on-resetting="onResetting"
        @on-search="onSearch"
        @on-create-chart="onCreateChart"
        :form="form"
      />
      <div class="charts-box">
        <div class="top flex">
          <div class="left flex-1">
            <div class="title">工单处理效率</div>
            <efficiencyChart />
          </div>
          <div class="right flex-1">
            <div class="title">工单处理效率</div>
            <analyseChart />
          </div>
        </div>
        <div class="bottom">
          <div class="title">工单处理效率</div>
          <situationChart />
        </div>
      </div>
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from "./component/HeaderInfo.vue";
import SerachFrom from "./component/serachFrom.vue";
import efficiencyChart from "./component/efficiency.vue";
import analyseChart from "./component/analyse.vue";
import situationChart from "./component/situation.vue";
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import { useData } from "./useData";
const {
  loading,
  form,
  statisticList,
  pagination,
  sizeChange,
  currentChange,
  onSearch,
  onResetting,
  chartVisible,
  closeChartDialog,
  onCreateChart
} = useData();
</script>

<style lang="scss" scoped>
.charts-box {
  height: calc(100% - 45px);
  .top {
    height: 50%;
    .left {
      position: relative;
      padding: 15px;
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
    .right {
      position: relative;
      padding: 15px;
    }
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .bottom {
    position: relative;
    height: 50%;
    padding: 15px;
  }
  .title {
    position: absolute;
    left: 15px;
    top: 15px;
    font-weight: 600;
  }
}
</style>
