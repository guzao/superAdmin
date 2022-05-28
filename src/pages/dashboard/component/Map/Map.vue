<template>
  <div class="map_box">
    <div v-loading="mapLoading" id="container"></div>

    <!-- 右侧顶部  返回上一级-->
    <div
      @click="mapZoomLevelGoback"
      class="goback_zoom_button flex justify-center items-center cursor-pointer"
    >
      <el-icon><ArrowLeftBold /></el-icon>
    </div>

    <!-- 右侧底部缩放按钮 -->
    <div class="zoom_box cursor-pointer select-none">
      <div
        @click="mapZoomAction('+')"
        class="zoom_button flex justify-center items-center"
      >
        +
      </div>
      <div
        @click="mapZoomAction('-')"
        class="zoom_button zoom_button_minus flex justify-center items-center"
      >
        <el-icon><Minus /></el-icon>
      </div>
    </div>

    <!-- 查询 -->

    <SearchBox />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import SearchBox from "./SearchBox.vue";
import { GDMap, useMapData } from "./Map";
const AMap = window?.AMap;
let Map: GDMap;
const { markerPointList, getOverview, mapLoading } = useMapData();

/** 初始化地图  */
function initMap(container: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    Map = new GDMap(
      new AMap.Map(container, {
        zoom: 4.8,
        mapStyle: "amap://styles/whitesmoke",
        features: ["bg", "point", "road"],
        center: [107.325777, 37.532983],
      })
    );
    Map.gdMapOnMounted().then((res) => {
      mapLoading.value = false;
    });
    resolve(Map);
  });
}

/** 地图缩放操作 */
const mapZoomAction = (type: string) => Map.gdMapZoomAction(type);
const mapZoomLevelGoback = () => Map.mapZoomLevelGoback();

onMounted(async () => {
  await initMap("container");
  await getOverview();
  Map.addMarkPoints(markerPointList);
});
onBeforeUnmount(() => {
  Map.destroy();
});
</script>

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";
.map_box {
  height: calc(100% - (6.9vh + 1.5vh));
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
  position: relative;
  #container {
    height: 100%;
    border-radius: $-g-b-radius6;
  }

  .zoom_box,
  .goback_zoom_button {
    position: absolute;
    right: 0;
    bottom: 18px;
    width: 34px;
    height: 68px;
    background: #ffffff;
    right: 16px;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

    .zoom_button {
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      width: 34px;
      height: 34px;
      font-size: 20px;
      color: rgb(102, 102, 102);
    }
    .zoom_button_minus {
      font-size: 20px;
    }
  }

  .goback_zoom_button {
    top: 16px;
    left: 15px;
    width: 34px;
    height: 34px;
    color: rgb(229, 229, 229);
    &:hover {
      color: rgba(34, 34, 34, 1);
      box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.02);
    }
  }
}
</style>
