<template>
  <div style="height: 100%">
    <!-- 筛选框 -->
    <SerachFrom
      @on-open="onOpen"
      @on-resetting="onResetting"
      @on-search="onSearch"
      @on-create-chart="onCreateChart"
      :form="form"
    />
    <!-- 表格 -->
    <MyTable
      ref="tableRef"
      class="flex-1"
      :data="statisticList.data"
      @show-detail="showDetail"
      @show-form="showForm"
      @distribution="distribution"
      @show-audit="showAudit"
    />

    <!-- 分页器 -->
    <div class="page_box flex items-center justify-between box-border">
      <div class="total_number">共{{ statisticList.total }}条数据</div>
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="prev, pager, next, sizes, jumper"
        :total="statisticList.total"
        v-model:currentPage="pagination.page"
        v-model:page-size="pagination.page_szie"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SerachFrom from "./serachFrom.vue";
import MyTable from "./table.vue";
import { useData } from "../../useData";
import { ref } from "vue";
/** 搜索条件变化事件 */
const tableRef = ref();
const onOpen = () => {
  tableRef.value.onOpen();
};
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
// 分页
.page_box {
  margin-top: 3px;
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