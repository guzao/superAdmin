<template>
  <transition name="el-zoom-in-top">
    <div v-show="isShow" class="select_box">
      <!-- 顶部搜索 -->
      <div class="serach_box flex">
        <!-- 搜索 -->
        <div class="flex flex-grow">
          <div class="title">筛选</div>
          <div class="serach_form flex">
            <div class="label">设备名称</div>
            <el-input v-model="deviceName" style="width: 130px" placeholder="请输入设备名称" />
          </div>
          <div class="serach_form flex">
            <div class="label">所属客户</div>
            <el-select v-model="clientId" style="width: 130px" placeholder="请选择所属客户">
              <el-option
                v-for="item in clientOptions"
                :key="item.id + 'client'"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="serach_form flex">
            <div class="label">所属项目</div>
            <el-select v-model="productId" style="width: 130px" placeholder="请选择所属项目">
              <el-option
                v-for="item in productOptions"
                :key="item.id + 'product'"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="serach_form flex">
            <el-switch
              v-model="isAalarm"
              class="mx-2"
              active-color="#D8222C"
              inactive-color="#F2F2F2"
            />
            <div class="label">告警设备</div>
          </div>
        </div>
        <div class="flex flex-none">
          <el-button class="reset-button" @click="reset">重置</el-button>
          <el-button class="serach-button" @click="serach">
            <div class="light" />查询
          </el-button>
        </div>
      </div>

      <!-- 设备列表 -->
      <!-- 设备列表 -->
      <div class="product_list">
        <!-- 每一个设备 -->
        <el-radio-group
          @change="checkedproduct"
          v-model="checkedActive"
          class="radio-group-box w-full"
        >
          <div
            v-for="item in productDataList"
            :key="item.id"
            class="product_item flex items-center h-full flex-1"
          >
            <!-- 选择项目 -->
            <div class="left_select_box flex items-center justify-center">
              <el-radio :label="item.id" class="radio-select" size="large">
                <span></span>
              </el-radio>
            </div>

            <!-- 基本信息 -->
            <div class="item_info h-full flex items-center box-border flex-1 justify-between">
              <!-- 设备名称 -->
              <div class="item_info_name">{{ item.name }}</div>

              <!-- 设备参数信息 -->
              <div class="item_info_right relative flex">
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.soc }}</div>
                  <div class="info_item_label">SOC</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.soh }}</div>
                  <div class="info_item_label">SOH</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.accCharge }}</div>
                  <div class="info_item_label">累计充电量(kWh)</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.acaDischarge }}</div>
                  <div class="info_item_label">累计放电量(kWh)</div>
                </div>
              </div>
            </div>
          </div>
        </el-radio-group>
      </div>

      <div class="pagination-box flex items-center justify-between">
        <div class="total-text">共{{total}}条数据</div>
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 50, 100, 200]"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import SplitLine from "@/components/common/Split_line.vue";
const deviceName = ref("");
const clientId = ref("");
const productId = ref("");
const isAalarm = ref(false);
let total = ref(400);
let checkedActive = ref(3);
const productDataList = [
  {
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
  },
  {
    id: 16,
    order_num: 3,
    product_id: 2,
    address: "222",
    station_code: "NJ02",
    start_time: "2022-05-06 11:19:30",
    code_name: "南京",
    customer: "大客户",
    name: "型号2",
    model: "m002",
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
  }
];
const clientOptions = [
  { id: 1, name: "客户1" },
  { id: 2, name: "客户2" },
  { id: 3, name: "客户3" }
];
const productOptions = [
  { id: 1, name: "项目1" },
  { id: 2, name: "项目2" },
  { id: 3, name: "项目3" }
];
const props = defineProps({
  isShow: {
    type: Boolean
  }
});
const reset = () => {
  deviceName.value = "";
  clientId.value = "";
  productId.value = "";
  isAalarm.value = false;
  serach();
};
const serach = () => {
  console.log("搜索");
};
const emit = defineEmits(["selected-product"]);
const checkedproduct = (a: number) => {
  for (let item of productDataList) {
    if (item.id === a) {
      emit("selected-product", item);
    }
  }
};
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
.select_box {
  border-radius: 0 0 6px 6px;
  border-top: 2px solid #f2f2f2;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 83vh;
  background-color: white;
  // 顶部搜索
  .serach_box {
    height: 7vh;
    padding: 8px 10px 8px 0px;
    line-height: calc(7vh - 16px);
    border-bottom: 1px solid #f2f2f2;
    .title {
      margin: 0 10px 0 21px;
      font-size: 14px !important;
      font-weight: 600;
    }
    .serach_form {
      margin-right: 16px;
      el-switch {
        margin-right: 10px;
      }
      .label {
        margin-right: 10px;
      }
    }
    .reset-button {
      color: black;
      width: 80px;
      font-weight: 600;
      border-radius: $-g-b-radius6;
    }
    .serach-button {
      color: white;
      background-color: #d8222c;
      width: 80px;
      font-weight: 600;
      border-radius: $-g-b-radius6;
      position: relative;
      overflow: hidden;
      .light {
        width: 80px;
        height: 50px;
        right: 20px;
        bottom: 23px;
        position: absolute;
        z-index: 2;
        background-image: linear-gradient(
          to left,
          rgb(255, 255, 255),
          rgba(255, 255, 255, 0)
        );
        transform: rotate(-40deg);
      }
    }
  }

  // 数据列表
  .product_list {
    padding-left: 24px;
    height: calc(100% - 14vh);
    border-bottom: 1px solid #f2f2f2;
    .radio-group-box {
      display: inline-block;
      .product_item {
        height: 70px;
        .radio-select {
          :deep .el-radio__input.is-checked .el-radio__inner::after {
            content: "";
            width: 10px;
            height: 5px;
            border: 2px solid white;
            border-top: transparent;
            border-right: transparent;
            text-align: center;
            display: block;
            position: absolute;
            top: 5px;
            left: 3px;
            vertical-align: middle;
            transform: rotate(-45deg);
            border-radius: 0px;
            background: none;
          }
        }
        :deep .el-radio__input.is-checked .el-radio__inner {
          background-color: #d8222c;
          border-color: #d8222c;
        }
        :deep .el-radio.el-radio--large .el-radio__inner {
          width: 18px;
          height: 18px;
        }
        .item_info {
          border-bottom: 1px solid #f2f2f2;
          .item_info_name {
            font-weight: 600;
            font-size: 14px;
          }
          .info_item {
            width: 150px;
            .info_item_label {
              font-size: 12px;
              font-weight: 400;
            }
            .info_item_value {
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  // 分页组件
  .pagination-box {
    height: 7vh;
    .total-text {
      margin-left: 20px;
      font-size: 12px;
      color: #838383;
    }
    .pagination {
      display: flex;
      justify-content: end;
      margin-right: 10px;
      :deep .el-pagination__total {
        margin-left: 20px;
      }
      :deep .number,
      :deep .btn-next,
      :deep .btn-prev {
        border-radius: $-g-b-radius6;
        border: 1px solid #e5e5e5;
        margin: 0 5px;
        color: #838383;
      }
      :deep .is-active {
        border: 1px solid #d8222c !important;
        color: #d8222c !important;
      }
    }
  }
}
</style>