<template>
  <div class="char_card p-5">
    <div class="title">实时功率曲线(kW)</div>
    <div class="power-curve" id="powerCurve" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  data: Array;
  const data = [
    210,
    160,
    130,
    100,
    250,
    -80,
    100,
    200,
    500,
    800,
    900,
    720,
    710,
    550,
    200,
    95,
    20,
    -50,
    -100,
    -130,
    80,
    180,
    280,
    380,
  ];
  //需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("powerCurve") as HTMLElement);
  // 绘制图表
  myChart.setOption({
    tooltip: {
      confine: true,
      trigger: "axis",
      position: function (pt: Array<any>) {
        return [pt[0], "10%"];
      },
    },
    grid: {
      x: 30,
      y: 30,
      x2: 30,
      y2: 70,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "50%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 30,
      },
      {
        start: 0,
        end: 30,
      },
    ],
    series: [
      {
        name: "功率",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "#D8222C",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#E3646B",
            },
            {
              offset: 1,
              color: "#F9DBDC",
            },
          ]),
        },
        data: data,
      },
    ],
  });
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";
.char_card {
  width: 100%;
  height: calc(100% - (6.9vh + 23vh));
  overflow: hidden;
  background: $-g-white;
  border-radius: $-g-b-radius6;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
  .power-curve {
    width: 100%;
    height: calc(100% - 2vh);
  }
}
</style>
