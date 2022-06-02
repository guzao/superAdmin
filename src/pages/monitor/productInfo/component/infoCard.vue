<template>
  <div class="info_car_box flex box-border justify-between">
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.soc }}</div>
      <div class="info_card_label">SOC</div>
    </div>
    <div
      class="info_card box-border flex flex-col items-center justify-center info_card_soh"
    >
      <div class="info_card_value semi_bold">{{ cardData?.soh }}</div>
      <div class="info_card_label">SOH</div>
    </div>
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.volt }}</div>
      <div class="info_card_label">直流电压({{ cardData?.voltSignal }})</div>
    </div>
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.current }}</div>
      <div class="info_card_label">直流电流({{ cardData?.currentSignal }})</div>
    </div>
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.concentration }}</div>
      <div class="info_card_label">气体监测({{ cardData?.concentrationSignal }})</div>
    </div>
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.activePower }}</div>
      <div class="info_card_label">有功功率({{ cardData?.activePowerSignal }})</div>
    </div>
    <div class="info_card box-border flex flex-col items-center justify-center">
      <div class="info_card_value semi_bold">{{ cardData?.reactivePower }}</div>
      <div class="info_card_label">无功功率({{ cardData?.reactivePowerSignal }})</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { DeviceList } from "@/types";
defineProps({
  cardData: {
    type: Object as PropType<DeviceList | null>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.info_car_box {
  padding: 0 11px;
  .info_card {
    flex: 1;
    margin: 0 5px;
    height: 6.4vh;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
    .info_card_value {
      font-size: 16px;
      text-align: center;
      color: #000000;
    }

    .info_card_label {
      font-size: 12px;
      font-weight: 400;
      color: #000000;
    }
  }

  .info_card_soh {
    border: 1px solid rgba(255, 155, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);

    .info_card_value,
    .info_card_label {
      color: rgba(255, 155, 0, 1);
    }
  }
}
</style>
