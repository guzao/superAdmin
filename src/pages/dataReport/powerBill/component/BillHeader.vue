<template>
  <div class="bill_header flex items-center justify-between h-full w-full box-border">
    <div class="left_title">电量账单</div>

    <div class="right_info flex">
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ billHeaderData.profit }}</div>
        <div class="info_item_label">累计收益(元)</div>
        <SplitLine />
      </div>
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ billHeaderData.charge }}</div>
        <div class="info_item_label">累计充电量(kWh)</div>
        <SplitLine />
      </div>
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ billHeaderData.discharge }}</div>
        <div class="info_item_label">累计放电量(kWh)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { BillDataModel } from "../data.dt";
import SplitLine from "@/components/common/Split_line.vue";
defineProps({
  billHeaderData: {
    type: Object as PropType<BillDataModel>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.bill_header {
  padding-left: 22px;
  .left_title {
    width: 56px;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    color: #000000;
  }

  // 右侧信息
  .right_info {
    .info_item {
      width: 13vw;
      .info_item_value {
        height: 2.2vh;
        font-size: 18px;
        color: #000000;
        line-height: 2.2vh;
      }

      .info_item_label {
        height: 1.7vh;
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        height: 1.7vh;
      }
    }
  }
}
</style>
