<template>
  <!-- 卡片 -->
  <div
    @click="cardClick(item)"
    v-for="(item, index) in props.cardList"
    :key="index"
    class="card cursor-pointer"
  >
    <!-- 顶部 -->
    <div class="card_title_info flex justify-between">
      <div class="model">{{ item.name }}</div>
      <div class="state flex items-baseline justify-center">
        <div class="state_point" :class="mapPointColor[item.state]"></div>
        <div class="state_text" :class="mapTextColor[item.state]">
          {{ mapText[item.state] }}
        </div>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="card_base_info flex">
      <div class="label">{{ item.time ? "投运时长" : "投运日期" }}</div>
      <div class="value flex-1">{{ item.time || item.run_time }}</div>
    </div>
    <div class="card_base_info flex">
      <div class="label">项目地址</div>
      <div class="value flex-1">{{ item.address || item.addr }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from "vue";
import { CardModel } from "./Map.dt";
const props = defineProps({
  cardList: {
    type: Array as PropType<Array<CardModel>>,
    required: true,
  },
});
const emeits = defineEmits(["cardClick"]);
const cardClick = (item: any) => {
  emeits("cardClick", item);
  console.log(item);
};

/** 文字 */
const mapText = {
  1: "正常",
  2: "离线",
  3: "故障",
};
/** 文字颜色 */
const mapTextColor = {
  1: "inline_text_color",
  2: "outline_text_color",
  3: "alarm_text_color",
};
/** point 背景色 */
const mapPointColor = {
  1: "onlie_point",
  2: "outlie_point",
  3: "alarm_point",
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";

.card {
  height: 84px;
  width: 280px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
  margin-bottom: 10px;
  padding: 10px 12px 5px 12px;
  box-sizing: border-box;

  .card_title_info {
    height: 20px;
    margin-bottom: 5px;
    .model {
      width: 76px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      color: #000000;
      line-height: 20px;
    }

    .state {
      .state_point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 3.5px;
      }

      .onlie_point {
        background: rgba(0, 175, 76, 1);
      }

      .alarm_point {
        background: #ff9b00;
      }

      .outlie_point {
        background: rgba(182, 182, 182, 1);
      }

      .state_text {
        width: 24px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        line-height: 17px;
      }

      .inline_text_color {
        color: rgba(0, 175, 76, 1);
      }
      .outline_text_color {
        color: rgba(182, 182, 182, 1);
      }
      .alarm_text_color {
        color: #ff9b00;
      }
    }
  }

  .card_base_info {
    margin-bottom: 5px;
    height: 17px;
    line-height: 17px;
    font-weight: 400;
    font-size: 12px;
    text-align: left;

    .label {
      width: 48px;
      opacity: 0.5;
      color: #000000;
      margin-right: 4px;
    }
    .value {
      opacity: 0.5;
      color: #111111;
    }
  }
}
</style>
