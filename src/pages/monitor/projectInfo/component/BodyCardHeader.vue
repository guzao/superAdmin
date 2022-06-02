<template>
  <div class="top flex justify-between items-center">
    <div class="left_mark">项目连接图</div>

    <!-- 操作按钮 -->
    <div class="action_box flex items-center select-none">
      <div
        @click="buttonAction(1)"
        class="left_action flex-1 cursor-pointer flex h-full items-center box-border"
      >
        <div class="left_action_icon"></div>
        <span>设备列表</span>
        <div class="right_action_icon"></div>
      </div>

      <div
        @click="buttonAction(2)"
        class="right_action flex-1 cursor-pointer flex h-full box-border items-center"
      >
        <div class="left_action_icon"></div>
        <span>实时告警</span>
        <div class="right_action_icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emits = defineEmits(["click"]);
const buttonAction = (type: number) => emits("click", type)
</script>

<style lang="scss" scoped>
.top {
  .left_mark {
    height: 1.7vh;
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    line-height: 1.7vh;
  }

  .action_box {
    width: 230px;
    height: 3.7vh;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    overflow: hidden;
    .left_action {
      padding-left: 20px;
      border-right: 1px solid rgba(0, 0, 0, 0.05);
      .left_action_icon {
        width: 15px;
        height: 15px;
        margin-right: 8px;
        content: url(../../../../assets/svgs/shebei.svg);
      }
      span {
        font-size: 12px;
        font-weight: 600;
        color: #000000;
      }
      .right_action_icon {
        width: 5px;
        margin-left: 8px;
        height: 9px;
        content: url(../../../../assets/svgs/right_arr.svg);
      }
    }

    .left_action:hover,
    .right_action:hover {
      box-shadow: inset 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    }

    .right_action {
      padding-left: 18px;
      .left_action_icon {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        content: url(../../../../assets/svgs/alarm.svg);
      }
      span {
        font-size: 12px;
        font-weight: 600;
        color: rgba(216, 34, 44, 1);
      }
      .right_action_icon {
        width: 5px;
        margin-left: 8px;
        height: 9px;
        content: url(../../../../assets/svgs/red_right_arr.svg);
      }
    }
  }
}
</style>
