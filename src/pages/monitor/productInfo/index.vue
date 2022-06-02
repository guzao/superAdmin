<template>
  <div class="app-contant relative">
    <HeaderCard :style="showSelectBox ? 'border-radius: 6px 6px 0 0;' : ''">
      <ProductHeader :titleInfo="currentDeviceData" v-model="showSelectBox" />
    </HeaderCard>

    <div
      v-loading="listLoading"
      :style="showSelectBox ? 'opacity: 0.3' : '1'"
      class="content_box flex flex-col justify-between box-border"
    >
      <HeaderCard class="flex flex-col justify-evenly" style="height: 13vh">
        <!--  -->
        <DeviceIconState :deviceState="deviceDataInfo" />

        <!-- 设备详情 -->
        <infoCard :cardData="currentDeviceData" />
      </HeaderCard>

      <HeaderCard class="chart_box flex-1 overflow-hidden" style="margin-bottom: 0">
        <div id="chart_box"></div>
      </HeaderCard>
    </div>

    <!-- 选择设备 -->
    <SelectProduct
      v-loading="listLoading"
      :deviceData="deviceData"
      :is-show="showSelectBox"
      @on-select-product="getProductInfo"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
      @on-search="onSearchList"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HeaderCard from "@/components/common/Header_card.vue";
import ProductHeader from "./component/ProductHeader.vue";
import SelectProduct from "./component/SelectProduct.vue";
import infoCard from "./component/infoCard.vue";
import DeviceIconState from "./component/DeviceIconState.vue";
import { useDataAndAction } from "./useData";
import { userEcharts } from "./useEcharts";

const {
  showSelectBox,
  getProductList,
  getProductInfo,
  getMyProduct,
  handleSizeChange,
  handleCurrentChange,
  onSearchList,
  deviceDataInfo,
  listLoading,
  currentProjectCode,
  currentDeviceCode,
  currentDeviceData,
  deviceData,
} = useDataAndAction();
const { renderLine } = userEcharts();

onMounted(async () => {
  await getProductList({ code: currentProjectCode.value });
  await getMyProduct({
    code: currentProjectCode.value,
    order_num: currentDeviceCode.value,
  });
});
</script>

<style lang="scss" scoped>
.content_box {
  height: calc(100% - (6.9vh + 1.5vh));
}
.box-border {
  transition: all 0.5s;
}

#chart_box {
  height: 100%;
}
</style>
