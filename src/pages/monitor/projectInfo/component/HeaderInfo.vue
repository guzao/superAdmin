<template>
  <div class="app-contant">
    <div class="flex justify-between items-center h-full">
      <!-- 左侧 -->
      <div class="left_info flex items-center h-full relative">
        <!-- 左侧icon -->
        <div
          @click="selectProject"
          class="left_icon flex justify-center items-center cursor-pointer"
        >
          <el-icon>
            <ArrowUp v-if="isShow" />
            <ArrowDown v-else />
          </el-icon>
        </div>

        <!-- 右侧信息 -->
        <div class="left_base_info">
          <div class="left_base_info_name">{{ titleInfo?.name }}</div>
          <div
            @click="showProjectInfo"
            class="left_base_info_tips flex items-center cursor-pointer"
          >
            <div class="info_icon"></div>
            <span>基本信息</span>
          </div>
        </div>

        <!-- 基本信息 -->
        <div v-show="isShowProjectInfo" class="popup">
          <!-- title -->
          <div class="base_info_title flex items-center justify-between">
            <span>基本信息</span>
            <el-icon class="cursor-pointer"
              ><CircleCloseFilled color="rgba(0, 0, 0, 0.2)"
            /></el-icon>
          </div>

          <!-- 详细信息 -->
          <div v-click-outside="onClickOutside" class="info_list_box">
            <div class="list_item flex h-full">
              <div class="list_item_left h-full flex items-center">所属客户</div>
              <div class="list_item_right flex-1 flex box-border h-full items-center">
                {{ titleInfo?.customer }}
              </div>
            </div>

            <div class="list_item flex h-full">
              <div class="list_item_left h-full flex items-center">投运时长</div>
              <div class="list_item_right flex-1 flex box-border h-full items-center">
                {{ titleInfo?.time }}
              </div>
            </div>

            <div class="list_item flex h-full">
              <div class="list_item_left h-full flex items-center">投运时间</div>
              <div class="list_item_right flex-1 flex box-border h-full items-center">
                {{ titleInfo?.running_time }}
              </div>
            </div>

            <div class="list_item flex h-full">
              <div class="list_item_left h-full flex items-center">项目地址</div>
              <div class="list_item_right flex-1 flex box-border h-full items-center">
                {{ titleInfo?.addr }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right_info flex">
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">{{ titleInfo?.b_num }}</div>
          <div class="info_item_label">设备数量(台)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">{{ titleInfo?.error_num }}</div>
          <div class="info_item_label">异常设备(台)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">{{ titleInfo?.sum_profit }}</div>
          <div class="info_item_label">累计收益(元)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold">{{ titleInfo?.acc_charge }}</div>
          <div class="info_item_label">累计充电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center">
          <div class="info_item_value semi_bold">{{ titleInfo?.acc_discharge }}</div>
          <div class="info_item_label">累计放电量(kWh)</div>
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
    required: true,
  },
  isShow: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["onSelect"]);
const { showProjectInfo, isShowProjectInfo, showSelect, isShowSelect } = useHeader();
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
