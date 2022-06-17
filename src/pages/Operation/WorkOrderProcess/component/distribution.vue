<template>
  <el-dialog v-model="dialogVisible" :show-close="false" width="523px" title="统计报表">
    <template #title="{ titleId }">
      <div class="my-header flex justify-between items-center">
        <div :id="titleId" class="dialog_tile">{{ form.id ? '编辑' : '创建'}}工单</div>
        <div @click="closeDialogVisible" class="dialog_close cursor-pointer"></div>
      </div>
    </template>
    <div class="dialog-body">
      <div class="basic">
        <el-form
          ref="ruleFormRef"
          :model="form"
          label-width="60px"
          label-position="left"
          class="order-form"
          size="small"
          status-icon
        >
          <el-form-item label="分配给" prop="people">
            <el-select v-model="form.people" placeholder="请选择人员">
              <el-option
                v-for="item in people"
                :key="item.id + 'people'"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="故障描述" prop="describe">
            <el-input v-model="form.describe" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dialog-foot flex items-center justify-end">
      <el-button class="cancel-button" @click="closeDialogVisible">取消</el-button>
      <el-button class="process-button" @click="submit">
        <div class="light" />提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue";
import type { FormInstance, FormRules } from 'element-plus'

// ***  显隐 -start  ***
const dialogVisible = ref(false);
const closeDialogVisible = () => {
  dialogVisible.value = false;
};
const showDialogVisible = () => {
  dialogVisible.value = true;
};
// ***  显隐 -end  ***

// ***  form表单 -start  ***
const ruleFormRef = ref<FormInstance>()

// 数据
const form = reactive({
  people: "",
  describe: ""
});

// 人员数据
const people = ref([{ id: 1, name: '1号' }, { id: 2, name: '2号' }])

// ***  form表单 -end  ***

defineExpose({
  showDialogVisible
});
</script>

<style  lang="scss" scoped>
.my-header {
  height: 45px;
}
.dialog-body {
  background-color: #f9f9f9;
  padding: 11px 17px;
  .basic {
    width: 490px;
    background-color: #fff;
    border-radius: 6px;
    padding: 16px 16px;
    .order-form {
      .el-form-item {
        height: 30px !important;
        line-height: 30px !important;
        :deep .el-input,
        .el-select {
          width: 100% !important;
        }
        :deep .el-input__inner {
          color: black;
        }
        :deep .el-form-item__label {
          color: #838383 !important;
        }
      }
    }
  }
}

.dialog-foot {
  width: 100%;
  height: 45px;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-right: 17px;
  .cancel-button {
    width: 80px;
    height: 30px;
    color: black;
    font-weight: 600;
  }
  .process-button {
    color: white;
    background-color: #d8222c;
    width: 80px;
    height: 30px;
    font-weight: 600;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    .light {
      width: 80px;
      height: 50px;
      right: 20px;
      bottom: 23px;
      position: absolute;
      z-index: 2;
      background-image: linear-gradient(
        to left,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
      transform: rotate(-40deg);
    }
  }
}
</style>