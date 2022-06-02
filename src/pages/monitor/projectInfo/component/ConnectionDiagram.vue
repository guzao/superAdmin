<template>
  <div class="line_map flex flex-col items-center">
    <!-- 电网 -->
    <div class="small_card_box flex flex-col items-center justify-evenly box-border">
      <div class="small_card_box_top"></div>
      <div class="small_card_box_label">电网</div>
    </div>

    <!-- 电网连接变压器 -->
    <div class="connection_top_line"></div>

    <!-- 变压器 -->
    <div class="small_card_box flex flex-col items-center justify-evenly box-border">
      <div class="small_card_box_top_byq"></div>
      <div class="small_card_box_label">{{ connectionData?.name }}</div>
    </div>

    <!-- 变压器连接设备 -->
    <div class="connection_sub_line relative">
      <!-- 电表icon -->
      <div class="connection_sub_line_icon absolute"></div>

      <!-- 电表信息 -->
      <div @click="viewPowerCurve(connectionData)" class="connection_sub_line_info absolute  cursor-pointer">
        <div class="connection_sub_line_info_detail flex">
          <span class="label">P</span>
          <span class="value flex-1 text-right">{{ connectionData?.active_power }}kW</span>
          <span></span>
        </div>
        <div class="connection_sub_line_info_detail flex">
          <span class="label">Q</span>
          <span class="value flex-1 text-right">{{ connectionData?.reactive_power }}kVar</span>
          <span></span>
        </div>
      </div>

    </div>

    <!-- 总设备连接处 -->
    <div
      :style="`width:${boxWith}px`"
      class="device box-border flex items-center justify-between box-border "
    >
      <div 
        v-for="(item, index) in props.connectionData?.children"
        :key="index" 
        class="device_line_box relative"
        :style="
          `background-color:${ numberIsStartOrEnd(index)? 'transparent': 'rgba(146, 146, 146, 1)' };`
        "
        >
        <!-- 电表icon -->
        <div class="connection_sub_line_icon absolute"></div>

        <!-- 电表信息 -->
        <div @click="viewPowerCurve(item)" class="connection_sub_line_info absolute cursor-pointer">
          <div  class="connection_sub_line_info_detail flex">
            <span class="label">P</span>
            <span class="value flex-1 text-right">{{ item.active_power }}kW</span>
            <span></span>
          </div>
          <div class="connection_sub_line_info_detail flex">
            <span class="label">Q</span>
            <span class="value flex-1 text-right">{{ item.reactive_power }}kVar</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 每台设备 -->
    <div class="device_container flex">
      <div
        v-for="(item, index) in props.connectionData?.children"
        :key="index"
        class="small_card_box flex flex-col items-center justify-evenly box-border device_item relative"
      >
        <!-- <div class="semi_bold device_number">#{{ index + 1 }}</div> -->
        <div class="small_card_box_label">{{ item.name  }}</div>
      </div>
    </div>

  </div>


  
</template>

<script setup lang="ts">
import { defineProps,  PropType } from "vue";
import { ConnectionDiagramDataModel } from "../data.dt";
import { useAction } from './useConnectionDiagram';
const props = defineProps({
  connectionData: {
    type: Object as PropType<ConnectionDiagramDataModel>,
  },
});

const { boxWith, numberIsStartOrEnd, viewPowerCurve } = useAction(props.connectionData as ConnectionDiagramDataModel)
</script>

<style lang="scss" scoped>
.line_map {
  height: 60vh;

  // 电网 变压器
  .small_card_box {
    width: 90px;
    height: 7.4vh;
    background: #ffffff;
    border: 1px solid #929292;
    border-radius: 10px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    .small_card_box_top {
      width: 24px;
      height: 22px;
      content: url(../../../../assets/svgs/power_grid.svg);
    }

    .small_card_box_top_byq {
      width: 18px;
      height: 18px;
      content: url(../../../../assets/svgs/bianyaqi.svg);
    }

    .small_card_box_label {
      height: 1.7vh;
      font-size: 12px;
      font-weight: 400;
      color: #111111;
      line-height: 1.7vh;
    }
  }

  // 电网连接变压器
  .connection_top_line {
    height: 8vh;
    width: 1px;
    background-color: rgba(146, 146, 146, 1);
  }

  // 变压器连接设备
  .connection_sub_line {
    height: 20vh;
    width: 1px;
    background-color: rgba(146, 146, 146, 1);
  }

  // 电压 功率公共样式
  .connection_sub_line_info {
    top: 50%;
    transform: translate(-120%, -50%);
    font-size: 12px;

    .connection_sub_line_info_detail > .label {
      font-weight: 600;
      text-align: left;
      color: #000000;
      padding-right: 4px;
    }
    .connection_sub_line_info_detail > .value {
      font-weight: 500;
      text-align: left;
      color: #000000;
    }
  }

  // 电压icon
  .connection_sub_line_icon {
    width: 13px;
    height: 13px;
    content: url(../../../../assets/svgs/dianbiao.svg);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  // 总设备 连接处
  .device {
    min-width: 220px;
    height: 11vh;
    border: 1px solid #929292;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;

    .device_line_box {
      height: 11vh;
      width: 1px;
      background-color: rgba(146, 146, 146, 1);
    }
  }

  // 总设备
  .device_container {
    .device_item {
      margin: 0 10px;
      .device_number {
        font-size: 16px;
      }
    }
  }
}
</style>
