<template>
  <div class="app-contant">
    <HeaderCard>
      <HeaderInfo @show-form="showForm" />
    </HeaderCard>
    <BodyCard>
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
    </BodyCard>
    <OrderDetail class="order-detail" ref="detailRef" />
    <OrderForm ref="formRef" />
    <DistributionOrder ref="distributionRef" />
    <AuditOrder ref="auditRef" />
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from "./component/HeaderInfo.vue";
import OrderForm from "./component/form.vue";
import DistributionOrder from "./component/distribution.vue";
import AuditOrder from "./component/audit.vue";
import SerachFrom from "./component/serachFrom.vue";
import HeaderCard from "@/components/common/Header_card.vue";
import MyTable from "./component/table.vue";
import OrderDetail from "./component/detail.vue";
import BodyCard from "@/components/common/Body_card.vue";
import { useData } from "./useData";
import { ref } from "vue";
/** 搜索条件变化事件 */
const tableRef = ref();
const onOpen = () => {
  tableRef.value.onOpen();
};

/** 详情弹窗 */
const detailRef = ref();
const showDetail = () => {
  detailRef.value.showDetialDialog();
};

/** 新增编辑弹窗 */
const formRef = ref();
const showForm = () => {
  formRef.value.showDialogVisible();
};

/** 分配弹窗 */
const distributionRef = ref();
const distribution = () => {
  distributionRef.value.showDialogVisible();
};

/** 审核弹窗 */
const auditRef = ref();
const showAudit = () => {
  auditRef.value.showDialogVisible();
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
.app-contant {
  position: relative;
  .order-detail {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 6px;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
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
