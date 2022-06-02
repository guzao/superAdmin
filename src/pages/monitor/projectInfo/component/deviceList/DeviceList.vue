<template>
  <div class="device_container box-border">
    <!-- 卡片 -->
    <div class="list box-border scrollbar">
      <DeviceCard
        :card-data="item"
        v-for="item in deviceData.deviceList"
        :key="item.id"
      />
    </div>

    <!-- page -->
    <div class="page_box flex items-center justify-between box-border">
      <div class="total_number">共{{ deviceData.total }}条数据</div>
      <el-pagination
        :page-sizes="[7, 20, 50, 100]"
        background
        layout=" prev, pager, next, sizes, jumper"
        :total="deviceData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="pagination.page"
        v-model:page-size="pagination.page_szie"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, reactive, defineEmits } from "vue";
import DeviceCard from "@/components/common/DeviceCard.vue";
import { DeviceDataList } from "@/types";
defineProps({
  deviceData: {
    type: Object as PropType<DeviceDataList>,
    required: true,
  },
});

const emeits = defineEmits(["handleSizeChange", "handleCurrentChange"]);

const pagination = reactive({
  page: 1,
  page_szie: 7,
});

const handleSizeChange = (szie: number) => emeits("handleSizeChange", pagination);

const handleCurrentChange = (szie: number) => emeits("handleCurrentChange", pagination);
</script>

<style scoped lang="scss">
.device_container {
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  // 设备列表 卡片
  .list {
    height: 56vh;
    padding-left: 20px;
    overflow-x: auto;
  }

  // 分页器
  .page_box {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    height: 5vh;
    padding-left: 20px;
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
