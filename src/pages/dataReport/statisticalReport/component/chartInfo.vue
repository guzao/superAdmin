<template>
  <div id="statisticChart" class="statistic-chart" />
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
    document.getElementById("statisticChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    grid: {
      x: 50,
      y: 60,
      x2: 150,
      y2: 50
    },
    toolbox: {
      feature: {}
    },
    legend: {
      data: ["充电量", "放电量", "收益"]
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "充电量",
        nameTextStyle: {
          padding: [0, 0, 0, 60] // 上右下左与原位置距离
        },
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#D8222D"
          }
        },
        axisLabel: {
          formatter: "{value} kWh"
        }
      },
      {
        type: "value",
        name: "放电量 ",
        nameTextStyle: {
          padding: [0, 0, 0, 60] // 上右下左与原位置距离
        },
        position: "right",
        alignTicks: true,
        offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#00AAFF"
          }
        },
        axisLabel: {
          formatter: "{value} kWh"
        }
      },
      {
        type: "value",
        name: "收益",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#BDBDBD"
          }
        },
        axisLabel: {
          formatter: "{value} 元"
        }
      }
    ],
    series: [
      {
        name: "充电量",
        type: "bar",
        barWidth: 15,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#D8222D" },
            { offset: 1, color: "#FF667D" }
          ])
        },
        data: [
          2.0,
          4.9,
          7.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ]
      },
      {
        name: "放电量",
        type: "bar",
        yAxisIndex: 1,
        barWidth: 15,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00AAFF" },
            { offset: 1, color: "#6ECFFF" }
          ])
        },
        data: [
          2.6,
          5.9,
          9.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          18.8,
          6.0,
          2.3
        ]
      },
      {
        name: "收益",
        type: "line",
        smooth: true,
        yAxisIndex: 2,
        itemStyle: {
          color: "#BDBDBD"
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  });
};
</script>
<style lang="scss" scoped>
.statistic-chart {
  width: 100%;
  height: 65vh;
  padding-top: 4vh;
}
</style>