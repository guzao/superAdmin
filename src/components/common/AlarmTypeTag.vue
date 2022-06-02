<template>
  <!-- ！！！ts类型检查提示 不用处理  -->
  <div :class="alarmTypeLevelColorMap[text]">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const alarmTypeLevelColorMap = {
  一级故障: "alarm_type_tag1",
  二级故障: "alarm_type_tag2",
  三级故障: "alarm_type_tag3",
};
</script>

<style lang="scss" scoped>
// 一级故障
.alarm_type_tag1 {
  width: 65px;
  height: 22px;
  background: #d8222c;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #fff;
}

// 二级故障
.alarm_type_tag2 {
  width: 65px;
  height: 22px;
  background: rgba(216, 34, 44, 0.5);
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #fff;
}

// 三级故障
.alarm_type_tag3 {
  width: 65px;
  height: 22px;
  background: rgba(216, 34, 44, 0.1);
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #fff;
}
</style>
