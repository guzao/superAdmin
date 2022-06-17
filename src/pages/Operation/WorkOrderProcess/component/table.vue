<template>
  <!-- 表格 -->
  <div :class="{'open-height': isOpen}" class="table_box box-border">
    <el-table :data="data" height="100%" stripe style="width: 100%">
      <el-table-column fixed="left" sortable prop="date" width="120px" align="center" label="工单编号" />
      <el-table-column sortable prop="accCharge" width="120px" align="center" label="处理人员" />
      <el-table-column sortable prop="acaDischarge" width="120px" align="center" label="工单类型" />
      <el-table-column
        sortable
        prop="batteryCycleEfficiency"
        width="120px"
        align="center"
        label="故障产品"
      />
      <el-table-column
        sortable
        prop="minimumBatteryOower"
        min-width="120px"
        align="center"
        label="故障描述"
      />
      <el-table-column
        sortable
        prop="minimumBatteryTemperature"
        width="120px"
        align="center"
        label="故障位置"
      />
      <el-table-column
        sortable
        prop="maximumBatteryTemperature"
        width="120px"
        align="center"
        label="是否超时"
      />
      <el-table-column sortable prop="estimatedIncome" width="120px" align="center" label="发现时间" />
      <el-table-column sortable prop="estimatedIncome" width="120px" align="center" label="发现人员" />
      <el-table-column sortable prop="estimatedIncome" width="120px" align="center" label="发现人员" />
      <el-table-column sortable prop="estimatedIncome" width="120px" align="center" label="发现人员" />
      <el-table-column fixed="right" width="180px" align="center" label="操作">
        <template #default>
          <el-button link type="primary" size="small" @click="showDetail">查看</el-button>
          <el-button link type="primary" size="small" @click="distribution">分配</el-button>
          <el-button link type="primary" size="small" @click="edit">编辑</el-button>
          <el-button link type="primary" size="small" @click="audit">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, defineExpose, ref, PropType } from "vue";
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
const isOpen = ref(false);
const onOpen = () => {
  isOpen.value = !isOpen.value;
};
const emits = defineEmits([
  "showDetail",
  "distribution",
  "showForm",
  "showAudit"
]);
const showDetail = () => {
  emits("showDetail");
};
const distribution = () => {
  emits("distribution");
};
const edit = () => {
  emits("showForm");
};
const audit = () => {
  emits("showAudit");
};
defineExpose({
  onOpen
});
</script>

<style lang="scss" scoped>
.table_box {
  padding: 1vh 9px 0 9px;
  height: calc(100% - 12vh);
}
.open-height {
  height: calc(100% - 18vh) !important;
}
</style>
