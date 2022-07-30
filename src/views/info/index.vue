<template>
  <!-- :rules="searchRules" -->
  <div class="pad_20">
    <!-- 搜索条件 -->
    <el-form
      ref="searchForm"
      :model="searchForm"
      class="search-form"
      auto-complete="on"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="学号" size="mini">
        <el-input
          ref="stuId"
          v-model="searchForm.userId"
          placeholder="请输入学号"
          name="stuId"
          type="text"
          class="wth-100"
        />
      </el-form-item>
      <el-form-item label="公寓类别" size="mini">
        <el-select v-model="searchForm.dormitoryType" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.dormitoryType" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="寝室楼" size="mini">
        <el-select v-model="searchForm.dormitoryNumber" class="wth-100" placeholder="请选择">
          <el-option v-for="item in []" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="楼层" size="mini">
        <el-select v-model="searchForm.dormitoryFloor" class="wth-100" placeholder="请选择">
          <el-option v-for="item in []" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="寝室号" size="mini">
        <el-input v-model="searchForm.dormitoryRoomnum" placeholder="请输入寝室号" type="text" class="wth-100" />
      </el-form-item>
      <el-form-item label="寝室长" size="mini">
        <el-input v-model="searchForm.userName" placeholder="请输入寝室长姓名" type="text" class="wth-100" />
      </el-form-item>
      <el-form-item label="专业班级" size="mini">
        <el-input v-model="searchForm.className" placeholder="请输入专业班级" type="text" class="wth-100" />
      </el-form-item>
      <el-form-item label="职位" size="mini">
        <el-input ref="stuId" v-model="searchForm.stuId" placeholder="请输入职位" type="text" class="wth-100" />
      </el-form-item>
    </el-form>

    <!-- 按钮组 -->
    <div class="btn_group flex-bet-center mr-bottom-10">
      <div class="left">
        <el-button type="primary" size="mini" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="mini" @click="readFromLocalFile">批量导入</el-button>
        <el-button type="primary" size="mini" @click="handleDownLoad">下载模板</el-button>
        <input
          v-show="false"
          ref="input-file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="readFile()"
        >
      </div>
      <div class="right">
        <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      max-height="700"
      :data="list"
      element-loading-text="数据加载中..."
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- 学号 -->
      <el-table-column label="学号" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <!-- 公寓类别 -->
      <el-table-column label="公寓类别" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.dormitoryType == 1?'东和':'西和' }}</span>
        </template>
      </el-table-column>
      <!-- 寝室楼 -->
      <el-table-column label="寝室楼" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.dormitoryNumber }}
        </template>
      </el-table-column>
      <!-- 楼层 -->
      <el-table-column label="楼层" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.dormitoryFloornum }}
        </template>
      </el-table-column>
      <!-- 寝室号 -->
      <el-table-column label="寝室号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.dormitoryRoomnum }}
        </template>
      </el-table-column>
      <!-- 寝室长 -->
      <el-table-column label="寝室长" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <!-- 学生姓名 -->
      <el-table-column label="学生姓名" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <!-- 性别 -->
      <el-table-column label="性别" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <!-- 所属学院 -->
      <el-table-column label="所属学院" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.collegeName }}
        </template>
      </el-table-column>
      <!-- 专业班级 -->
      <el-table-column label="专业班级" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>
      <!-- 联系方式 -->
      <el-table-column label="联系方式" align="center" width="130">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <!-- 职位 -->
      <el-table-column label="职位" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <DeleteBtn :user-id=" scope.row.userId" :fetch-data="fetchData" />
        </template>

      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="mr-top-10"
      :current-page="pagination.index"
      :page-size="pagination.size"
      :page-sizes="[10,20,50]"
      :total="pagination.total"
      background
      layout="sizes,prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import C from '@/common/index.js'
import {
  conditionalPageQuery,
  userInfoDel,
  templateDownload,
  userInfoImport
} from '@/api/info'
import DeleteBtn from '@/components/Info/deleteBtn.vue'
export default {
  components: {
    DeleteBtn
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      C,
      list: null,
      listLoading: true,
      // 搜索条件
      searchForm: {},
      // 分页条件
      pagination: {
        index: 1,
        size: 10,
        total: 10
      },
      multipleSelection: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const that = this
      that.listLoading = true
      // 查询条件
      conditionalPageQuery({
        'pageIndex': that.pagination.index,
        'pageSize': that.pagination.size,
        ...that.searchForm
      }).then(res => {
        if (!res.statusCode) {
          console.log(res)
          const result = res.resultData
          that.pagination.total = result.total
          that.list = result.records
        }
        that.listLoading = false
      }).catch(error => {
        console.log(error)
      })
      this.listLoading = false
    },
    // 重置搜索条件和分页
    handleReset() {
      for (const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.pagination = {
        index: 1,
        size: 10,
        total: 10
      }
      this.fetchData()
    },
    // 处理分页条件改变
    handleCurrentChange(e) {
      this.pagination.index = e
      this.fetchData()
    },
    handleSizeChange(e) {
      this.pagination.size = e
      this.fetchData()
    },
    // 根据条件查询
    handleSearch() {
      console.log('查询条件', this.searchForm)
      this.fetchData()
    },
    // 选择表格中的项
    handleSelectionChange(e) {
      this.multipleSelection = e
    },
    handleBatchDelete() {
      const that = this
      // console.log(this.multipleSelection)
      const userIdList = []
      this.multipleSelection.map((item) => {
        userIdList.push(item.userId)
      })
      userInfoDel({
        userIds: userIdList.join(',')
      }).then(res => {
        if (!res.statusCode) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        that.fetchData()
      })
    },
    handleDownLoad() {
      templateDownload().then(res => {
        function downLoad(content, fileName) {
          var aEle = document.createElement('a') // 创建a标签
          const blob = new Blob([content])
          aEle.download = fileName // 设置下载文件的文件名
          aEle.href = URL.createObjectURL(blob)
          // aEle.href = content // content为后台返回的下载地址
          aEle.click() // 设置点击事件
        }
        downLoad(res, '学生信息汇总表.xlsx')
      })
    },
    // 读取excel文件
    readFromLocalFile() {
      this.$refs['input-file'].click()
    },
    async readFile() {
      const that = this
      // 获取文件流
      const input = this.$refs['input-file']
      if (input.files.length > 0) {
        const file = input.files[0]
        const formData = new FormData()
        formData.append('file', file)
        // const data = await file.arrayBuffer()
        // 发送给后端
        userInfoImport(formData).then(res => {
          console.log(res)
          if (!res.statusCode) {
            // 导入成功
            that.$message({
              type: 'success',
              message: res.resultMessage
            })
            that.fetchData()
          } else {
            that.$message({
              type: 'error',
              message: res.resultMessage
            })
          }
        })
        // const workbook = XLSX.read(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg:#283443;
  $light_gray:#8c8c8c;
  $cursor: #8c8c8c;

  .search-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  // &:after {
  //   content: "";
  //   display: block;
  //   height: 0;
  //   width: 350px;
  // }
    .el-form-item {
      width: 300px;
      margin-right: 100px;
    }
  }
</style>
