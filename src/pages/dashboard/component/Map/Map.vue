<template>
  <div v-loading="mapLoading" id="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { GDMap, useMapData } from "./Map";
const { markerPointList, getOverview, mapLoading } = useMapData();
const AMap = window?.AMap;
let Map: GDMap;

/** 初始化地图 */
function initMap(container: string): void {
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
}

onMounted(() => {
  initMap("container");
});

onBeforeUnmount(() => {
  Map.destroy();
});
</script>

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";
#container {
  height: calc(100% - (6.9vh + 1.5vh));
  border-radius: $-g-b-radius6;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
}
</style>
