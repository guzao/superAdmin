<template>
  <!-- 表格 -->
  <div :class="{'open-height': isOpen }" class="table_box box-border">
    <el-table :data="data" height="100%" class="el-table">
      <el-table-column fixed="left" prop="name" width="180px" label="异常信息" />
      <el-table-column prop="type" width="120px" label="异常类型">
        <template #default="scope">
          <span v-if="scope.row.type === 1">电压离群</span>
          <span v-if="scope.row.type === 2">电压跳变</span>
          <span v-if="scope.row.type === 3">温度跳变</span>
          <span v-if="scope.row.type === 4">内阻异常</span>
          <span v-if="scope.row.type === 5">内短路告警</span>
        </template>
      </el-table-column>
      <el-table-column prop="no" width="120px" label="所属设备" />
      <el-table-column prop="address" min-width="250px" label="位置" />
      <el-table-column prop="state" width="120px" label="严重程度">
        <template #default="scope">
          <el-tag v-if="scope.row.state === 1" class="mild-tag">轻度</el-tag>
          <el-tag v-if="scope.row.state === 2" class="medium-tag">中度</el-tag>
          <el-tag v-if="scope.row.state === 3" class="severe-tag">重度</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="abnormalType" width="120px" label="异常状态">
        <template #default="scope">
          <span v-if="scope.row.abnormalType === 1">未发起工单</span>
          <span v-if="scope.row.abnormalType === 2">已发起工单</span>
          <span v-if="scope.row.abnormalType === 3">无需发起工单</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180px" label="异常时间" />
      <el-table-column prop="time" width="180px" label="异常时间" />
      <el-table-column prop="time" width="180px" label="异常时间" />
      <el-table-column fixed="right" width="100px" align="center" label="操作">
        <template #default="scope">
          <el-button
            v-show="scope.row.buttonType === 1"
            link
            type="primary"
            size="small"
            style="width:100%; text-algin: left;"
          >—</el-button>
          <el-button
            v-show="scope.row.buttonType === 2 || scope.row.buttonType === 3"
            link
            type="primary"
            size="small"
            style="margin-left: 0 !important;"
            @click="showDetail"
          >工单</el-button>
          <el-button
            v-show="scope.row.buttonType === 2"
            link
            type="primary"
            size="small"
            @click="showDetail"
          >关闭</el-button>
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
.el-table {
  border: 1px solid #f2f2f2;
}
.table_box {
  padding: 1vh 9px 0 9px;
  height: calc(100% - 12vh);
}
.open-height {
  height: calc(100% - 18vh) !important;
}
.mild-tag {
  border: none;
  color: #d8232d;
  background-color: #fbe8e9;
}
.medium-tag {
  border: none;
  color: white;
  background-color: #eb9095;
}
.severe-tag {
  border: none;
  color: white;
  background-color: #d8232d;
}
</style>
