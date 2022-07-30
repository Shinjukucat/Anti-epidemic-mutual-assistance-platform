<template>
  <div class="head-container flex-bet-center">
    <div class="flex-item-center white">
      <div>
        <img :src="imgUrl.back" class="wth_40">
      </div>
      <div class="mr-left-20" style="letter-spacing:5px">
        <div>{{ date }}</div>
        <div class="mr-top-5">{{ time }}</div>
      </div>
    </div>
    <div>2</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: {
        back: require('@/assets/img/back.png')
      },
      time: '',
      date: ''
    }
  },
  mounted() {
    this.timer = setInterval(this.showRealTime, 1000)
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    showRealTime() {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDay()
      const hour = (d.getHours() < 10) ? ('0' + d.getHours()) : d.getHours()
      const min = (d.getMinutes() < 10) ? ('0' + d.getMinutes()) : d.getMinutes()
      const sec = (d.getSeconds() < 10) ? ('0' + d.getSeconds()) : d.getSeconds()
      this.date = year + '年' + month + '月' + day + '日'
      this.time = hour + ':' + min + ':' + sec
    }
  }
}
</script>

<style lang="scss" scoped>
  .head-container {
    height: 120px;
    width: 100%;
    // background-color: rgba($color: #ff0000, $alpha: .1);
  }
</style>
