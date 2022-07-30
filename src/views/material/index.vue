<template>
  <div class="pad_20">
    <!-- 按钮组 -->
    <div class="btn_group flex-bet-center mr-bottom-10">
      <div class="left flex">
        <AddBtn :fetchData="fetchData" :pagination="pagination" class="mr-right-10" />
        <el-button type="primary" size="mini" @click="readFromLocalFile">批量导入</el-button>
        <el-button type="primary" size="mini" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="mini">新增物资类别</el-button>
        <input
          v-show="false"
          ref="input-file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="readFile()"
        >
      </div>
      <div class="right">
        <el-button type="primary" size="mini" @click="changeStatus('1')">批量上架</el-button>
        <el-button type="primary" size="mini" @click="changeStatus('0')">批量下架</el-button>
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
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- 物品名称 -->
      <el-table-column label="物品名称" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialName }}
        </template>
      </el-table-column>
      <!-- 物品描述 -->
      <el-table-column label="物品描述" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.materialDescription }}</span>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="图片" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.materialPrice }}
        </template>
      </el-table-column>
      <!-- 规格 -->
      <el-table-column label="规格" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.materialUnit }}
        </template>
      </el-table-column>
      <!--库存 -->
      <el-table-column label="库存" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.materialStock }}
        </template>
      </el-table-column>
      <!-- 类目编号 -->
      <el-table-column label="类目编号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>
      <!-- 物资类别 -->
      <el-table-column label="物资类别" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column label="更新时间" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <!-- 物资状态 -->
      <el-table-column label="物资状态" align="center" width="100">
        <template slot-scope="scope">
          <span :class="scope.row.materialStatus==1?'primary':'red'">
            {{ scope.row.materialStatus==1?'已上架':'已下架' }}
          </span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <div class="flex-center-center">
            <ChangeBtn type="1" />
            <ChangeBtn type="0" />
            <DeleteBtn :is-disable="scope.row.materialStatus==1" />
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
  materialInfo,
  changeMaterialStatus
} from '@/api/material'
import DeleteBtn from '@/components/Materia/deleteBtn.vue'
import AddBtn from '@/components/Materia/addBtn.vue'
import ChangeBtn from '@/components/Materia/changeBtn.vue'
export default {
  components: {
    DeleteBtn,
    AddBtn,
    ChangeBtn
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
      multipleSelection: null,
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

      typeOptions: [{
        value: null,
        label: '请选择',
        key: 0
      },
      {
        value: 0,
        label: '西和',
        key: 1
      },
      {
        value: 1,
        label: '东和',
        key: 2
      }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const that = this
      that.listLoading = true

      materialInfo({
        'pageIndex': that.pagination.index,
        'pageSize': that.pagination.size
      }).then(res => {
        console.log(res)
        if (!res.statusCode) {
          const result = res.resultData
          that.pagination.total = result.total
          that.list = result.rows
        }
        that.listLoading = false
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
      this.fetchData()
    },
    // 读取excel文件
    readFromLocalFile() {
      this.$refs['input-file'].click()
    },
    async readFile() {
      // 获取文件流
      const input = this.$refs['input-file']
      if (input.files.length > 0) {
        const file = input.files[0]
        const data = await file.arrayBuffer()
        // 发送给后端
        // const workbook = XLSX.read(data)
      }
    },
    // 批量删除
    handleBatchDelete() {
      // console.log(this.multipleSelection)
      const userIdList = []
      this.multipleSelection.map((item) => {
        userIdList.push(item.userId)
      })
    },
    // 选择表格中的项
    handleSelectionChange(e) {
      console.log(e)
      this.multipleSelection = e
    },
    // 上架/下架
    changeStatus(index) {
      const that = this
      const userIdList = []
      that.multipleSelection.map((item) => {
        userIdList.push(item.materialId)
      })
      changeMaterialStatus({
        materialStatus: index,
        userIds: userIdList.join(',')
      }).then(res => {
        if (!res.statusCode) {
          // 上架/下架成功
          that.$message({
            type: 'success',
            message: index === '1' ? '上架成功' : '下架成功'
          })
          that.fetchData()
        }
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

    &:after {
      content: "";
      display: block;
      height: 0;
      width: 300px;
    }

    .el-form-item {
      width: 300px;
    }
  }
</style>
