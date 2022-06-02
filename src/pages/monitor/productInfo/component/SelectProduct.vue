<template>
  <transition name="el-zoom-in-top">
    <div v-show="isShow" class="selct_box">
      <!-- 搜索 -->
      <div class="serach_box box-border flex h-full items-center">
        <!--  -->
        <span class="text-center"> 筛选 </span>

        <!-- 请输入项目名称 -->
        <el-select v-model="code" placeholder="请选择项目">
          <el-option
            v-for="item in userData.userProjectList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>

        <!-- 操作按钮 -->
        <div class="button_action flex flex-1 justify-end">
          <resettingButton style="margin-right: 6px"> 重置 </resettingButton>
          <themeButton @click="onSearchList"> 查询 </themeButton>
        </div>
      </div>

      <!-- 选择 -->
      <div class="product_list scrollbar flex">
        <!--  -->
        <div>
          <el-radio-group
            @change="onSelectProduct"
            v-model="checkedActive"
            class="w-full"
          >
            <div
              :key="item.id"
              v-for="item in deviceData.deviceList"
              class="product_list_item flex w-full"
            >
              <!-- 左侧 -->
              <div class="left_select_box flex items-center justify-center">
                <el-radio :label="item.order_num" size="large">
                  <span> </span>
                </el-radio>
              </div>
              <DeviceCard class="flex-1" :cardData="item" />
            </div>
          </el-radio-group>
        </div>
      </div>

      <!-- 分页 -->
      <div class="page_box flex items-center justify-between box-border">
        <div class="total_number">共{{ deviceData.total }}条数据</div>
        <el-pagination
          :page-sizes="[8, 20, 50, 100]"
          background
          layout="prev, pager, next, sizes, jumper"
          :total="deviceData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="pagination.page"
          v-model:page-size="pagination.page_szie"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, defineEmits, reactive } from "vue";
import { DeviceDataList } from "@/types";
import resettingButton from "@/components/common/resettingButton.vue";
import themeButton from "@/components/common/themeButton.vue";
import DeviceCard from "@/components/common/DeviceCard.vue";
import { useUserData } from "@/stores";
import { getUserCurrentProjectCode } from "@/utils";
const userData = useUserData();
defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  deviceData: {
    type: Object as PropType<DeviceDataList>,
    required: true,
  },
});
const checkedActive = ref<number>(1);
const emits = defineEmits([
  "onSelectProduct",
  "handleSizeChange",
  "handleCurrentChange",
  "onSearch",
]);
const code = ref<string>(getUserCurrentProjectCode());
const pagination = reactive({
  page: 1,
  page_szie: 8,
});
const onSelectProduct = (value: string | number) => emits("onSelectProduct", value);
const onSearchList = () => emits("onSearch", code.value);
const handleSizeChange = (szie: number) =>
  emits("handleSizeChange", pagination, code.value);
const handleCurrentChange = (szie: number) =>
  emits("handleCurrentChange", pagination, code.value);
</script>

<style lang="scss" scoped>
.selct_box {
  position: absolute;
  height: calc(100% - (18vh));
  width: 100%;
  background: #ffffff;
  top: 7.2vh;
  border-radius: 0 0 6px 6px;

  // 查询框
  .serach_box {
    height: 4.5vh;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-left: 20px;
    & > span {
      font-size: 12px;
      font-weight: 600;
      color: #000000;
      margin-right: 16px;
    }

    .button_action {
      margin-right: 10px;
    }
  }

  // 设备列表
  .product_list {
    height: 64vh;
    overflow-y: auto;
    .product_list_item {
      height: 8vh !important;
      .left_select_box {
        width: 50px;
      }
    }
  }

  // 分页器
  .page_box {
    height: 5vh;
    padding-left: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    // 总数文字
    .total_number {
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
