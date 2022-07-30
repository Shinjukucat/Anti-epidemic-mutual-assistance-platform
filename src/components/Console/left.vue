<template>
  <div class="het-100 wth_400 page">
    <!-- 一日三餐派送 -->
    <Deliver />
    <!-- 库存物资 -->
    <Material />
    <!-- 需求量日趋势 -->
    <Demand />
  </div>
</template>

<script>
import Deliver from './left/deliver.vue'
import Material from './left/material.vue'
import Demand from './left/demand.vue'

export default {
  components: {
    Deliver,
    Material,
    Demand
  },
  data() {
    return {
      imgUrl: {
        bkg: require('@/assets/img/bkg.png'),
        bkg2: require('@/assets/img/bkg2.png')
      }
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
