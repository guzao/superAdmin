<template>
  <el-aside class="el-aside">
    <el-scrollbar>
      <el-menu
        active-text-color="rgb(216 34 44)"
        class="el-menu el-menu-vertical-demo"
        router
        :default-active="active"
        :collapse="IsCollapse"
      >
        <elMenuItemVue v-for="item in userMenu" :menuList="item" />
        <!-- 自定义折叠菜单栏按钮 -->
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import elMenuItemVue from "./el-menu-item.vue";
import { storeToRefs } from "pinia";
import { useUserData } from "@/stores";
const { getUserMenu: userMenu, getIsCollapse: IsCollapse } = storeToRefs(useUserData());
const route = useRoute();
const active = computed(() => route.path);
</script>

<style lang="scss">
@import "../../styles/variable.scss";
/* 重置 menu 背景色 */
.el-menu {
  background-color: transparent;
}
.el-menu--collapse {
  width: auto;
}
/* 折叠菜单栏样式 */
.el-menu--collapse .el-sub-menu__title,
.el-menu--collapse .el-menu-item {
  background: #fff;
  border-radius: 8px;
  margin-left: 16px;
  margin-bottom: 6px !important;
  margin-top: 0 !important;
  padding: 0 !important;
  justify-content: center;
  height: 4.5vh !important;
  width: 4.5vh !important;
}
.el-menu--collapse .el-sub-menu__title:hover {
  color: #fff;
  background-color: rgba(216, 34, 44, 0.7);
}
.el-menu--collapse .el-menu-item:hover {
  color: #fff;
  background-color: rgba(216, 34, 44, 0.7);
}
.el-menu--collapse .el-menu-item.is-active {
  background: $-g-main-color;
  color: #fff;
  border-radius: 8px;
  margin-left: 16px;
  padding: 0 !important;
  justify-content: center;
  margin-top: 0 !important;
  height: 4.5vh !important;
  width: 4.5vh !important;
}
/* 侧边栏收起后子级被选中父级的样式 */
.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
  background: $-g-main-color;
  color: #fff;
}

/* 展开菜单栏样式 */
// .el-sub-menu__title {
//   padding: 0 !important;
// }
// .el-menu .el-sub-menu__title,
// .el-menu .el-menu-item {
//   border-radius: 8px;
//   margin-bottom: 6px !important;
//   height: 40px !important;
//   margin-left: 11px !important;
// }
// .el-sub-menu__title .el-icon {
//   margin-left: 10px;
// }
// /* 侧边栏子级被选中父级的样式 */
// .el-menu .el-sub-menu.is-active > .el-sub-menu__title {
//   background: $-g-main-color;
//   color: #fff;
// }
</style>
<style lang="scss" scoped>
.el-aside {
  width: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: none;
}
</style>
