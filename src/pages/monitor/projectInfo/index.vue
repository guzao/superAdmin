<template>
  <div class="app-contant">
    <!-- 顶部信息 -->
    <Header_card>
      <HeaderInfo />
    </Header_card>

    <!-- 主题信息 -->
    <BodyCard style="padding: 13px 16px" class="box-border">
      <!-- 查看告警 设备列表 -->
      <BodyCardHeader />

      <!-- 项目连接图 -->
      <div class="line_map_box flex items-center w-full justify-around">
        <ConnectionDiagram />
      </div>
    </BodyCard>
  </div>
</template>

<script setup lang="ts">
import Header_card from "@/components/common/Header_card.vue";
import BodyCard from "@/components/common/Body_card.vue";
import HeaderInfo from "./component/HeaderInfo.vue";
import BodyCardHeader from "./component/BodyCardHeader.vue";
import ConnectionDiagram from "./component/ConnectionDiagram.vue";

import { useData } from "./useData";
import { onMounted } from "vue";
const { getMyProjectInfo } = useData();
onMounted(() => getMyProjectInfo({ code: "NJ02" }));
</script>

<style lang="scss" scoped>
// 项目连接图
.line_map_box {
  margin-top: 4vh;
}
</style>
