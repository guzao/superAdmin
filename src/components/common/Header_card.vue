<template>
  <div class="header_card">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "../../styles/variable.scss";
.header_card {
  width: 100%;
  height: 6.9vh;
  background: $-g-white;
  margin-bottom: 1.5vh;
  border-radius: $-g-b-radius6;
}
</style>
