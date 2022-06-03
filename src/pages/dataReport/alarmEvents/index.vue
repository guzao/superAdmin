<template>
  <div class="app-contant">
    <HeaderCard>
      <div class="flex items-center justify-start h-full alarm_title box-border">
        告警事件
      </div>
    </HeaderCard>
    <BodyCard class="flex flex-col" v-loading="loading">
      <!-- 筛选框 -->
      <SerachFrom @on-resetting="onResetting" @on-search="onSearch" :form="form" />
      <!-- 表格 -->
      <MyTable class="flex-1" :data="alarmList.data" />

      <!-- 分页器 -->
      <div class="page_box flex items-center justify-between box-border">
        <div class="total_number">共{{ alarmList.total }}条数据</div>
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          background
          layout="prev, pager, next, sizes, jumper"
          :total="alarmList.total"
          v-model:currentPage="pagination.page"
          v-model:page-size="pagination.page_szie"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import MyTable from "./component/table.vue";
import SerachFrom from "./component/serachFrom.vue";
import { useData } from "./useData";

const {
  loading,
  form,
  alarmList,
  pagination,
  sizeChange,
  currentChange,
  onSearch,
  onResetting,
} = useData();
</script>

<style lang="scss" scoped>
.alarm_title {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: #000000;
  padding-left: 22px;
}

// 分页
.page_box {
  height: 5vh;
  padding-left: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  // 总数文字
  .total_number {
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
