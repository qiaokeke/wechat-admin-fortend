<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="任务id">
        <el-input v-model="form.taskId"/>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="店铺id">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="押款金额">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="赠品图片url">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :file-list="fileList2"
          :multiple="false"
          class="upload-demo"
          action="http://localhost:9001/oss/upload/img"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="赠品">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="预热时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date1" placeholder="选择时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date1" placeholder="选择时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date1" placeholder="选择时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        taskId: '',
        giftPicUrl: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created: function() {
    this.setTaskId()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    setTaskId() {
      this.$store.dispatch('GetTaskId').then((response) => {
        this.form.taskId = response.data
      }).catch(() => {
        this.$message('生成id失败')
      })
    },
    handleUploadSuccess(response) {
      this.$message('上传成功')
      this.form.giftPicUrl = response.data
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
