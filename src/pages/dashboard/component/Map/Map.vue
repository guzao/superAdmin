<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useMap, GDMap, useMapData } from "./Map";
let Map: GDMap;
const { markerPointList, getOverview } = useMapData();

onMounted(() => {
  const Map = useMap("container");
  Map.gdMapOnMounted().then((res) => {
    getOverview().then((res) => {
      Map.addMarkPoints(markerPointList);
    });

    Map.gdMapZoomEvent((zoom: number, e: any) => {
      console.log(zoom);
      getOverview().then((res) => {
        Map.addMarkPoints(markerPointList);
      });
    });
  });
});
</script>

<style lang="scss" scoped>
@import "../../../../styles/variable.scss";
#container {
  height: calc(100% - (6.8vh + 1.5vh));
  border-radius: $-g-b-radius6;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.02);
}
</style>
