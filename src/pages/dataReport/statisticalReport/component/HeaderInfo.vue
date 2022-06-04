<template>
  <div class="app-contant">
    <div class="flex justify-between items-center h-full">
      <!-- 左侧 -->
      <div class="left_info flex items-center h-full relative">
        <!-- 右侧信息 -->
        <div class="left_base_info">
          <div class="left_base_info_name">统计报表</div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right_info flex">
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">8856.5</div>
          <div class="info_item_label">累计充电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">7385.99</div>
          <div class="info_item_label">累计放电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">10998</div>
          <div class="info_item_label">累计收益(元)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">99.1</div>
          <div class="info_item_label">电池平均循环效率(%)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">503</div>
          <div class="info_item_label">电池平均功率(kW)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">39.1</div>
          <div class="info_item_label">电池平均温度(℃)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from "vue";
import SplitLine from "@/components/common/Split_line.vue";
import { ProjectBaseInfoModel } from "../data.dt";
import { useHeader } from "./useHeader";
import { ClickOutside as vClickOutside } from "element-plus";

defineProps({
  titleInfo: {
    type: Object as PropType<ProjectBaseInfoModel | null>,
    required: true
  },
  isShow: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(["onSelect"]);
const { isShowProjectInfo, showSelect, isShowSelect } = useHeader();
const onClickOutside = () => (isShowProjectInfo.value = false);
const selectProject = () => emits("onSelect", isShowSelect.value);
</script>

<style lang="scss" scoped>
.left_info {
  // 左侧icon
  .left_icon {
    height: 18px;
    width: 18px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 9px;
    margin-right: 10px;
    margin-left: 24px;
  }

  .left_base_info {
    padding-left: 22px;
    .left_base_info_name {
      margin-bottom: 0.3vh;
      height: 2vh;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      line-height: 2vh;
    }

    .left_base_info_tips {
      height: 1.3vh;
      .info_icon {
        height: 1.3vh;
        width: 1.3vh;
        content: url(../../../../assets/svgs/info.svg);
        margin-right: 3px;
      }

      & > span {
        height: 13px;
        opacity: 0.5;
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        line-height: 13px;
      }
    }
  }
}

.right_info {
  .info_item {
    width: 13vw;
    .info_item_value {
      height: 2.2vh;
      font-size: 18px;
      color: #000000;
      line-height: 2.2vh;
    }

    .info_item_label {
      height: 1.7vh;
      font-size: 12px;
      font-weight: 400;
      color: #000000;
      height: 1.7vh;
    }
  }
}

// 项目信息
.popup {
  background: #f9f9f9;
  border-radius: 6px;
  position: absolute;
  left: 0;
  width: 300px;
  box-shadow: 0px 5px 10px 0px rgb(0 0 0 / 5%);
  bottom: -24.5vh;

  // title
  .base_info_title {
    height: 5vh;
    background: rgb(255, 255, 255);
    padding: 0 14px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    border-radius: 6px 6px 0 0;
    span {
      font-weight: 600;
    }

    &::after {
      display: block;
      content: " ";
      position: absolute;
      height: 5px;
      top: -14px;
      width: 0px;
      left: 20%;
      border: 7px solid #ffffff;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }

  // 详细信息
  .info_list_box {
    margin: 12px;
    background-color: #ffffff;
    border-radius: 6px;
    padding-left: 20px;
    box-sizing: border-box;

    .list_item {
      height: 4vh;
      &:last-child .list_item_right {
        border-bottom: none !important;
      }
      .list_item_left {
        margin-right: 8px;
        opacity: 0.5;
      }
      .list_item_right {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
