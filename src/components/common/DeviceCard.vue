<template>
  <div class="device_card_ flex items-center justify-between h-full box-border">
    <!-- 左侧信息 -->
    <div class="left_info flex items-center">
      <!-- 设备名称 -->
      <divcla class="left_info_name"> {{ cardData.name }}</divcla>

      <!-- 状态  0是没有告警 1是有告警  -->
      <divcla class="left_info_state flex justify-center items-center">
        <div class="state_point" :class="cardData.err_state ? 'errro_point' : ''"></div>
        <div class="state_text" :class="cardData.err_state ? 'error_color' : ''">
          {{ cardData.err_state ? "告警" : "正常" }}
        </div>
      </divcla>
    </div>

    <!-- 右侧详情 -->
    <div class="right_info relative flex">
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ cardData.soc }}</div>
        <div class="info_item_label">SOC</div>
        <SplitLine />
      </div>
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ cardData.soh }}</div>
        <div class="info_item_label">SOH</div>
        <SplitLine />
      </div>
      <div class="info_item text-center relative">
        <div class="info_item_value semi_bold">{{ cardData.accCharge }}</div>
        <div class="info_item_label">累计充电量(kWh)</div>
        <SplitLine />
      </div>
      <div class="info_item text-center">
        <div class="info_item_value semi_bold">{{ cardData.acaDischarge }}</div>
        <div class="info_item_label">累计放电量(kWh)</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import SplitLine from "@/components/common/Split_line.vue";
import { DeviceList } from "@/types";
defineProps({
  cardData: {
    type: Object as PropType<DeviceList>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.device_card_ {
  height: 8vh;
  border-bottom: 1px solid rgba(31, 28, 28, 0.05);

  // 左侧信息
  .left_info {
    // 设备名称
    .left_info_name {
      font-size: 13px;
      font-weight: 600;
      color: #000000;
      margin-right: 10px;
    }

    // 状态
    .left_info_state {
      //   rgba(0,175,76,1)
      .state_point {
        width: 8px;
        height: 8px;
        background: rgba(0, 175, 76, 1);
        border-radius: 50%;
        margin-right: 4px;
      }

      .state_text {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 175, 76, 1);
      }

      .error_color {
        color: rgb(255, 155, 0);
        // color: rgba(216, 34, 44, 1);
      }
      .errro_point {
        width: 8px;
        height: 8px;
        background: rgb(255, 155, 0);
        // background: rgba(216, 34, 44, 1);
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }

  // 右侧
  .right_info {
    .info_item {
      width: 15vw;
      .info_item_value {
        height: 2.2vh;
        font-size: 16px;
        color: #000000;
        line-height: 2.2vh;
      }

      .info_item_label {
        height: 1.7vh;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        height: 1.7vh;
      }
    }
  }
}
</style>
