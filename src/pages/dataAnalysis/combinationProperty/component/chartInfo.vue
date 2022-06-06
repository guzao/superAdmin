<template>
  <div class="chart-box">
    <div class="chart-top flex">
      <div class="radar">
        <div class="chart-title">项目指标雷达图</div>
        <div id="radarChart" style="width: 100%;height: 100%;" />
      </div>
      <div class="heat">
        <div class="chart-title">项目放电量热力图(kWh)</div>
        <div class="chart-legend flex">
          <div class="icon one" />
          <div>100</div>
          <div class="icon two" />
          <div>500</div>
          <div class="icon three" />
          <div>∞</div>
        </div>
        <div id="heatChart" style="width: 100%;height: 100%;" />
      </div>
    </div>
    <div class="capacity">
      <div class="chart-title">设备放电量排行(kWh)</div>
      <div class="chart-legend flex">
        <div class="icon one" />
        <div>充电量</div>
        <div class="icon two" />
        <div>放电量</div>
        <div class="ash-arrow svg" />
        <div>充电平均值</div>
        <div class="blue-arrow svg" />
        <div>放电平均值</div>
      </div>
      <div id="capacityChart" style="width: 100%;height: 100%;" />
    </div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
  //需要获取到element,所以是onMounted的Hook
  createRadar();
  createHeat();
  createCapacity();
});

const createRadar = () => {
  let myChart = echarts.init(
    document.getElementById("radarChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    legend: {
      right: 0,
      top: 0,
      data: ["2021年度", "2022年度"]
    },
    radar: {
      // shape: 'circle',
      axisLine: {
        lineStyle: {
          color: "#F2F2F2"
        }
      },
      axisName: {
        color: "#000"
      },
      indicator: [
        { name: "工单数", max: 6500 },
        { name: "容量保持率", max: 16000 },
        { name: "可用率", max: 30000 },
        { name: "循环效率", max: 38000 },
        { name: "故障率", max: 52000 },
        { name: "达标率", max: 25000 }
      ]
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            areaStyle: { color: "rgba(0, 170, 255, 0.5)" }, //雷达覆盖区域背景颜色

            color: "rgb(0, 170, 255)",
            lineStyle: {
              color: "rgb(0, 170, 255)"
            },
            itemStyle: {
              color: "rgb(0, 170, 255)"
            },
            name: "2021年度"
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            areaStyle: { color: "rgba(189, 189, 189, 0.5)" }, //雷达覆盖区域背景颜色
            lineStyle: {
              color: "rgb(189, 189, 189)"
            },
            itemStyle: {
              color: "rgb(189, 189, 189)"
            },
            name: "2022年度"
          }
        ]
      }
    ]
  });
};

const createHeat = () => {
  // prettier-ignore
  const hours = [
    '1', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ];
  // prettier-ignore
  const days = [
    '1月', '2月', '3月',
    '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  // prettier-ignore
  const data = [[0, 0, 150],[0, 1, 650],[1, 1, 650],[1, 0, 650]].map(function (item) {
    return [item[1], item[0], item[2] || '-'];
  });
  let myChart = echarts.init(
    document.getElementById("heatChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    tooltip: {
      position: "top"
    },
    grid: {
      x: 45,
      y: 35,
      x2: 15,
      y2: 20
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "category",
      data: days,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10,
      type: "piecewise",
      calculable: true,
      orient: "horizontal",
      splitNumber: 3, //这里设置分割数
      pieces: [
        { gte: 0, lte: 100 }, // [0,100]
        { gt: 100, lte: 500 }, // (100, 200]
        { gt: 500 } // (400, +]
      ],
      top: 5,
      right: 10,
      inRange: {
        color: ["#A6FFFF", "#00AAFF", "#006A9E"] //格子分类的颜色，这里定义了颜色之后，每一种都会有颜色
      }
    },
    series: [
      {
        name: "放电量",
        type: "heatmap",
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 3,
          borderRadius: 5
        },
        data: data,
        label: {
          backgroundColor: "#F7F7F7",
          normal: {
            show: false //这里设置格子上面是否要显示数据
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });
};

const createCapacity = () => {
  let myChart = echarts.init(
    document.getElementById("capacityChart") as HTMLElement
  );
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "axis"
    },
    grid: {
      x: 50,
      x2: 50,
      y: 40
    },
    dataZoom: [
      {
        start: 0,
        end: 30
      },
      {
        type: "inside"
      }
    ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "LT-789483",
        "LT-789484",
        "LT-789485",
        "LT-789486",
        "LT-789487",
        "LT-789488",
        "LT-789489"
      ]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "充电量",
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            color: "#E5E5E5", //折线点的颜色
            lineStyle: {
              color: "#E5E5E5" //折线的颜色
            }
          }
        },
        data: [10, 11, 13, 11, 12, 12, 9],
        markLine: {
          data: [
            { type: "average", name: "Avg", lineStyle: { color: "#999999" } }
          ]
        }
      },
      {
        name: "放电量",
        type: "line",
        smooth: true,
        data: [1, -2, 2, 5, 3, 2, 0],
        itemStyle: {
          normal: {
            color: "#00AAFF", //折线点的颜色
            lineStyle: {
              color: "#00AAFF" //折线的颜色
            }
          }
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        }
      }
    ]
  });
};
</script>
<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: calc(100% - 6vh);
  .chart-top {
    height: 50%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .radar {
      width: 40%;
      position: relative;
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
    .heat {
      position: relative;
      width: 60%;
    }
  }
  .capacity {
    position: relative;
    height: 50%;
  }
}
.chart-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 12px;
  font-weight: 600;
}
.chart-legend {
  position: absolute;
  top: 15px;
  right: 15px;
  line-height: 11px;
  .icon {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 5px;
  }
  .one {
    background-color: #a6ffff;
  }
  .two {
    background-color: #00aaff;
  }
  .three {
    background-color: #006a9e;
  }
  .svg {
    margin-left: 20px;
    margin-right: 5px;
    height: 12px;
    width: 12px;
  }
  .blue-arrow {
    content: url(@/assets/svgs/chartArrowBlue.svg);
  }
  .ash-arrow {
    content: url(@/assets/svgs/chartArrowBlue.svg);
  }
}
</style>