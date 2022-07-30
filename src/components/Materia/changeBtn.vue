<template>
  <el-button type="text" :disabled="isDisable" @click="open">
    {{ type=="1"?'上架':'下架' }}
  </el-button>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      isDisable: false
    }
  },
  methods: {
    open() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
