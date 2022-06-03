<template>
  <div class="alarm_container box-border">
    <!-- 搜索 -->
    <!-- 顶部搜索 -->
    <div class="serach_box box-border flex h-full items-center">
      <!--  -->
      <span class="text-center"> 筛选 </span>

      <!-- 请输入项目名称 -->
      <el-select v-model="lv" placeholder="请选择告警等级">
        <el-option
          v-for="item in alarmType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 操作按钮 -->
      <div class="button_action flex flex-1 justify-end">
        <resettingButton style="margin-right: 6px" @click="resetting">
          重置
        </resettingButton>
        <themeButton @click="serachAlarmList"> 查询 </themeButton>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table_box box-border">
      <el-table height="59vh" :data="alarmData.alarmList" stripe style="width: 100%">
        <el-table-column prop="name" label="告警名称" />
        <el-table-column prop="lv" label="告警等级">
          <template #default="scope">
            <AlarmTypeTag :text="scope.row.lv" />
          </template>
        </el-table-column>
        <el-table-column sortable prop="start" label="告警开始时间" />
        <el-table-column sortable prop="last" label="告警持续时长" />
      </el-table>
    </div>

    <!-- page -->
    <div class="page_box flex items-center justify-between box-border">
      <div class="total_number">共{{ alarmData.total }}条数据</div>
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="prev, pager, next, sizes, jumper"
        :total="alarmData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="pagination.page"
        v-model:page-size="pagination.page_szie"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, reactive, defineEmits } from "vue";
import { AlarmDataModel } from "@/types";
import resettingButton from "@/components/common/resettingButton.vue";
import themeButton from "@/components/common/themeButton.vue";
import AlarmTypeTag from "@/components/common/AlarmTypeTag.vue";
defineProps({
  alarmData: {
    type: Object as PropType<AlarmDataModel>,
    required: true,
  },
});
const emeits = defineEmits([
  "handleSizeChange",
  "handleCurrentChange",
  "serachAlarmList",
]);
const pagination = reactive({
  page: 1,
  page_szie: 10,
});
const lv = ref<string>("");
const alarmType = [
  { label: " 三级故障", value: 3 },
  { label: "二级故障", value: 2 },
  { label: "一级故障", value: 1 },
];
const handleSizeChange = (szie: number) => {
  initParams();
  emeits("handleSizeChange", pagination, lv.value);
};
const handleCurrentChange = (szie: number) => {
  emeits("handleCurrentChange", pagination, lv.value);
};

const serachAlarmList = () => {
  initParams();
  emeits("serachAlarmList", pagination, lv.value);
};

const resetting = () => {
  lv.value = "";
  initParams();
  emeits("serachAlarmList", pagination, lv.value);
};
const initParams = () => {
  pagination.page = 1;
  pagination.page_szie = 10;
};
</script>

<style scoped lang="scss">
.alarm_container {
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .serach_box {
    height: 45px;
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

  //
  .table_box {
    padding: 1vh 9px 0 9px;
    height: 60vh;
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
