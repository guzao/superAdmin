<template>
  <div
    @click="onClick"
    class="theme_button box-border flex items-center cursor-pointer select-none relative"
  >
    <div class="left_bgc"></div>
    <div class="text">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emeits = defineEmits(["click"]);
const onClick = () => emeits("click");
</script>

<style lang="scss" scoped>
.theme_button {
  width: 80px;
  height: 30px;
  background: #d8222c;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  .left_bgc {
    width: 44px;
    height: 30px;
    opacity: 0.4;
    background: linear-gradient(280deg, rgba(255, 255, 255, 0) 24%, #ffffff 97%);
  }

  .text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
