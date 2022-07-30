<template>
  <el-link type="primary" :underline="false" @click="open">删除</el-link>
</template>

<script>
import {
  userInfoDel
} from '@/api/info'
export default {
  props: ['userId', 'fetchData'],
  data() {
    return {}
  },
  methods: {
    open() {
      const that = this
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userInfoDel({
          userIds: that.userId
        }).then(res => {
          console.log(res)
          if (!res.statusCode) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          that.fetchData()
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
