<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="任务id">
        <el-input v-model="form.taskId"/>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="form.taskName"/>
      </el-form-item>
      <el-form-item label="卖家id">
        <el-input v-model="form.sellerId"/>
      </el-form-item>
      <el-form-item label="押款金额">
        <el-input v-model="form.chargeAmount"/>
      </el-form-item>
      <el-form-item label="任务数量">
        <el-input v-model="form.taskAmount"/>
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
        <el-input v-model="form.gift"/>
      </el-form-item>
      <el-form-item label="预热时间">
        <el-date-picker v-model="form.preheatTime" type="datetime" placeholder="选择预热时间" align="right" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="form.publishTime" type="datetime" placeholder="选择发布时间" align="right" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.finishTime" type="datetime" placeholder="选择结束时间" align="right" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"/>
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
        taskName: '',
        sellerId: '',
        chargeAmount: '',
        taskAmount: '',
        gift: '',
        giftPicUrl: '',
        preheatTime: '',
        publishTime: '',
        finishTime: ''
      }
    }
  },
  created: function() {
    this.setTaskId()
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('AddTask', this.form).then((response) => {
        this.$message(response.data)
        this.setTaskId()
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
    },
    setPreheatTime(date) {
      this.preheatTime = date
    },
    setPublishTime(date) {
      this.publishTime = date
    },
    setFinishTime(date) {
      this.finishTime = date
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
