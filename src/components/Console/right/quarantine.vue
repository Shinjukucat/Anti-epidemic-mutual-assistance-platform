<template>
  <div class="warp wth-100 het-45">
    <!-- head -->
    <div class="head flex-center-center">
      <div>
        <span class="mid_blue">{{ ">" }}</span>
        <span class="lighter_blue">{{ ">" }} </span>
        <span class="light_blue"> 当前隔离状态 </span>
        <span class="lighter_blue">{{ "<" }}</span>
        <span class="mid_blue">{{ "<" }}</span>
      </div>
    </div>

    <div class="contant">
      <div class="item" @click="toHealthy(1)">
        <div class="up">集中隔离人数</div>
        <div class="mid red1">{{ data.jz }}</div>
        <!-- <div class="down">
          <span class="white">较昨日</span>
          <span class="red1">+{{}}</span>
        </div> -->
      </div>
      <div class="item">
        <div class="up">居家隔离人数</div>
        <div class="mid red2">{{ data.jj }}</div>
        <!-- <div class="down">
          <span class="white">较昨日</span>
          <span class="red2">{{}}</span>
        </div> -->
      </div>
      <div class="item">
        <div class="up">校内隔离人数</div>
        <div class="mid red3">{{ data.xn }}</div>
        <!-- <div class="down">
          <span class="white">较昨日</span>
          <span class="red3">{{}}</span>
        </div> -->
      </div>
      <div class="item">
        <div class="up">医院隔离人数</div>
        <div class="mid red4">{{ data.yy }}</div>
        <!-- <div class="down">
          <span class="white">较昨日</span>
          <span class="red4">{{}}</span>
        </div> -->
      </div>
    </div>

    <img :src="imgUrl.bkg2" class="bkg">
  </div>
</template>

<script>
import {
  countQuarantineStatus
} from '@/api/cockpit'
export default {
  data() {
    return {
      imgUrl: {
        bkg: require('@/assets/img/bkg.png'),
        bkg2: require('@/assets/img/bkg2.png')
      },
      data: {
        jz: '',
        jj: '',
        xn: '',
        yy: ''
      }
    }
  },
  created() {
    const that = this
    countQuarantineStatus().then((res) => {
      const result = res.resultData
      result.map((item) => {
        switch (item.quarantineStatus) {
          case '1':
            that.data.jz = item.quarantineStatusCount
            break
          case '2':
            that.data.jj = item.quarantineStatusCount
            break
          case '3':
            that.data.xn = item.quarantineStatusCount
            break
          case '4':
            that.data.yy = item.quarantineStatusCount
            break
        }
      })
    })
  },
  methods: {
    toHealthy(index) {
      switch (index) {
        case 1:
          // 集中隔离
          this.$router.push({
            path: `/healthy?isolation=1`
          })
          break
        case 2:
          // 居家隔离
          this.$router.push({
            path: `/healthy?isolation=2`
          })
          break
        case 3:
          // 校内隔离
          this.$router.push({
            path: `/healthy?isolation=3`
          })
          break
        case 4:
          // 医院隔离
          this.$router.push({
            path: `/healthy?isolation=4`
          })
          break
      }
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
  $red1:#ff7272;
  $red2:#ffc9a6;
  $red3:#ff6200;
  $red4:#c31414;

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
  }

  .contant {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .item {
      width: 40%;
      text-align: center;
      cursor: pointer;
      z-index: 1;

      .up {
        color: white;
        font-weight: bold;
        font-size: 15px;
      }

      .mid {
        margin: 10px;
        font-size: 40px;
      }
    }
  }

  .red1 {
    color: $red1;
  }

  .red2 {
    color: $red2;
  }

  .red3 {
    color: $red3;
  }

  .red4 {
    color: $red4;
  }
</style>
