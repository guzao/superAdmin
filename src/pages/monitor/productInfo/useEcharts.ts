import * as Echarts from 'echarts'
import { curveModel } from './data.dt'
import type { EChartsOption, ECharts } from 'echarts'
export function userEcharts () {
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  for (let i = 1; i < 1000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: '2%',
      top: '2%',
      text: '实时功率曲线(kW)',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '4%',
      top: '10%',
      right: '2%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLabel: {
        fontSize: 10
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        zlevel: 3,
        z: 1,
        itemStyle: {
          color: 'rgb(216,34,44)'
        },
        areaStyle: {
          color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'rgba(216,34,44,0.1)'
            },
            {
              offset: 0,
              color: 'rgba(216,34,44,0.75)'
            }
          ])
        },
        data: data
      }
    ]
  }

  /** 执行渲染逻辑 */
  const renderLine = (container: HTMLElement, data: curveModel): ECharts => {
    const echartsInstance: ECharts = Echarts.init(container)
    echartsInstance.setOption(option, true)
    return echartsInstance
  }

  return {
    renderLine
  }
}