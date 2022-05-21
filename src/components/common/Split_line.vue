<template>
  <div class="_line"></div>
</template>

<style lang="scss" scoped>
@import "../../styles/variable.scss";
._line {
  position: absolute;
  height: 2vh;
  width: 1px;
  transform: scale(2);
  right: 0;
  background-color: $-g-black01;
  top: 50%;
  transform: translateY(-50%);
}
</style>
