<template>
  <!-- 需求量日趋势 -->
  <div class="warp wth-100 het-35">
    <!-- head -->
    <div class="head flex-center-center">
      <div>
        <span class="mid_blue">{{ ">" }}</span>
        <span class="lighter_blue">{{ ">" }} </span>
        <span class="light_blue"> 需求量日趋势 </span>
        <span class="lighter_blue">{{ "<" }}</span>
        <span class="mid_blue">{{ "<" }}</span>
      </div>
    </div>

    <!-- 图表 -->
    <div id="left_chart3" />

    <img :src="imgUrl.bkg2" class="bkg">
  </div>
</template>

<script>
import {
  countDemandTrend
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
    countDemandTrend().then((res) => {
      const result = res.resultData
      result.sort((a, b) => {
        const date1 = new Date(a.clickDate)
        const date2 = new Date(b.clickDate)

        return date1.getTime() - date2.getTime()
      })
      console.log('result', result)
      const xAxisArr = []
      const series = []
      const yAxisArr = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]
      result.map((item) => {
        const dateArr = item.clickDate.split('-')
        xAxisArr.push(dateArr[1] + '.' + dateArr[2].slice(0, 2))
        series.push(item.demandCount)
      })
      // 绘制柱状图
      that.chart3(xAxisArr, yAxisArr, series)
    })
  },
  methods: {
    chart3(xAxisArr, yAxisArr, series) {
      const myChart = this.$echarts.init(document.getElementById('left_chart3'))

      myChart.setOption({
        xAxis: {
          type: 'category',
          data: xAxisArr
        },
        yAxis: {
          type: 'value',
          data: yAxisArr
        },
        series: [{
          data: series,
          type: 'line'
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

  #left_chart3 {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>
