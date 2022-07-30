<template>
  <!-- 库存物资 -->
  <div class="warp wth-100 het-35">
    <!-- head -->
    <div class="head flex-center-center">
      <div>
        <span class="mid_blue">{{ ">" }}</span>
        <span class="lighter_blue">{{ ">" }} </span>
        <span class="light_blue"> TOP10库存物资 </span>
        <span class="lighter_blue">{{ "<" }}</span>
        <span class="mid_blue">{{ "<" }}</span>
      </div>
    </div>

    <!-- 图表 -->
    <div id="left_chart2" />

    <!-- 框线 -->
    <img :src="imgUrl.bkg2" class="bkg">
  </div>
</template>

<script>
import {
  countMaterialTrend
} from '@/api/cockpit'

export default {
  data() {
    return {
      imgUrl: {
        bkg: require('@/assets/img/bkg.png'),
        bkg2: require('@/assets/img/bkg2.png')
      }
    }
  },
  created() {
    const that = this
    // 查询物资库存情况
    countMaterialTrend().then((res) => {
      const xAxisArr = []
      const yAxisArr = [0, 500, 1000, 5000, 10000]
      const series1 = []
      const series2 = []
      const myArr = res.resultData
      myArr.sort((a, b) => {
        return a.materialStock - b.materialStock
      })
      myArr.map((item) => {
        xAxisArr.push(item.materialName)
        series1.push(item.materialStock)
        if (item.consumption === null) {
          series2.push(0)
        } else {
          series2.push(item.consumption)
        }
      })
      // console.log('myArr', myArr)
      // 绘制柱状图
      that.chart2(xAxisArr, yAxisArr, series1, series2)
    })
  },
  mounted() {

  },
  methods: {
    chart2(xAxisArr, yAxisArr, series1, series2) {
      const myChart = this.$echarts.init(document.getElementById('left_chart2'))

      // 绘制图表
      myChart.setOption({
        color: ['#ef4864', '#1187ff'],
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          data: xAxisArr,
          type: 'category',
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(77, 128, 254, 0.2)',
              width: 1
            }
          },
          axisLine: { //  控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#CECECE',
              width: '1'
            }
          },

          axisTick: {
            show: false // 隐藏X轴轴线
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white'
            },
            interval: 0,
            formatter: function(value) {
              // x轴的文字改为竖版显示
              var str = value.split('')
              return str.join('\n')
            }
          }
        },
        yAxis: {
          data: yAxisArr,
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#9dabbf',
              width: '1'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#0b488c',
              width: 1
            }
          }
        },
        series: [{
          data: series1,
          type: 'bar',
          stack: 'x',
          barWidth: 12,
          // 实现数字展示在柱状图上
          label: {
            show: true,
            position: 'top',
            color: 'white'
          }
        },
        {
          data: series2,
          type: 'bar',
          stack: 'x',
          barWidth: 12
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $deep_blue:#051d3f;
  $light_blue:#237dbf;
  $mid_blue:#1e65a1;
  $lighter_blue:#9acef7;
  $bkg:#0a2e60;

  .warp {
    position: relative;
    background-color: $bkg;
    display: flex;
    flex-direction: column;
  }

  .bkg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .head {
    background-color: $deep_blue;
    height: 50px;
  }

  .light_blue {
    color: $light_blue;
  }

  .lighter_blue {
    color: $lighter_blue;
  }

  .mid_blue {
    color: $mid_blue;
  }

  #left_chart2 {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>
