<template>
  <div class="app-contant">
    <HeaderCard>
      <HeaderInfo />
    </HeaderCard>
    <BodyCard>
      <!-- 筛选框 -->
      <SerachFrom
        @on-resetting="onResetting"
        @on-search="onSearch"
        @on-create-chart="onCreateChart"
        :form="form"
      />
      <chartInfo />
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import HeaderInfo from "./component/HeaderInfo.vue";
import SerachFrom from "./component/serachFrom.vue";
import chartInfo from "./component/chartInfo.vue";
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

<style lang="scss" scoped></style>
