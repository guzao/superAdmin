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
        <el-form-item label="统计维度">
          <el-select
            style="width: 130px"
            @change="typeChange"
            v-model="form.type"
            placeholder="请选择项目"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="start_time" label="日期范围">
          <!-- 日 -->
          <el-date-picker
            v-if="form.type === 1"
            style="width: 130px"
            v-model="form.start_time"
            type="date"
          />
          <span style="padding: 0 5px" v-if="form.type === 1"> - </span>
          <el-date-picker
            v-if="form.type === 1"
            style="width: 130px"
            v-model="form.end_time"
            type="date"
          />

          <!-- 月 -->
          <el-date-picker
            v-if="form.type === 2"
            style="width: 130px"
            v-model="form.start_time"
            type="month"
          />
          <span style="padding: 0 5px" v-if="form.type === 2"> - </span>
          <el-date-picker
            v-if="form.type === 2"
            style="width: 130px"
            v-model="form.end_time"
            type="month"
          />

          <!-- 年 -->
          <el-date-picker
            v-if="form.type === 3"
            style="width: 130px"
            v-model="form.start_time"
            type="year"
          />
          <span style="padding: 0 5px" v-if="form.type === 3"> - </span>
          <el-date-picker
            v-if="form.type === 3"
            style="width: 130px"
            v-model="form.end_time"
            type="year"
          />
        </el-form-item>

        <el-form-item style="float: right; margin-right: 9px">
          <resettingButton @click="reseting" style="margin-right: 6px">
            重置
          </resettingButton>
          <themeButton style="margin-right: 6px" @click="search"> 查询 </themeButton>
          <div @click="download" class="download flex items-center cursor-pointer">
            <el-icon class="el-icon--right"><Download /></el-icon>
            <span class="downlod_text"> 下载账单 </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import { Download } from "@element-plus/icons-vue";
import resettingButton from "@/components/common/resettingButton.vue";
import themeButton from "@/components/common/themeButton.vue";
import { FormType } from "../data.dt";
import { useUserData } from "@/stores";
const userData = useUserData();
defineProps({
  form: {
    type: Object as PropType<FormType>,
    required: true,
  },
});
const rules = {
  code: [{ required: true, message: "请选择项目", trigger: "change" }],
  start_time: [{ required: true, message: "请选择时间", trigger: "blur" }],
};
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(["onSearch", "typeChange", "reseting", "download"]);
const search = () => {
  ruleFormRef.value?.validate().then((valid) => {
    if (valid) {
      emits("onSearch");
    }
  });
};
// 类别 1 日 2月 3年
const typeList = [
  { label: "日", id: 1 },
  { label: "月", id: 2 },
  { label: "年", id: 3 },
];
const typeChange = (value: number) => emits("typeChange", value);
const reseting = () => emits("reseting");
const download = () => emits("download");
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

  .downlod_text {
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    color: #d8222c;
  }
}

.demo-form-inline {
  height: 33px !important;
  .el-form-item {
    margin-right: 16px !important;
  }
}
</style>
