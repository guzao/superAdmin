<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="523px"
    title="统计报表"
  >
    <template #title="{ titleId }">
      <div class="my-header flex justify-between items-center">
        <div :id="titleId" class="dialog_tile">{{ form.id ? '编辑' : '创建'}}工单</div>
        <div @click="closeDialogVisible" class="dialog_close cursor-pointer"></div>
      </div>
    </template>
    <div class="dialog-body">
      <div class="steps-box flex items-center justify-center">
        <el-steps :active="active" align-center class="custom-steps">
          <el-step title="开始处理" />
          <el-step title="上传结果" />
          <el-step title="提交" />
        </el-steps>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="70px"
        class="order-form"
        size="small"
        status-icon
      >
        <div v-show="active === 0" class="begin">
          <div class="radio-chunk">
            <el-form-item label="处理状况" prop="state" class="no-rules">
              <el-radio-group v-model="form.state" class="custom-radio">
                <el-radio label="1" size="large">已完成</el-radio>
                <el-radio label="2" size="large">无法解决</el-radio>
                <el-radio label="3" size="large">废弃工单</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="basic">
            <div class="title">工单详情</div>
            <div class="content flex">
              <div class="flex-grow">
                <div>工单状态：处理中</div>
                <div>工单编号：GD220426-01</div>
                <div>工单类型：设备故障</div>
                <div>创建人：李四</div>
                <div>创建时间：2022-03-05 09:45:08</div>
              </div>
              <div class="flex-grow">
                <div>故障位置：上海浦江科技广场xxx楼xxx层xxx室</div>
                <div>故障描述：充电过程中，温度异常</div>
                <div class="flex">
                  附件信息：
                  <div class="flex">
                    <div
                      v-for="(item,index) in detailObject.enclosure"
                      :key="'enclosure' + index"
                      class="flex"
                    >
                      <el-icon
                        style="width:16px;height:16px;margin-right: 5px;"
                        color="#00aaff"
                        class="no-inherit link-icon"
                      >
                        <Paperclip style="width:16px;height:16px" />
                      </el-icon>
                      <div class="link-name" style="margin-right: 20px">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="active === 1" class="begin">
          <div class="basic">
            <el-form-item label="故障描述" prop="describe" class="textarea-item">
              <el-input v-model="form.describe" type="textarea" />
            </el-form-item>
          </div>

          <div class="enclosure flex">
            <div class="upload-title flex items-center">附件上传</div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="fileList"
            >
              <el-button class="upload-button">
                <el-icon style="width:16px;height:16px" class="el-icon--left">
                  <UploadFilled style="width:16px;height:16px" />
                </el-icon>选择文件
              </el-button>
              <template #tip>
                <span class="upload-tip">支持扩展名：pdf\jpg</span>
              </template>
            </el-upload>
          </div>
        </div>

        <div v-show="active === 2" class="begin">
          <div class="basic" style="padding-bottom:1px;padding-top:18px">
            <el-form-item label="我需要" prop="type">
              <el-select v-model="form.type" placeholder="请选择工单类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.id + 'type'"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="移交给" prop="discoverer">
              <el-select v-model="form.discoverer" placeholder="请选择发现人员">
                <el-option
                  v-for="item in discovererList"
                  :key="item.id + 'discoverer'"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-foot flex items-center justify-end">
      <el-button class="cancel-button" @click="closeDialogVisible">取消</el-button>
      <el-button v-show="active !== 0" class="cancel-button" @click="back">上一步</el-button>
      <el-button v-show="active !== 2" class="process-button" @click="next">
        <div class="light" />下一步
      </el-button>
      <el-button v-show="active === 2" class="process-button" @click="submit">
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

// 步骤条
const active = ref(0)
// 上一步
const back = () =>{
  active.value--
}
// 下一步
const next = () =>{
  active.value++
}
// 提交
const submit = () =>{
  console.log('提交')
}

// ***  form表单 -start  ***
const ruleFormRef = ref<FormInstance>()


const detailObject = ref({
  workOrderNo: "GD220426-01",
  state: "处理中",
  orderType: "设备故障",
  faultyProduct: "产品001",
  processPeople: "-",
  abortSituation: "03区机库车间501室设备温度异常",
  enclosure: [
    { name: "故障01.pdf", path: "故障01.pdf" },
    { name: "故障02.pdf", path: "故障02.pdf" }
  ]
});
// 数据
const form = reactive({
  id: "",
  state: '1',
  describe: '',
  type: '',
  discoverer: '',
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
  padding: 16px 17px;
  .steps-box {
    height: 86px;
    width: 100%;
    .custom-steps {
      width: 331px;
      height: 39px;
      :deep .el-step__title {
        font-size: 12px;
        color: #7d7d7d;
      }
      :deep .is-process {
        color: black !important;
        .el-step__icon {
          background-color: #d8222c !important;
        }
      }
      :deep .is-finish {
        .el-step__icon {
          background-color: #d8222c !important;
        }
        .el-step__line {
          background-color: #d8222c !important;
        }
      }
      :deep .el-step__main {
        position: relative;
        bottom: 48px;
      }
      :deep .el-step__head {
        position: relative;
        top: 10px;
      }
      :deep .el-step__icon-inner {
        display: none;
      }
      :deep .el-step__line {
        background-color: #dfdfdf;
      }
      :deep .el-step__icon {
        position: relative;
        top: 4px;
        width: 10px;
        height: 10px;
        border: none;
        background-color: #cccccc;
      }
    }
  }
  .order-form {
    .no-rules {
      margin-bottom: 0px;
    }
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
        height: 30px !important;
        line-height: 30px !important;
        color: #838383 !important;
      }
    }
    .textarea-item {
      height: 55px !important;
    }
    .begin {
      .radio-chunk {
        width: 490px;
        background-color: #fff;
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 3px 11px;
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
      }
      .basic {
        width: 490px;
        background-color: #fff;
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 14px 10px;
        .title {
          color: black;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .content {
          color: #9c9c9c;
          line-height: 24px;
          .link-icon {
            position: relative;
            top: 4px;
          }
          .link-name {
            color: #00aaff;
            text-decoration: underline;
          }
        }
      }

      .enclosure {
        width: 490px;
        padding: 10px 15px;
        border-radius: 6px;
        background-color: #fff;
        .upload-button {
          width: 100px;
          height: 30px;
          border-radius: 6px;
        }
        .upload-title {
          color: #838383;
          margin-right: 10px;
        }
        .upload-tip {
          margin-left: 15px;
          color: #838383;
          position: relative;
          bottom: 4px;
        }
        .upload-demo {
          :deep .el-upload-list {
            margin: 0 !important;
          }
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