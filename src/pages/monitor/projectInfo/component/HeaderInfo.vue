<template>
  <div class="app-contant">
    <!--  -->
    <div class="flex justify-between items-center h-full">
      <!-- 左侧 -->
      <div class="left_info flex items-center">
        <!-- 左侧icon -->
        <div class="left_icon flex justify-center items-center cursor-pointer">
          <el-icon><ArrowDown /></el-icon>
        </div>

        <!-- 右侧信息 -->
        <div class="left_base_info">
          <div class="left_base_info_name mb-1">上海浦江科技广场</div>
          <div class="left_base_info_tips flex items-center cursor-pointer">
            <div class="info_icon"></div>
            <span>基本信息</span>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right_info flex">
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold mb-1">33</div>
          <div class="info_item_label">设备数量(台)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative">
          <div class="info_item_value semi_bold mb-1">2</div>
          <div class="info_item_label">异常设备(台)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative mb-1">
          <div class="info_item_value semi_bold">120000</div>
          <div class="info_item_label">累计收益(元)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center relative mb-1">
          <div class="info_item_value semi_bold">5050</div>
          <div class="info_item_label">累计充电量(kWh)</div>
          <SplitLine />
        </div>
        <div class="info_item text-center mb-1">
          <div class="info_item_value semi_bold">3996</div>
          <div class="info_item_label">累计放电量(kWh)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import SplitLine from "@/components/common/Split_line.vue";
const props = defineProps({
  titleInfo: {
    type: Object,
    // required: true,
  },
});
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
</style>
