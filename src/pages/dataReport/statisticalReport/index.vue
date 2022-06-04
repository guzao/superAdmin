<template>
  <div class="app-contant">
    <HeaderCard>
      <HeaderInfo />
    </HeaderCard>
    <BodyCard>
      <!-- 筛选框 -->
      <SerachFrom
        @on-resetting="onResetting"
        @on-search="onSearch"
        @on-create-chart="onCreateChart"
        :form="form"
      />

      <MyTable class="flex-1" :data="statisticList.data" />

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
    <el-dialog v-model="chartVisible" :show-close="false" width="1000px" title="统计报表">
      <template #title="{ titleId }">
        <div class="my-header flex justify-between items-center">
          <div :id="titleId" class="dialog_tile">统计报表</div>
          <div @click="closeChartDialog" class="dialog_close cursor-pointer"></div>
        </div>
      </template>
      <div class="data-statistic flex justify-center">
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">8856.5</div>
          <div class="info_item_label">累计充电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center">
          <div class="info_item_value semi_bold">7077.3</div>
          <div class="info_item_label">累计放电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">120000</div>
          <div class="info_item_label">累计收益(元)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">99.1</div>
          <div class="info_item_label">电池平均循环效率(%)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">403</div>
          <div class="info_item_label">电池平均功率(kW)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">45.1</div>
          <div class="info_item_label">电池平均温度(℃)</div>
        </div>
      </div>
      <chartInfo />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from "./component/HeaderInfo.vue";
import chartInfo from "./component/chartInfo.vue";
import HeaderCard from "@/components/common/Header_card.vue";
import MyTable from "./component/table.vue";
import BodyCard from "@/components/common/Body_card.vue";
import SerachFrom from "./component/serachFrom.vue";
import { useData } from "./useData";
import SplitLine from "@/components/common/Split_line.vue";
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

.data-statistic {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 0;
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
</style>
