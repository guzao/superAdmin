<template>
  <!-- 只有一个子级 -->
  <el-menu-item
    v-if="menuList.children && menuList.children.length == 1"
    :index="menuList.children[0].path"
  >
    <el-icon><DataAnalysis /></el-icon>
    <span>{{ menuList.meta.title }}</span>
  </el-menu-item>

  <!-- 没有子级 -->
  <el-menu-item v-else-if="!menuList.children" :index="menuList.path">
    <li class="flex flex-1 items-center">
      <i class="_point"></i>
      <span>{{ menuList.meta.title }}</span>
    </li>
  </el-menu-item>

  <!-- 多个子级 -->
  <el-sub-menu v-else :index="menuList.path">
    <template #title>
      <el-icon> <location /></el-icon>
      <span>{{ menuList.meta.title }}</span>
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
import { defineComponent, PropType } from "vue";
import { Menu as Setting, AlarmClock } from "@element-plus/icons-vue";
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
    return {
      Setting,
      AlarmClock,
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
}

.point_active_color {
  background-color: red;
}
.point_color {
  background: #333333;
}
</style>
