<template>
  <div class="app-contant">
    <HeaderCard>
      <BillHeader :billHeaderData="billData" />
    </HeaderCard>
    <BodyCard v-loading="loading">
      <!-- 筛选条件 -->
      <SearchAction
        @type-change="typeChange"
        @on-search="getElectricityBill"
        @reseting="reseting"
        @download="downloadBill"
        :form="form"
      />

      <!-- 数据表格 -->
      <div id="table_box" class="table_box">
        <el-table :data="billData.data" height="100% " id="use_table" style="width: 100%">
          <el-table-column prop="time" label="日期" />
          <el-table-column prop="j_charge" label="尖充电量" />
          <el-table-column prop="f_charge" label="峰充电量" />
          <el-table-column prop="p_charge" label="平充电量" />
          <el-table-column prop="g_charge" label="谷充电量" />
          <el-table-column prop="j_discharge" label="尖放电量" />
          <el-table-column prop="f_discharge" label="峰放电量" />
          <el-table-column prop="p_discharge" label="平放电量" />
          <el-table-column prop="g_discharge" label="谷放电量" />
          <el-table-column prop="profit" label="收益" />
        </el-table>
      </div>
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HeaderCard from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import BillHeader from "./component/BillHeader.vue";
import SearchAction from "./component/SearchAction.vue";
import { useData } from "./useData";
const {
  getElectricityBill,
  loading,
  billData,
  form,
  typeChange,
  reseting,
  downloadBill,
} = useData();

onMounted(() => {
  getElectricityBill();
});
</script>

<style lang="scss" scoped>
.table_box {
  padding: 10px 10px 0 10px;
  height: calc(100% - 46px);
  overflow: hidden;
}
</style>
