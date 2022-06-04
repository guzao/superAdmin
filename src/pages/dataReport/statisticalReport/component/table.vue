<template>
  <!-- 表格 -->
  <div class="table_box box-border">
    <el-table :data="data" height="100%" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" />
      <el-table-column sortable prop="accCharge" label="电池充电量(kWh)" />
      <el-table-column sortable prop="acaDischarge" label="电池放电量(kWh)" />
      <el-table-column sortable prop="batteryCycleEfficiency" label="电池循环效率(%)" />
      <el-table-column sortable prop="minimumBatteryOower" label="电池最小功率(kW)" />
      <el-table-column sortable prop="minimumBatteryTemperature" label="电池最低温度(℃)" />
      <el-table-column sortable prop="maximumBatteryTemperature" label="电池最高温度(℃)" />
      <el-table-column sortable prop="estimatedIncome" label="预计收益(元)" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, PropType } from "vue";
import { getHeight } from "@/utils";
import { AlarmListModel } from "@/types";
import AlarmTypeTag from "@/components/common/AlarmTypeTag.vue";
defineProps({
  data: {
    type: Array as PropType<Array<AlarmListModel>>,
    required: true
  }
});
/** 表格高度 */
const tableHeight = ref<number>(getHeight(270));
</script>

<style lang="scss" scoped>
.table_box {
  padding: 1vh 9px 0 9px;
  height: calc(100% - 12vh);
}
</style>
