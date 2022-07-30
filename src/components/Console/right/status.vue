<template>
  <!-- 健康码状态 -->
  <div class="warp wth-100 het-50">
    <!-- head -->
    <div class="head flex-center-center">
      <div>
        <span class="mid_blue">{{ ">" }}</span>
        <span class="lighter_blue">{{ ">" }} </span>
        <span class="light_blue"> 健康码状态 </span>
        <span class="lighter_blue">{{ "<" }}</span>
        <span class="mid_blue">{{ "<" }}</span>
      </div>
    </div>

    <!-- title -->
    <div class="chart1_title flex">
      <div class="title_left">
        <div>{{ updateCount }}</div>
        <div class="mr-top-10">填写人数</div>
      </div>
      <div class="title_right">
        <div>{{ unUpdateCount }}</div>
        <div class="mr-top-10">未填写人数</div>
      </div>
    </div>
    <!-- 饼图 -->
    <div id="right_chart1" />
    <img :src="imgUrl.bkg2" class="bkg">
  </div>
</template>

<script>
import {
  countHealthCodeColor,
  countHealthDataUpdate
} from '@/api/cockpit'
export default {
  data() {
    return {
      imgUrl: {
        bkg: require('@/assets/img/bkg.png'),
        bkg2: require('@/assets/img/bkg2.png')
      },
      updateCount: '',
      unUpdateCount: ''
    }
  },
  created() {
    const that = this
    const obj = {
      '1': {
        name: '绿马人数',
        color: '#4eb55a'
      },
      '0': {
        name: '黄码人数人数',
        color: '#f3c323'
      },
      '-1': {
        name: '红码人数',
        color: '#fb0200'
      }
    }
    countHealthCodeColor().then((res) => {
      const result = res.resultData
      const seriesData = []
      const colorList = []
      result.map((item) => {
        seriesData.push({
          value: item.colorCount,
          name: obj[item.healthCodeColor].name + '(' + item.colorProportion + ') ' + item.colorCount,
          id:item.healthCodeColor
        })
        colorList.push(obj[item.healthCodeColor].color)
      })
      that.chart1(seriesData, colorList)
    })

    // 查询数据更新状态
    countHealthDataUpdate().then((res) => {
      const result = res.resultData
      this.updateCount = result.updateCount
      this.unUpdateCount = result.unUpdateCount
    })
  },

  methods: {
    chart1(seriesData, colorList) {
      let that = this
      const myChart = this.$echarts.init(document.getElementById('right_chart1'))
      // 绘制图表
      myChart.setOption({
        color: colorList,
        series: [{
          type: 'pie',
          data: seriesData
        }]
      })

      // 增加点击事件
      myChart.on("click", clickFunc);


      function clickFunc(param){
        if(param.data.id != 1){
          // 携带红码或者黄码的id
          that.$router.push({
            path: `/healthy?code=${param.data.id}`
          })
        }
      }
    }
  },

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
  }

  .bkg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    // z-index: -1;
    pointer-events:none;
  }

  .head {
    z-index: 100;
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
  #right_chart1 {
    width: 100%;
    height: 70%;
    z-index: 100;
  }
  .chart1_title {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    .title_left{
      text-align: center;
      color: white;
    }
    .title_right{
      margin-left: 50px;
      text-align: center;
      color: white;
    }
  }
</style>
