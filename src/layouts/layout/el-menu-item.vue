<template>
  <!-- 只有一个子级 -->
  <el-menu-item
    v-if="menuList.children && menuList.children.length == 1"
    :index="menuList.children[0].path"
    :style="
      !userData.isCollapse && currentPath == menuList.children[0].path
        ? 'background-color: rgba(216, 34, 44, 1);; color: #fff; padding-left: 0px;'
        : 'padding-left: 0px;'
    "
  >
    <!-- <el-icon><DataAnalysis /></el-icon> -->
    <svg-icon
      :icon-class="
        currentPath == menuList.children[0].path
          ? menuList.meta.icon + '-white'
          : menuList.meta.icon
      "
      style="width: 14px; height: 14px; margin: 10px"
    ></svg-icon>
    <span style="height: 36px; line-height: 36px; font-weight: 500">{{
      menuList.meta.title
    }}</span>
  </el-menu-item>

  <!-- 没有子级 -->
  <el-menu-item
    style="min-width: 140px; padding: 20px"
    v-else-if="!menuList.children"
    :index="menuList.path"
  >
    <li style="height: 36px; line-height: 36px" class="flex flex-1 items-center">
      <i
        class="_point"
        :class="currentPath == menuList.path ? 'point_active_color' : ' '"
      ></i>
      <span style="font-weight: 500">{{ menuList.meta.title }}</span>
    </li>
  </el-menu-item>

  <!-- 多个子级 -->
  <el-sub-menu style v-else :index="menuList.path">
    <template #title>
      <svg-icon
        :icon-class="
          currentPath.includes(menuList.path)
            ? menuList.meta.icon + '-white'
            : menuList.meta.icon
        "
        style="width: 14px; height: 14px; margin: 10px"
      ></svg-icon>
      <span style="height: 36px; line-height: 36px; font-weight: 500">{{
        menuList.meta.title
      }}</span>
    </template>
    <elMenuItemVue
      v-for="(sunItem, index) in menuList.children"
      :key="index"
      :menuList="sunItem"
    />
  </el-sub-menu>
</template>

<script lang="ts">
import { MenuType } from "@/types";
import type { RouteRecordRaw } from "vue-router";
import { defineComponent, PropType, computed } from "vue";
import { useRoute } from "vue-router";
import { useUserData } from "@/stores";
export default defineComponent({
  name: "elMenuItemVue",
  props: {
    menuList: {
      type: Object as PropType<MenuType | RouteRecordRaw>,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.path);
    const userData = useUserData();
    return {
      gh: 90,
      currentPath,
      userData,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variable.scss";
._point {
  display: inline-block;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: rgba(51, 51, 51, 1);
  margin-right: 16px;
}
.point_active_color {
  background-color: rgba(216, 34, 44, 1);
}
.point_color {
  background: #333333;
}
</style>
