<template>
  <div class="console-container">
    <Head />
    <div class="content flex-bet-center">
      <!-- 左 -->
      <Left />
      <!-- 中 -->
      <Mid />
      <!-- 右 -->
      <Right />
    </div>
  </div>
</template>

<script>
import Head from '@/components/Console/head.vue'
import Left from '@/components/Console/left.vue'
import Right from '@/components/Console/right.vue'
import Mid from '@/components/Console/mid.vue'
export default {
  components: {
    Head,
    Left,
    Right,
    Mid
  },
  data() {
    return {

    }
  },
  mounted() {

  }

}
</script>

<style lang="scss" scoped>
  $bk_blue:#10243c;

  .console-container {
    min-height: 100%;
    width: 1920px;
    background-color: $bk_blue;
    position: relative;
    padding: 0 30px 30px 30px;
    .content{
      box-sizing: content-box;
      width: 100%;
      height: 750px;
    }
  }

</style>
