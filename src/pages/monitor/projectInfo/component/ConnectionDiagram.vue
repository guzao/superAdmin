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
      <div class="small_card_box_label">变压器 #2</div>
    </div>

    <!-- 变压器连接设备 -->
    <div class="connection_sub_line relative">
      <!-- 电表icon -->
      <div class="connection_sub_line_icon absolute"></div>

      <!-- 电表信息 -->
      <div class="connection_sub_line_info absolute">
        <div class="connection_sub_line_info_detail flex">
          <span class="label">P</span>
          <span class="value flex-1 text-right">100kW</span>
          <span></span>
        </div>
        <div class="connection_sub_line_info_detail flex">
          <span class="label">Q</span>
          <span class="value flex-1 text-right">0kVar</span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- 总设备 -->
    <div class="device box-border flex justify-center items-center"></div>

    <!-- 每台设备 -->
  </div>
</template>

<script setup lang="ts"></script>

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
    height: 3vh;
    width: 1px;
    background-color: rgba(146, 146, 146, 1);
  }

  // 变压器连接设备
  .connection_sub_line {
    height: 14vh;
    width: 1px;
    background-color: rgba(146, 146, 146, 1);
    .connection_sub_line_icon {
      width: 13px;
      height: 13px;
      content: url(../../../../assets/svgs/dianbiao.svg);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

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
  }

  // 总设备
  .device {
    // min-width: 220px;
    min-width: 330px;
    height: 10.8vh;
    border: 1px solid #929292;
    border-radius: 10px 10px 0px 0px;

    .device_line {
      height: 10.8vh;
      width: 1px;
      background-color: rgba(146, 146, 146, 1);
    }
  }
}
</style>
