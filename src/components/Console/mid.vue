<template>
  <div class="het-100 wth_800 page">
    <div class="row flex-bet-center mr-top-20">
      <div class="item column-item-center white">
        <img :src="imgUrl.item1">
        <div class="number fs_35 mr-bottom-10">{{ totalCount }}</div>
        <div class="title">总需求量</div>
      </div>
      <!-- <div class="item column-item-center white">
        <img :src="imgUrl.item2">
        <div class="number fs_35 mr-bottom-10">158</div>
        <div class="title">未审核量</div>
      </div> -->
      <div class="item column-item-center white">
        <img :src="imgUrl.item3">
        <div class="number fs_35 mr-bottom-10">{{ sendedCount }}</div>
        <div class="title">已派发量</div>
      </div>
      <div class="item column-item-center white cursor" @click="toDemand">
        <img :src="imgUrl.item4">
        <div class="number fs_35 mr-bottom-10">{{ unSendedCount }}</div>
        <div class="title">未派发量</div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="white btn mr-top-20" @click="handleChange">{{ text }}</div>

    <!-- 图片 -->
    <div class="mid_map flex-center-center">
      <img :src="imgUrl.select">
    </div>
  </div>
</template>

<script>
import {
  countDemandStatus
} from '@/api/cockpit'

export default {
  data() {
    return {
      imgUrl: {
        item1: require('@/assets/img/item1.png'),
        item2: require('@/assets/img/item2.png'),
        item3: require('@/assets/img/item3.png'),
        item4: require('@/assets/img/item4.png'),
        xi: require('@/assets/img/xihe.png'),
        dong: require('@/assets/img/donghe.png'),
        select: require('@/assets/img/xihe.png')
      },
      text: '切到东和',
      isXi: true,
      sendedCount: null,
      totalCount: null,
      unSendedCount: null
    }
  },
  created() {
    const that = this
    countDemandStatus().then(res => {
      const result = res.resultData
      const {
        sendedCount,
        totalCount,
        unSendedCount
      } = result
      that.sendedCount = sendedCount
      that.totalCount = totalCount
      that.unSendedCount = unSendedCount
    })
  },
  methods: {
    handleChange() {
      if (this.isXi) {
        this.text = '切到东和'
        this.imgUrl.select = this.imgUrl.dong
      } else {
        this.text = '切到西和'
        this.imgUrl.select = this.imgUrl.xi
      }
      this.isXi = !this.isXi
    },
    toDemand() {
      this.$router.push({
        path: '/demand?sendStatus=0'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $bkg:#0a2e60;

  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item {
    width: 200px;
    height: 100px;
    position: relative;

    div {
      z-index: 1;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    border: 2px solid $bkg;
    border-radius: 10px;
    width: 90px !important;
    padding: 8px;
    text-align: center;
    cursor: pointer;
  }

  .mid_map {
    width: 100%;
    height: 500px;
    z-index: 100;

    img {
      height: 100%;
    }
  }

  .cursor{
    cursor: pointer;
  }
</style>
