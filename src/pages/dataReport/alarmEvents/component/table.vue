<template>
  <!-- 表格 -->
  <div class="table_box box-border">
    <el-table height="100%" :data="data" stripe style="width: 100%">
      <el-table-column prop="name" label="告警名称" />
      <el-table-column prop="lv" label="告警等级">
        <template #default="scope">
          <AlarmTypeTag :text="scope.row.lv" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="start" label="告警开始时间" />
      <el-table-column sortable prop="last" label="告警持续时长" />
      <el-table-column sortable prop="end" label="告警结束时间" />
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
    required: true,
  },
});
/** 表格高度 */
const tableHeight = ref<number>(getHeight(270));
</script>

<style lang="scss" scoped>
.table_box {
  padding: 1vh 9px 0 9px;
}
</style>
