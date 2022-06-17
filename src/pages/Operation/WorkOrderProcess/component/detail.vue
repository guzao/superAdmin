<template>
  <div v-show="detailVisible">
    <div class="detial-header my-header flex justify-between items-center">
      <div class="dialog_tile">工单号：{{ detailObject.workOrderNo }}</div>
      <div @click="closeDetialDialog" class="dialog_close cursor-pointer"></div>
    </div>
    <div class="order-info flex justify-between items-center">
      <div class="info-box">
        <div class="top-info flex justify-start">
          <div class="interval">工单状态：{{ detailObject.state }}</div>
          <div class="interval">工单类型：{{ detailObject.orderType }}</div>
          <div class="interval">故障产品：{{ detailObject.faultyProduct }}</div>
          <div class="interval">当前处理人员：{{ detailObject.processPeople }}</div>
        </div>
        <div class="bottom-info flex justify-start">
          <div class="interval">故障位置：{{ detailObject.abortSituation }}</div>
        </div>
      </div>
      <div>
        <el-button class="process-button" @click="toProcess">
          <div class="light" />去处理
        </el-button>
      </div>
    </div>
    <div class="detial-content">
      <div class="button-group flex items-center justify-start">
        <div :class="{'pitch-on':pitchOn}" class="button flex-1" @click="pitchOn = true">工单详情</div>
        <div :class="{'pitch-on':!pitchOn}" class="button flex-1" @click="pitchOn = false">生命周期</div>
      </div>

      <!-- 基本信息 -->
      <div v-show="pitchOn" class="basic-box">
        <div class="basic">
          <div class="basic-title-box flex">
            <div class="icon" />
            <div class="text">基本信息</div>
          </div>
          <div class="table flex">
            <div class="row flex">
              <div class="label" style="border-top-left-radius: 6px;">故障描述</div>
              <div
                class="value flex-grow"
                style="border-top-right-radius: 6px;"
              >充放电过程中，温度异常，增温过快，导致设备超负荷报警</div>
            </div>
            <div class="row center-border flex">
              <div class="flex-1 flex">
                <div class="label">发现人员</div>
                <div class="value flex-grow">李伟</div>
              </div>
              <div class="flex-1 flex">
                <div class="label">发现时间</div>
                <div class="value flex-grow">2022-03-05 09:45:08</div>
              </div>
              <div class="flex-1 flex">
                <div class="label">工单创建人</div>
                <div class="value flex-grow">李飞</div>
              </div>
            </div>
            <div class="row flex">
              <div class="flex-1 flex">
                <div class="label" style="border-bottom-left-radius: 6px;">创建时间</div>
                <div class="value flex-grow">2022-03-05 09:45:08</div>
              </div>
              <div class="flex-1 flex">
                <div class="label">关闭人员</div>
                <div class="value flex-grow">-</div>
              </div>
              <div class="flex-1 flex">
                <div class="label">关闭时间</div>
                <div class="value flex-grow" style="border-bottom-right-radius: 6px;">-</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 附件信息 -->
        <div class="enclosure">
          <div class="basic-title-box flex">
            <div class="icon" />
            <div class="text">附件信息</div>
          </div>
          <div class="flex">
            <div
              v-for="(item,index) in detailObject.enclosure"
              :key="'enclosure' + index"
              class="flex"
            >
              <el-icon
                style="width:16px;height:16px;margin-right: 5px;"
                color="#00aaff"
                class="no-inherit"
              >
                <Paperclip style="width:16px;height:16px" />
              </el-icon>
              <div class="link-name" style="margin-right: 20px">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生命周期 -->
      <div v-show="!pitchOn" class="steps-bar">
        <div
          v-for="(item,index) in detailObject.steps"
          :key="'steps' + index"
          :class="{'long-heihgt': item.type === 1}"
          class="step flex"
        >
          <div class="step-left move-up">{{ item.title }}</div>
          <div
            :class="{'step-over': item.over, 'last': index === detailObject.steps.length - 1}"
            class="step-right"
          >
            <div :class="{'dot-over': item.over}" class="dot" />
            <div class="move-up">
              <div v-if="item.result">审核结果：{{item.result}}</div>
              <div v-if="item.remark">备注说明：{{item.remark}}</div>
              <div v-if="item.title === '指派工单'">指派给{{ item.appoint }}：{{item.doIt}}</div>
              <div class="grey">操作人：{{item.operator}}</div>
              <div class="grey">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <handleOrder ref="handleRef" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineExpose, ref, PropType } from "vue";
import { time } from "echarts";
import handleOrder from "./handle";

// ***  显隐 -start  ***
const detailVisible = ref(false);
const closeDetialDialog = () => {
  detailVisible.value = false;
};
const showDetialDialog = () => {
  detailVisible.value = true;
};
// ***  显隐 -end  ***

//  工单数据
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
  ],
  // type控制步骤条的长短
  steps: [
    {
      type: 0,
      over: true,
      title: "关闭工单",
      operator: "张三",
      time: "2022-03-05 09:45"
    },
    {
      type: 1,
      over: false,
      title: "上传工单审核结果",
      result: "审核通过",
      remark: "故障问题已解决",
      operator: "张三",
      time: "2022-03-05 09:45"
    },
    {
      type: 1,
      over: false,
      title: "上传工单审核结果",
      result: "审核通过",
      remark: "故障问题已解决",
      operator: "张三",
      time: "2022-03-05 09:45"
    },
    {
      type: 1,
      over: false,
      title: "指派工单",
      appoint: "张三",
      doIt: "去审核",
      operator: "张三",
      time: "2022-03-05 09:45"
    },
    {
      type: 1,
      over: false,
      title: "上传工单审核结果",
      result: "审核通过",
      remark: "故障问题已解决",
      operator: "张三",
      time: "2022-03-05 09:45"
    }
  ]
});

// 工单详情or生命周期
const pitchOn = ref(true);

// 去处理
const handleRef = ref();
const toProcess = () => {
  handleRef.value.showDialogVisible();
};

defineExpose({
  showDetialDialog
});
</script>
<style lang="scss" scoped>
.detial-header {
  height: 45px;
  padding: 14px 21px;
  border-bottom: 1px solid #f2f2f2;
}

.order-info {
  height: 80px;
  padding: 14px 21px;
  border-bottom: 1px solid #f2f2f2;
  .top-info {
    margin-bottom: 12px;
  }
  .interval {
    margin-right: 60px;
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

.detial-content {
  padding: 18px;
  .button-group {
    width: 230px;
    height: 35px;
    border-radius: 6px;
    padding: 0 2px;
    background-color: #f2f2f2;
    margin-bottom: 20px;
    .button {
      cursor: pointer;
      font-weight: 600;
      border-radius: 6px;
      text-align: center;
      line-height: 30px;
      height: 30px;
    }
    .pitch-on {
      background-color: #fff;
      box-shadow: 0 0 10px #f2f2f2;
    }
  }

  .basic-box {
    .basic-title-box {
      height: 17px;
      margin-bottom: 12px;
      border-top-left-radius: 6px;
      .icon {
        width: 3px;
        height: 17px;
        background-color: #d8222c;
        margin-right: 6px;
      }
      .text {
        color: #808080;
        line-height: 17px;
      }
    }
    .basic {
      margin-bottom: 20px;
      .table {
        width: 100%;
        height: 150px;
        border: 1px solid #e4e4e4;
        background-color: #e4e4e4;
        border-radius: 6px;
        .row {
          height: 50px;
          line-height: 50px;
          position: relative;
          bottom: 0.25px;
          .label {
            width: 100px;
            text-align: center;
            color: #808080;
            border: 1px solid #e4e4e4;
            background-color: #f2f2f2;
          }
          .value {
            padding: 0px 24px;
            font-weight: 500;
            line-height: 50px;
            background-color: #fff;
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
    .enclosure {
      .link-name {
        color: #00aaff;
        text-decoration: underline;
      }
    }
  }
  .steps-bar {
    padding: 20px;
    overflow: auto;
    width: 100%;
    height: 61.5vh;
    border-radius: 6px;
    background-color: #f2f2f2;
    .step {
      height: 88px;
      .move-up {
        position: relative;
        top: -8px;
      }
      .step-left {
        width: 100px;
        margin-right: 24px;
        text-align: right;
      }
      .last {
        border-left: 0px solid #d8222c !important;
        .dot {
          left: -4px !important;
        }
      }
      .step-right {
        padding-left: 24px;
        position: relative;
        border-left: 3px solid #dadada;
        .dot {
          position: absolute;
          top: -5px;
          left: -7px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #cccccc;
        }
        .grey {
          color: #7b7b7b;
        }
      }
      .step-over {
        border-left: 3px solid #d8222c !important;
        .dot-over {
          background-color: #d8222c !important;
        }
      }
    }
    .long-heihgt {
      height: 134px !important;
    }
  }
}
</style>