<template>
  <div id="situationChart" class="situation-chart" />
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  setTimeout(createCart, 500);
});

const createCart = () => {
  let myChart = echarts.init(
    document.getElementById("situationChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "axis"
    },
    color: ["#D8222C", "#EB9095", "#F7D3D5"],
    legend: {
      right: "top"
    },
    grid: {
      x: 10,
      y: 40,
      x2: 10,
      y2: 10,
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["产品1", "产品2", "产品3", "产品4", "产品5", "产品6", "产品7"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "日常运维",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true
      },
      {
        name: "设备故障",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true
      },
      {
        name: "电池故障",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
        smooth: true
      }
    ]
  });
};
</script>
<style lang="scss" scoped>
.situation-chart {
  width: 100%;
  height: 100%;
}
</style>