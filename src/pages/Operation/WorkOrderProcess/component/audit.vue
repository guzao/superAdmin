<template>
  <el-dialog v-model="dialogVisible" :show-close="false" width="523px" title="统计报表">
    <template #title="{ titleId }">
      <div class="my-header flex justify-between items-center">
        <div :id="titleId" class="dialog_tile">审核工单</div>
        <div @click="closeDialogVisible" class="dialog_close cursor-pointer"></div>
      </div>
    </template>
    <div class="dialog-body">
      <div class="basic">
        <el-form
          ref="ruleFormRef"
          :model="form"
          label-width="70px"
          class="order-form"
          label-position="left"
          size="small"
          status-icon
        >
          <el-form-item label="通过审核" prop="time">
            <el-radio-group v-model="form.state" class="custom-radio">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="form.state === '2'" label="分配给" prop="discoverer">
            <el-select v-model="form.discoverer" placeholder="请选择发现人员">
              <el-option
                v-for="item in discovererList"
                :key="item.id + 'discoverer'"
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
  id: "",
  time: "",
  state: "2",
  discoverer: "",
  type: "",
  product: "",
  place: "",
  describe: ""
});

// 发现人员数据
const discovererList = ref([{ id: 1, name: '1号' }, { id: 2, name: '2号' }])

// 工单类型数据
const typeList = ref([{ id: 1, name: '设备故障1' }, { id: 2, name: '设备故障2' }])

// 产品数据
const productList = ref([{ id: 1, name: '产品1' }, { id: 2, name: '产品2' }])

// 上传文件列表
const fileList = ref<UploadUserFile[]>([])

// 表单校验
const rules = reactive<FormRules>({
  time: [
    {
      type: 'date',
      required: true,
      message: '请选择发现时间',
      trigger: 'change',
    },
  ],
  discoverer: [
    {
      required: true,
      message: '请选择发现人',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择工单类型',
      trigger: 'change',
    },
  ],
  product: [
    {
      required: true,
      message: '请选择故障产品',
      trigger: 'change',
    },
  ],
  place: [
    { 
      required: true,
      message: '请输入故障位置',
      trigger: 'blur'
    },
  ],
  describe: [
    { 
      required: true,
      message: '请输入故障描述',
      trigger: 'blur'
    },
  ],
})
// ***  form表单 -end  ***

const submit = () =>{
  console.log('提交')
}

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
    margin-bottom: 10px;
    padding: 16px 11px;
    .custom-radio {
      height: 30px;
      :deep .el-radio__label {
        color: black !important;
        font-size: 12px;
      }
      :deep .el-radio {
        color: black !important;
        height: 30px;
      }
    }
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