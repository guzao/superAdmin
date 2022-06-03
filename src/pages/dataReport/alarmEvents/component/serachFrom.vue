<template>
  <div class="search_action flex justify-between items-center h-full w-full box-border">
    <!-- 左侧 -->
    <div class="left items-center flex w-full">
      <div class="left_info">筛选</div>

      <!-- 右侧操作部分 -->
      <el-form
        :inline="true"
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        class="demo-form-inline flex-1"
      >
        <el-form-item label="项目" prop="code">
          <el-select
            style="width: 130px"
            v-model="form.code"
            placeholder="请选择项目名称"
          >
            <el-option
              v-for="item in userData.userProjectList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="告警等级" prop="code">
          <el-select style="width: 130px" v-model="form.lv" placeholder="请选择告警等级">
            <el-option
              v-for="item in alarmType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="start_time" label="日期范围">
          <el-date-picker
            style="width: 180px"
            v-model="form.start_time"
            type="datetime"
          />
          <span style="padding: 0 5px; color: #606266"> - </span>
          <el-date-picker style="width: 180px" v-model="form.end_time" type="datetime" />
        </el-form-item>

        <el-form-item style="float: right; margin-right: 9px">
          <resettingButton @click="onResetting" style="margin-right: 6px">
            重置
          </resettingButton>
          <themeButton style="margin-right: 6px" @click="search"> 查询 </themeButton>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref } from "vue";
import type { FormInstance } from "element-plus";
import resettingButton from "@/components/common/resettingButton.vue";
import themeButton from "@/components/common/themeButton.vue";
import { useUserData } from "@/stores";
import { FromModel } from "../data.dt";
const userData = useUserData();
defineProps({
  form: {
    type: Object as PropType<FromModel>,
    required: true,
  },
});
const alarmType = [
  { label: " 三级故障", value: 3 },
  { label: "二级故障", value: 2 },
  { label: "一级故障", value: 1 },
];
const rules = {
  code: [{ required: true, message: "请选择项目", trigger: "change" }],
  start_time: [{ required: true, message: "请选择时间", trigger: "blur" }],
};
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(["onSearch", "onResetting"]);
const search = () => {
  ruleFormRef.value?.validate().then((valid) => {
    if (valid) {
      emits("onSearch");
    }
  });
};
const onResetting = () => emits("onResetting");
</script>

<style lang="scss" scoped>
.search_action {
  padding-left: 22px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px 6px 0 0;
  .left_info {
    font-size: 12px;
    font-weight: 600;
    width: 30px;
    text-align: left;
    color: #000000;
    margin-right: 10px;
  }
}

.demo-form-inline {
  height: 33px !important;
  .el-form-item {
    margin-right: 16px !important;
  }
}
</style>
