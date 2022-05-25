<template>
  <div class="body_card">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "../../styles/variable.scss";
.body_card {
  height: calc(100% - (6.9vh + 1.5vh));
  background: $-g-white;
  border-radius: $-g-b-radius6;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
}
</style>
