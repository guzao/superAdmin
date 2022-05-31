<template>
  <div class="app-contant">
    <Header_card :style="showSelectBox ? 'border-radius: 6px 6px 0 0':''">
      <HeaderInfo :titleInfo="currentDeviceData" v-model:show-select-box="showSelectBox" />
      <div class="device-card-box">
        <DeviceCard :is-show="showSelectBox" @selected-product="selectedProduct" />
      </div>
    </Header_card>
    <MonitorCard :monitorInfo="currentDeviceData" />
    <ChartCard />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DeviceCard from "./component/DeviceCard.vue";
import HeaderInfo from "./component/HeaderInfo.vue";
import MonitorCard from "./component/MonitorCard.vue";
import ChartCard from "./component/ChartCard.vue";
import Header_card from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
let showSelectBox = ref(false);
let currentDeviceData = {
  id: 3,
  order_num: 1,
  product_id: 1,
  address: "测试地址",
  station_code: "NJ02",
  start_time: "2022-05-06 11:19:32",
  code_name: "南京",
  customer: "大客户",
  name: "型号1",
  model: "m001",
  specs: "DD",
  number: "DD",
  version: "DD",
  time: "17天 ",
  soc: "-- %",
  soh: "-- %",
  maxVolt: "-- V",
  minVolt: "-- V",
  maxTemp: "-- ℃",
  minTemp: "-- ℃",
  volt: "-- V",
  current: "-- A",
  accCharge: "-- kWh",
  acaDischarge: "-- kWh",
  concentration: "-- LEL",
  activePower: "-- kW",
  reactivePower: "-- kVar"
};
const selectedProduct = (item: object) => {
  console.log("item");
  console.log(item);
  showSelectBox.value = false;
  currentDeviceData = item;
};
</script>

<style lang="scss" scoped>
.device-card-box {
  width: 100%;
  position: relative;
}
</style>
