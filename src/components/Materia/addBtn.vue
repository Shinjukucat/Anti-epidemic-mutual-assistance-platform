<template>
  <div>
    <el-button type="primary" size="mini" @click="addFormdialogVisible = true">新增</el-button>
    <el-dialog title="新增" top="50px" center :visible.sync="addFormdialogVisible" width="500px" @close="addMaterialClosed">
      <el-form ref="addMaterialform" :model="addForm" label-width="80px">
        <el-form-item label="物品名称" required>
          <el-input v-model="addForm.materialName" placeholder="请输入物品名称" />
        </el-form-item>
        <el-form-item label="物品描述">
          <el-input v-model="addForm.materialDescription" placeholder="请输入物品描述" />
        </el-form-item>
        <!-- <el-form-item label="物品图片">
          <div class="warp">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :http-request="upload"
            >
              <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </el-form-item> -->
        <el-form-item label="规格" required>
          <el-input v-model="addForm.materialUnit" placeholder="请输入物品规格" />
        </el-form-item>
        <el-form-item label="库存" required>
          <el-input-number v-model="addForm.materialStock" :min="1" />
        </el-form-item>
        <el-form-item label="类目编号" required>
          <el-input v-model="addForm.categoryType" placeholder="请输入项目编号" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMaterialInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addMaterial, materialInfo} from '@/api/material'
export default {
  data() {
    return {
      addFormdialogVisible: false,
      addForm: {
        materialName: '',
        materialDescription: '',
        materialUnit: '',
        materialStock: 0,
        categoryType: null,
        // imageUrl: ''
      }
    }
  },
  props: ['fetchData', 'pagination'],
  methods: {
    // 监听添加物资对话框的关闭
    addMaterialClosed() {
      // this.$refs.addMaterialform.resetFields()
    },
    upload() {
      
    },
    handleAvatarSuccess(res, file) {
      // console.log('res', res)
      // console.log('file', file)
      // console.log('file', file)
      this.addForm.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      // console.log('file', file)
      this.addForm.imageUrl = URL.createObjectURL(file.raw)
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return true
    },
    // 计数器
    handleChange() {

    },
    // 确定新增物资
    addMaterialInfo() {
      const that = this;
      addMaterial({
        'pageIndex': that.pagination.index,
        'pageSize': that.pagination.size,
        ...that.addForm
      }).then(res => {
        console.log(res);
        that.addFormdialogVisible = false;
        that.fetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    border: 1px dashed #d9d9d9 !important;
    line-height: 120px;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF !important;
    }
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
