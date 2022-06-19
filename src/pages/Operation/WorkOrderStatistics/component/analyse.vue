<template>
  <div id="analyseChart" class="analyse-chart" />
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
    document.getElementById("analyseChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    color: ["#D8222C", "#EB9095", "#F7D3D5"],
    legend: {
      itemHeight: 15,
      itemWidth: 15,
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
      axisTick: { show: false },
      axisLine: { show: false },
      type: "category",
      data: [
        "供应商1",
        "供应商2",
        "供应商3",
        "供应商4",
        "供应商5",
        "供应商6",
        "供应商7",
        "供应商8"
      ]
    },
    yAxis: {
      axisLabel: {
        color: "#000"
      },
      type: "value",
      axisTick: { show: false }
    },
    series: [
      {
        name: "零件1",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [320, 302, 301, 334, 390, 330, 320, 334, 390, 334]
      },
      {
        name: "零件2",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90]
      },
      {
        name: "零件3",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290]
      }
    ]
  });
};
</script>
<style lang="scss" scoped>
.analyse-chart {
  width: 100%;
  height: 100%;
}
</style>