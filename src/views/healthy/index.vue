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
      label-width="100px"
    >
      <el-form-item label="姓名" size="mini">
        <el-input ref="name" v-model="searchForm.stuName" placeholder="请输入姓名" name="name" type="text" class="wth-100" />
      </el-form-item>
      <el-form-item label="学号" size="mini">
        <el-input ref="stuId" v-model="searchForm.stuId" placeholder="请输入学号" name="stuId" type="text" class="wth-100" />
      </el-form-item>

      <el-form-item label="健康码" size="mini">
        <el-select v-model="searchForm.code" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.code" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="核酸检测结果" size="mini">
        <el-select v-model="searchForm.type" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.typeOptions" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="隔离状态" size="mini">
        <el-select v-model="searchForm.isolation" class="wth-100" placeholder="请选择">
          <el-option v-for="item in C.isolationOptions" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 按钮组 -->
    <div class="btn_group flex-bet-center mr-bottom-10">
      <div class="left">
        <el-button type="primary" size="mini" @click="handleDownload">导出</el-button>
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
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="序号" width="60">
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
      <!-- 姓名 -->
      <el-table-column label="姓名" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <!-- 隔离状态 -->
      <el-table-column label="隔离状态" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ C.quarantineStatus[scope.row.quarantineStatus] }}</span>
        </template>
      </el-table-column>
      <!-- 当前定位 -->
      <el-table-column label="当前定位" align="center" width="500">
        <template slot-scope="scope">
          {{ scope.row.locationInfo }}
        </template>
      </el-table-column>
      <!-- 疫情接种情况 -->
      <el-table-column label="疫情接种情况" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.isVaccinations3 }}
        </template>
      </el-table-column>
      <!-- 健康码 -->
      <el-table-column label="健康码" align="center" width="100">
        <template slot-scope="scope">
          <span :class="C.healthCodeColor[scope.row.healthCodeColor].class">
            {{ C.healthCodeColor[scope.row.healthCodeColor].label }}
          </span>
        </template>
      </el-table-column>
      <!-- 核酸检测结果 -->
      <el-table-column label="核酸检测结果" align="center" width="120">
        <template slot-scope="scope">
          <span :class="C.nucleicAcidTestResult[scope.row.nucleicAcidTestResult].class">
            {{ C.nucleicAcidTestResult[scope.row.nucleicAcidTestResult].label }}
          </span>
        </template>
      </el-table-column>
      <!-- 核酸检测时间 -->
      <el-table-column label="核酸检测时间" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.natestTime }}
        </template>
      </el-table-column>
      <!-- 14天内行程 -->
      <el-table-column label="14天内行程" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.ltineraryCard }}
        </template>
      </el-table-column>
      <!-- 公寓类别 -->
      <el-table-column label="公寓类别" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.dormitoryType }}
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
          {{ scope.row.dormitoryFloor }}
        </template>
      </el-table-column>
      <!-- 寝室号 -->
      <el-table-column label="寝室号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.dormitoryRoomnum }}
        </template>
      </el-table-column>
      <!-- 联系方式 -->
      <el-table-column label="联系方式" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <!-- 数据更新时间 -->
      <el-table-column label="数据更新时间" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- <el-table-column align="center" label="操作">
        <el-link type="primary" :underline="false">删除</el-link>
      </el-table-column> -->
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
  formatTime
} from '@/utils/index.js'
import {
  getHealthInfo,
  exportHealthInfo
} from '@/api/healthTable'
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
      searchForm: {
        stuName: null,
        stuId: null,
        isolation: null,
        code: null,
        type: null,
      },
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
    // 格式化时间
    formatTime,
    // 获取列表信息
    fetchData() {
      const that = this
      that.listLoading = true
      const searchOption = {}
      for (const key in this.searchForm) {
        console.log(key)
        switch (key) {
          case 'stuName':
            searchOption.userName = this.searchForm[key]
          case 'stuId':
            searchOption.userId = this.searchForm[key]
          case 'isolation':
            searchOption.quarantineStatus = this.searchForm[key]
            break
          case 'code':
            searchOption.healthCodeColor = this.searchForm[key]
            break
          case 'type':
            searchOption.nucleicAcidTestResult = this.searchForm[key]
        }
      }

      getHealthInfo({
        'pageIndex': that.pagination.index,
        'pageSize': that.pagination.size,
        ...searchOption
      }).then(res => {
        if (!res.statusCode) {
          const result = res.resultData
          that.pagination.total = result.total
          that.list = result.rows
        }
        that.listLoading = false
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
    // 文件下载
    handleDownload() {
      // 获取查询条件
      const that = this
      that.listLoading = true
      const searchOption = {}
      for (const key in this.searchForm) {
        switch (key) {
          case 'isolation':
            searchOption.quarantineStatus = this.searchForm[key]
            break
          case 'code':
            searchOption.healthCodeColor = this.searchForm[key]
            break
        }
      }

      // 请求下载链接
      exportHealthInfo({
        healthInfoDTO: {
          'pageIndex': that.pagination.index,
          'pageSize': that.pagination.size,
          ...searchOption
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
        downLoad(res, '学生健康信息汇总表.xlsx')
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
    }
  }
</style>
