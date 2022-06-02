<template>
  <div class="monitor_card p-5">
    <div class="monitor-top flex">
      <div class="title">设备监控</div>
      <div :class="{'alarm-block': }" class="state-block">
        <div class="state-icon alarm" />
        <div :class="{'alarm-describe': isAlarm }" class="describe">设备告警</div>
      </div>
      <div class="state-block">
        <div class="state-icon on-line" />
        <div class="describe">设备在线</div>
      </div>
      <div class="state-block">
        <div class="state-icon door" />
        <div class="describe">柜门关闭</div>
      </div>
      <div class="state-block">
        <div class="state-icon charge" />
        <div class="describe">消防喷洒</div>
      </div>
      <div class="state-block">
        <div class="state-icon charge" />
        <div class="describe">设备报警</div>
      </div>
      <div class="state-block">
        <div class="state-icon air-conditioning" />
        <div class="describe">空调制冷</div>
      </div>
    </div>
    <div class="monitor-bottom flex justify-between">
      <div class="data-block">
        <div class="top semi_bold">90%</div>
        <div class="bottom">SOC</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">70%</div>
        <div class="bottom">SOH</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">220</div>
        <div class="bottom">直流电压(V)</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">36</div>
        <div class="bottom">直流电流(A)</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">0.12</div>
        <div class="bottom">气体检测(㎎/m³)</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">1326</div>
        <div class="bottom">有功功率(kW)</div>
      </div>
      <div class="data-block">
        <div class="top semi_bold">15</div>
        <div class="bottom">无功功率(kVA)</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  monitorInfo: {
    type: Object
  }
});
const isAlarm = computed(() => true);
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
.monitor_card {
  width: 100%;
  height: 19vh;
  background: $-g-white;
  margin-bottom: 1.5vh;
  border-radius: $-g-b-radius6;
  .monitor-top {
    margin-bottom: 10px;
    .title {
      font-size: 14px;
      font-weight: 600;
      color: black;
      line-height: 31px;
      margin-right: 5px;
    }
    .alarm-block {
      border-color: rgba(216, 34, 44, 0.3) !important;
    }
    .state-block {
      display: flex;
      padding: 0 7px;
      border-radius: 6px;
      border: 2px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
      margin: 0 5px;
      .state-icon {
        width: 15px;
        height: 15px;
        margin-top: 7px;
        margin-right: 7px;
      }
      .describe {
        font-size: 12px;
        color: black;
        line-height: 28px;
      }
      .alarm-describe {
        color: #d8222c !important;
      }
      .alarm {
        content: url(@/assets/svgs/alarm.svg);
      }
      .charge {
        content: url(@/assets/svgs/charge.svg);
      }
      .on-line {
        content: url(@/assets/svgs/onLine.svg);
      }
      .door {
        content: url(@/assets/svgs/door.svg);
      }
      .air-conditioning {
        content: url(@/assets/svgs/airConditioning.svg);
      }
    }
  }
  .monitor-bottom {
    .data-block {
      width: 120px;
      height: 64px;
      background: #ffffff;
      border: 2px solid rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
      text-align: center;
      line-height: 16px;
      padding-top: 15px;
      .top {
        font-size: 16px;
        font-weight: 600;
      }
      .bootom {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>
