<template>
  <div class="pad_20">
    <!-- 搜索条件 -->
    <el-form
      ref="searchForm"
      :model="searchForm"
      :rules="searchRules"
      class="search-form"
      auto-complete="on"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="状态" size="mini">
        <el-select v-model="searchForm.sendStatus" class="wth-100" placeholder="请选择状态">
          <el-option v-for="item in C.status" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="公寓类别" size="mini">
        <el-select v-model="searchForm.dormitoryType" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.dormitoryType" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="寝室楼" size="mini">
        <el-select v-model="searchForm.dormitoryNumber" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.dormitoryType" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="楼层" size="mini">
        <el-select v-model="searchForm.dormitoryFloorNum" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.dormitoryType" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="寝室号" size="mini">
        <el-input
          ref="stuId"
          v-model="searchForm.dormitoryRoomNum"
          placeholder="请输入寝室号"
          name="stuId"
          type="text"
          class="wth-100"
        />
      </el-form-item>
      <el-form-item label="寝室长" size="mini">
        <el-input
          ref="stuId"
          v-model="searchForm.stuId"
          placeholder="请输入寝室长姓名"
          name="stuId"
          type="text"
          class="wth-100"
        />
      </el-form-item>
      <el-form-item label="联系方式" size="mini">
        <el-input
          ref="stuId"
          v-model="searchForm.mobilePhone"
          placeholder="请输入联系方式"
          name="stuId"
          type="text"
          class="wth-100"
        />
      </el-form-item>
      <el-form-item label="时间" size="mini">
        <el-select v-model="searchForm.createdTime" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.dormitoryType" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 按钮组 -->
    <div class="btn_group flex-bet-center mr-bottom-10">
      <div class="left">
        <el-button type="primary" size="mini" @click="handleDownLoad">导出</el-button>
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
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- 学号 -->
      <el-table-column label="提交时间" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <!-- 公寓类别 -->
      <el-table-column label="公寓类别" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.dormitoryType }}</span>
        </template>
      </el-table-column>
      <!-- 寝室楼 -->
      <el-table-column label="寝室楼" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.building }}
        </template>
      </el-table-column>
      <!-- 楼层 -->
      <el-table-column label="楼层" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.dormitoryFloorNum }}
        </template>
      </el-table-column>
      <!-- 寝室号 -->
      <el-table-column label="寝室号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.dormitoryNumber }}
        </template>
      </el-table-column>
      <!-- 学生姓名 -->
      <el-table-column label="寝室长" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.createdByName }}
        </template>
      </el-table-column>
      <!-- 性别 -->
      <el-table-column label="联系方式" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <!-- 所属学院 -->
      <el-table-column label="物品内容" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.materialName }}
        </template>
      </el-table-column>
      <!-- 专业班级 -->
      <el-table-column label="规格" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.materialUnit }}
        </template>
      </el-table-column>
      <!-- 联系方式 -->
      <el-table-column label="数量" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.materialNumber }}
        </template>
      </el-table-column>
      <!-- 职位 -->
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" label="派送派发状态" width="150">
        <template slot-scope="scope">
          <div :class="scope.row.sendStatus == 1 ? 'green':'red'">
            {{ scope.row.sendStatus == 1 ? '已派发':'未派发' }}
          </div>
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
  findAllRequirementsUndelivered,
  exportRequirementsInfo
} from '@/api/demand'

export default {

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
      searchRules: {
        stuId: [{
          required: true,
          trigger: 'blur'
          // validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur'
          // validator: validatePassword
        }]
      },
      multipleSelection: []
    }
  },
  created() {
    if (this.$route.query !== {}) {
      this.searchForm = {
        ...this.searchForm,
        ...this.$route.query
      }
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      const that = this
      that.listLoading = true
      findAllRequirementsUndelivered({
        'pageIndex': that.pagination.index,
        'pageSize': that.pagination.size,
        ...that.searchForm
      }).then(res => {
        if (!res.statusCode) {
          console.log(res)
          const result = res.resultData
          that.pagination.total = result.total
          that.list = result.rows
        }
        that.listLoading = false
      }).catch(error => {
        console.log(error)
      })
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
      this.fetchData()
    },

    // 选择表格中的项
    handleSelectionChange(e) {
      this.multipleSelection = e
    },

    // 导出
    handleDownLoad() {
      const that = this
      exportRequirementsInfo({
        healthInfoDTO: {
          'pageIndex': that.pagination.index,
          'pageSize': that.pagination.size,
          ...that.searchForm
        }

      }).then(res => {
        function downLoad(content, fileName) {
          var aEle = document.createElement('a') // 创建a标签
          const blob = new Blob([content])
          aEle.download = fileName // 设置下载文件的文件名
          aEle.href = URL.createObjectURL(blob)
          // aEle.href = content // content为后台返回的下载地址
          aEle.click() // 设置点击事件
        }
        downLoad(res, '学生需求汇总表.xlsx')
      })
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
    //   width: 300px;
    // }

    .el-form-item {
      width: 300px;
      margin-right: 100px;
    }
  }
</style>
