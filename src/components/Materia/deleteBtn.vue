<template>
  <el-button type="text" :disabled="isDisable" @click="open">删除</el-button>
</template>

<script>
export default {
  props: ['isDisable'],
  data() {
    return {

    }
  },
  methods: {
    open() {
      this.$confirm('此操作将永久删除该物品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 少一个删除的接口
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
