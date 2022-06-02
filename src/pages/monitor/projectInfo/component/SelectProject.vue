<template>
  <transition name="el-zoom-in-top">
    <div v-show="isShow" class="selct_box">
      <!-- 顶部搜索 -->
      <div class="serach_box box-border flex h-full items-center">
        <!--  -->
        <span class="text-center"> 筛选 </span>

        <!-- 请输入项目名称 -->
        <el-input v-model="searchKey" style="width: 130px" placeholder="请输入项目名称" />

        <!--  -->
        <div class="button_action flex flex-1 justify-end">
          <resettingButton style="margin-right: 6px" @click="resetting">
            重置
          </resettingButton>
          <themeButton @click="serachProject"> 查询 </themeButton>
        </div>
      </div>

      <!-- 项目列表 -->
      <div class="project_list scrollbar">
        <!-- 每一个项目 -->
        <el-radio-group @change="checkedProject" v-model="checkedActive" class="w-full">
          <div
            v-for="item in projectDataList"
            :key="item.code"
            class="project_item flex items-center h-full flex-1"
          >
            <!-- 选择项目 -->
            <div class="left_select_box flex items-center justify-center">
              <el-radio :label="item.code" size="large"> <span></span> </el-radio>
            </div>

            <!-- 基本信息 -->
            <div
              class="item_info h-full flex items-center box-border flex-1 justify-between"
            >
              <!-- 项目名称 -->
              <div class="item_info_name">{{ item.name }}</div>

              <!-- 项目设备信息 -->
              <div class="item_info_right relative flex">
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.b_num }}</div>
                  <div class="info_item_label">设备数量(台)</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.err_num }}</div>
                  <div class="info_item_label">异常设备(台)</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.profit }}</div>
                  <div class="info_item_label">累计收益(元)</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center relative">
                  <div class="info_item_value semi_bold">{{ item.charge }}</div>
                  <div class="info_item_label">累计充电量(kWh)</div>
                  <SplitLine />
                </div>
                <div class="info_item text-center">
                  <div class="info_item_value semi_bold">{{ item.discharge }}</div>
                  <div class="info_item_label">累计放电量(kWh)</div>
                </div>
              </div>
            </div>
          </div>
        </el-radio-group>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, defineEmits } from "vue";
import { ProjectList } from "@/types";
import SplitLine from "@/components/common/Split_line.vue";
import resettingButton from "@/components/common/resettingButton.vue";
import themeButton from "@/components/common/themeButton.vue";

const searchKey = ref<string>("");
const emits = defineEmits(["resetting", "serachProject", "onCheckedProject"]);
defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  projectDataList: {
    type: Array as PropType<Array<ProjectList>>,
    required: true,
  },
  checkedActive: {
    type: String,
    required: true,
  },
});

/** 重置 */
const resetting = () => {
  searchKey.value = "";
  emits("resetting");
};
/** 查询项目 */
const serachProject = () => emits("serachProject", searchKey.value);

/** 选中项目事件 */
const checkedProject = (value: string) => emits("onCheckedProject", value);
</script>

<style lang="scss" scoped>
.selct_box {
  position: absolute;
  max-height: 45.5vh;
  width: 100%;
  background: #ffffff;
  top: 7.2vh;
  border-radius: 0 0 6px 6px;
  // 顶部搜索
  .serach_box {
    height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    & > span {
      width: 52px;
      font-size: 12px;
      font-weight: 600;
      color: #000000;
    }

    .button_action {
      margin-right: 10px;
    }
  }

  // 项目列表
  .project_list {
    max-height: 40vh;
    overflow-y: auto;

    // 每一个项目
    .project_item {
      height: 8vh;

      // 选择项目
      .left_select_box {
        width: 52px;
      }

      // 基本信息
      .item_info {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        // 项目名称
        .item_info_name {
          font-size: 13px;
          font-weight: 600;
          color: #000000;
        }

        // 项目设备信息
        .item_info_right {
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
              color: rgba(0, 0, 0, 0.5);
              height: 1.7vh;
            }
          }
        }
      }
    }
  }
}
</style>
