<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="id">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="店铺url">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="微信id">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="微信昵称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="QQid">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="QQ昵称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.name"/>
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
        name: '',
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
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

