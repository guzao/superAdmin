<template>
  <HeadreCard>
    <ul class="flex items-center justify-around height_full">
      <li class="text-center flex-1">
        <div class="number_text">{{ collectData.b_num }}</div>
        <div class="_label">设备数量(台)</div>
        <SplitLine />
      </li>
      <li class="text-center flex-1">
        <div class="number_text">{{ collectData.off_line }}</div>
        <div class="_label">离线设备(台)</div>
        <SplitLine />
      </li>
      <li class="text-center flex-1">
        <div class="number_text">{{ collectData.err_num }}</div>
        <div class="_label">异常设备(台)</div>
        <SplitLine />
      </li>
      <li class="text-center flex-1">
        <div class="number_text">{{ collectData.charge }}</div>
        <div class="_label">累计充电量(kW)</div>
        <SplitLine />
      </li>
      <li class="text-center flex-1">
        <div class="number_text">{{ collectData.discharge }}</div>
        <div class="_label">累计放电量(kW)</div>
      </li>
    </ul>
  </HeadreCard>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import HeadreCard from "@/components/common/Header_card.vue";
import SplitLine from "@/components/common/Split_line.vue";
import { useHeaderData } from "./useHeader";

const { collectData, getProjectSummary } = useHeaderData();
onMounted(getProjectSummary);
</script>
1

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";
li {
  position: relative;

  .number_text {
    // font-size: $-g-fszier18;
    font-size: 1.8vh;
    font-weight: 550;
    line-height: 2.2vh;
    height: 2.2vh;
    margin-bottom: 4px;
  }
  ._label {
    font-size: 1.2vh;
    color: $-g-black;
    height: 1.7vh;
  }
}
</style>
