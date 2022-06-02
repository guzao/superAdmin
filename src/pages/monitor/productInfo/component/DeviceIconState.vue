<template>
  <div class="icon_box flex box-border items-center">
    <div class="label_text">设备监控</div>

    <!--  -->
    <div
      :class="deviceState.waring == 1 ? '' : 'alarm'"
      class="icon_state_box box-border flex items-center justify-center"
    >
      <div
        class="incon"
        :class="deviceState.waring == 1 ? 'icon_alarm' : 'icon_ok'"
      ></div>
      <span>设备{{ deviceState.waring == 1 ? "异常" : "正常" }}</span>
    </div>
    <div class="icon_state_box box-border flex items-center justify-center">
      <i
        class="incon"
        :class="deviceState.b_state == 1 ? 'icon_on_line' : 'icon_out_line'"
      ></i>
      <span>设备{{ deviceState.b_state == 1 ? "在线" : "离线" }}</span>
    </div>
    <div class="icon_state_box box-border flex items-center justify-center">
      <i
        :class="deviceState.door_state == 1 ? 'icon_open_d' : 'icon_close_d'"
        class="incon"
      ></i>
      <span>柜门{{ deviceState.door_state == 1 ? "关闭" : "开启" }}</span>
    </div>
    <div class="icon_state_box box-border flex items-center justify-center">
      <i class="incon icon_xiaofang_pensa"></i>
      <span>消防{{ deviceState.fire_sprinkler == 1 ? "正常" : "喷洒" }}</span>
    </div>
    <div class="icon_state_box box-border flex items-center justify-center">
      <i class="incon icon_device_jinshui"></i>
      <span>设备{{ deviceState.immersion == 1 ? "未浸水" : "浸水" }}</span>
    </div>
    <div class="icon_state_box box-border flex items-center justify-center">
      <i class="incon icon_zhi_leng"></i>
      <span>空调{{ deviceStateText(deviceState) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deviceInfoModel } from "../data.dt";
import { defineProps, PropType } from "vue";
defineProps({
  deviceState: {
    type: Object as PropType<deviceInfoModel>,
    required: true,
  },
});

const deviceStateText = (data: deviceInfoModel) => {
  if (data.k1_state == 0 || data.k1_state == 0) {
    return "待机";
  }
  if (data.k1_state == 1 || data.k1_state == 1) {
    return "制冷";
  }
  if (data.k1_state == 2 || data.k1_state == 2) {
    return "制热";
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/incon.scss";
.icon_box {
  height: 2.8vh;
  padding-left: 16px;

  .label_text {
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    color: #000000;
    margin-right: 11px;
  }

  .icon_state_box {
    width: 100px;
    height: 28px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    margin-right: 10px;
    .icon_alarm {
      width: 14px;
      height: 14px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/alarm.svg);
      margin-right: 4px;
    }
    .alarm {
      border-color: rgba(216, 34, 44, 0.3) !important;
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02) !important;
    }
    .alarm_color {
      border-color: rgba(216, 34, 44, 1);
    }
    .icon_ok {
      width: 14px;
      height: 14px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/device_ok.svg);
      margin-right: 4px;
    }

    // .icon_chongdian {
    //   width: 18px;
    //   height: 13px;
    //   margin-right: 6px;
    //   content: url(../../../../assets/svgs/chongdian.svg);
    //   margin-right: 4px;
    // }

    .icon_on_line {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/on_line.svg);
      margin-right: 4px;
    }
    .icon_out_line {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/out_line.svg);
      margin-right: 4px;
    }

    .icon_open_d {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/open_d.svg);
      margin-right: 4px;
    }
    .icon_close_d {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/close_d.svg);
      margin-right: 4px;
    }

    .icon_xiaofang_pensa {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/xiaofang_pensa.svg);
      margin-right: 4px;
    }

    .icon_device_jinshui {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/device_jinshui.svg);
      margin-right: 4px;
    }

    .icon_zhi_leng {
      width: 16px;
      height: 11px;
      margin-right: 6px;
      content: url(../../../../assets/svgs/zhi_leng.svg);
      margin-right: 4px;
    }

    span {
      color: rgba(17, 17, 17, 1);
      font-weight: 400;
    }
  }
}
</style>
