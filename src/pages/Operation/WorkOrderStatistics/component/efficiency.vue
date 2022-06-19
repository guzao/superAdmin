<template>
  <div id="efficiencyChart" class="efficiency-chart" />
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
    document.getElementById("efficiencyChart") as HTMLElement
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
      axisLabel: {
        show: false
      },
      axisTick: { show: false },
      type: "value"
    },
    yAxis: {
      axisLabel: {
        color: "#000"
      },
      type: "category",
      axisTick: { show: false },
      axisLine: { show: false },
      data: ["赵丽", "王菲", "李子木", "张子木", "李伟"]
    },
    series: [
      {
        name: "日常运维",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: "设备故障",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "电池故障",
        type: "bar",
        barWidth: 25, // 柱子宽度
        stack: "total",
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  });
};
</script>
<style lang="scss" scoped>
.efficiency-chart {
  width: 100%;
  height: 100%;
}
</style>