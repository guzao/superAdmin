<template>
  <div @click="() => emeits('click')" class="resetting_button box-border flex items-center justify-center cursor-pointer select-none">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const emeits = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.resetting_button {
  width: 80px;
  height: 30px;
  background: #ffffff;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.10);
  border-radius: 4px;
}

</style>
