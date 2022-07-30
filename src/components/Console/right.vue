<template>
  <div class="het-100 wth_400 page">
    <!-- 健康码状态 -->
    <Status />
    <!-- 当前隔离状态 -->
    <Quarantine />
  </div>
</template>

<script>

import Status from './right/status.vue'
import Quarantine from './right/quarantine.vue'
export default {
  components: {
    Status,
    Quarantine
  },
  data() {
    return {
    }
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
