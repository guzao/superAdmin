<template>
  <el-aside class="el-aside">
    <el-scrollbar>
      <!-- router -->
      <el-menu
        active-text-color="rgb(216 34 44)"
        class="el-menu el-menu-vertical-demo"
        :default-active="active"
        router
        :collapse="IsCollapse"
      >
        <elMenuItemVue v-for="item in userMenu" :menuList="item" />
        <!-- 自定义折叠菜单栏按钮 -->
        <div
          @click="setIsCollapse"
          :class="menuCloseClassName"
          class="items-center flex cursor-pointer"
        >
          <el-icon><Expand /></el-icon>
          <span v-if="!IsCollapse" class="action_text"> 收起菜单 </span>
        </div>
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
const { setIsCollapse } = useUserData();
const route = useRoute();
const active = computed(() => route.path);
const menuCloseClassName = computed(() =>
  IsCollapse.value ? "menu_close_action_collapse" : "menu_close_action"
);
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
.menu_close_action_collapse,
.el-menu--collapse .el-sub-menu__title,
.el-menu--collapse .el-menu-item {
  background: #fff;
  border-radius: 6px;
  margin-bottom: 6px !important;
  margin-top: 0 !important;
  padding: 0 !important;
  justify-content: center;
  height: 36px !important;
  width: 36px !important;
}

.menu_close_action {
  height: 40px;
  color: #000 !important;
  border-radius: 6px !important;
  margin-left: 16px;
}
.action_text {
  padding-left: 10px;
  box-sizing: border-box;
}

.menu_close_action_collapse:hover,
.el-menu--collapse .el-menu-item:hover,
.el-menu--collapse .el-sub-menu__title:hover {
  color: #fff;
  background-color: rgba(216, 34, 44, 0.7);
}

.el-menu--collapse .el-menu-item.is-active {
  background: $-g-main-color;
  color: #fff;
  border-radius: 6px;
  padding: 0 !important;
  justify-content: center;
  margin-top: 0 !important;
  height: 36px !important;
  width: 36px !important;
}

/* 侧边栏收起后子级被选中父级的样式 */
.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
  background: $-g-main-color;
  color: #fff;
}

//===============
/* 展开菜单栏样式 */
// .el-sub-menu__title {
//   padding: 0 !important;
// }
// .el-menu .el-sub-menu__title,
// .el-menu .el-menu-item {
//   border-radius: 6px;
//   margin-bottom: 6px !important;
//   height: 36px !important;
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
  background-image: url(https://img02.mockplus.cn/idoc/sketch/2022-05-20/61cb004d-b8e7-4660-92d7-e18d1ea5015d.png!thumb-p-25);
  background-position: bottom;
  background-repeat: no-repeat;
  width: auto;
  padding-left: 16px;
  box-sizing: border-box;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 174px;
}
.el-menu {
  border-right: none;
}
</style>
