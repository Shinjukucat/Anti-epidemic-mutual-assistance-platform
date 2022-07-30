<template>
  <!-- 一日三餐派送 -->
  <div class="warp wth-100 het-25">
    <!-- head -->
    <div class="head flex-center-center">
      <div>
        <span class="mid_blue">{{ ">" }}</span>
        <span class="lighter_blue">{{ ">" }} </span>
        <span class="light_blue"> 一日三餐派送 </span>
        <span class="lighter_blue">{{ "<" }}</span>
        <span class="mid_blue">{{ "<" }}</span>
      </div>
    </div>
    <div class="chart flex-item-center">
      <!-- 图表 -->
      <div id="left_chart1" />
      <!-- 自定义legend -->
      <div class="legend">
        <div class="flex-item-center">
          <div class="point bkg_chart_red" />
          <div class="white mr-left-5">
            <span>未派送寝室人数</span>
            <span class="mr-0-10">({{ rate1 }}%)</span>
            <span>{{ num1 }}</span>
          </div>
        </div>
        <div class="flex-item-center mr-top-10">
          <div class="point bkg_chart_blue" />
          <div class="white mr-left-5s">
            <span>已派送寝室人数</span>
            <span class="mr-0-10">({{ rate2 }}%)</span>
            <span>{{ num2 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 边框线 -->
    <img :src="imgUrl.bkg2" class="bkg">
  </div>
</template>

<script>
import {
  countSendStatus
} from '@/api/cockpit'
export default {
  data() {
    return {
      imgUrl: {
        bkg: require('@/assets/img/bkg.png'),
        bkg2: require('@/assets/img/bkg2.png')
      },
      num1: null,
      num2: null,
      rate1: 0,
      rate2: 0
    }
  },
  created() {
    // 查询派送情况
    countSendStatus().then((res) => {
      const result = res.resultData
      // 绘制圆环饼图
      this.chart1(result.totalCount, result.unSendedCount, result.sendedCount)
      this.rate1 = ((result.unSendedCount / result.totalCount) * 100).toFixed(3)
      this.rate2 = ((result.sendedCount / result.totalCount) * 100).toFixed(3)
    })
  },
  methods: {
    chart1(total, undeliver, delivered) {
      const myChart = this.$echarts.init(document.getElementById('left_chart1'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: total,
          x: 'center',
          y: 'center',
          textStyle: {
            color: 'white',
            fontStyle: 'normol'
          }
        },
        color: ['#ef4864', '#1187ff'],
        // legend: {
        //   orient: 'vertical',
        //   x: 'right',
        //   data: ['未派送寝室人数', '已派送寝室人数']
        // },
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            emphasis: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          data: [{
            value: undeliver,
            name: '未派送寝室人数'
          },
          {
            value: delivered,
            name: '已派送寝室人数'
          }
          ]
        }]
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
  $chart_red:#ef4864;
  $chart_blue:#1187ff;

  .bkg_chart_red {
    background-color: $chart_red;
  }

  .bkg_chart_blue {
    background-color: $chart_blue;
  }

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

  .chart {
    width: 100%;
    flex: 1;
    z-index: 1;
  }

  .point {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  #left_chart1 {
    width: 35%;
    height: 100%;
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
</style>
