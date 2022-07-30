<template>
  <div class="pad_20">
    <!-- 按钮组 -->
    <div class="btn_group flex-bet-center mr-bottom-10">
      <div class="left">
        <el-button type="primary" size="mini">批量审核</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
      <div class="right">
        <el-select v-model="searchForm.status" size="mini" class="wth_100 mr-right-10 het_30" placeholder="请选择">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" size="mini">查询</el-button>
        <el-button type="primary" size="mini">重置</el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中..." border fit highlight-current-row>
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- 学号 -->
      <el-table-column label="提交时间" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.stuId }}
        </template>
      </el-table-column>
      <!-- 公寓类别 -->
      <el-table-column label="公寓类别" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <!-- 寝室楼 -->
      <el-table-column label="寝室楼" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.building }}
        </template>
      </el-table-column>
      <!-- 楼层 -->
      <el-table-column label="楼层" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.floor }}
        </template>
      </el-table-column>
      <!-- 寝室号 -->
      <el-table-column label="寝室号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.floor }}
        </template>
      </el-table-column>
      <!-- 学生姓名 -->
      <el-table-column label="寝室长" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- 性别 -->
      <el-table-column label="联系方式" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <!-- 所属学院 -->
      <el-table-column label="物品" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.belong }}
        </template>
      </el-table-column>
      <!-- 专业班级 -->
      <el-table-column label="规格" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.class }}
        </template>
      </el-table-column>
      <!-- 联系方式 -->
      <el-table-column label="数量" align="center" width="130">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <!-- 职位 -->
      <el-table-column label="审核状态" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" label="操作">
        <el-link type="primary" :underline="false" class="mr-right-10">显示详细</el-link>
        <el-link type="primary" :underline="false">审核</el-link>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  C
} from '@/common/index.js'

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
      list: null,
      listLoading: true,
      searchForm: {
        status: null
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

      statusOptions: [{
        value: null,
        label: '请选择',
        key: 0
      },
      {
        value: 0,
        label: '已审核',
        key: 1
      },
      {
        value: 1,
        label: '待审核',
        key: 2
      },
      {
        value: 2,
        label: '未通过',
        key: 3
      }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      this.list = [{
        stuId: 1200651153,
        type: '西和',
        building: 8,
        floor: 5,
        number: 503,
        chief: '张三丰',
        name: '张三丰',
        sex: '男',
        belong: '信息',
        class: '数字媒体技术203',
        phone: '13700000000',
        position: '寝室长'
      }, {
        stuId: 1200651154,
        type: '东和',
        building: 2,
        floor: 2,
        number: 211,
        chief: '李四勇',
        name: '李四勇',
        sex: '男',
        belong: '信息',
        class: '数字媒体技术203',
        phone: '13600000000',
        position: '层长'
      }, {
        stuId: 1200651155,
        type: '西和',
        building: 12,
        floor: 4,
        number: 421,
        chief: '王五',
        name: '王五',
        sex: '女',
        belong: '信息',
        class: '数字媒体技术203',
        phone: '18600000000',
        position: '楼长'
      }]
      this.listLoading = false
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
