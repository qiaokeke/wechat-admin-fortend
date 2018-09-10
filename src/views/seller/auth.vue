<template>
  <div class="app-container">
    <el-form ref="sellerForm" :model="sellerForm" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="sellerForm.username" name="username" type="text" auto-complete="on" placeholder="username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="sellerForm.password" name="password" type="password" auto-complete="on" placeholder="password"/>
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
      sellerForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.sellerForm)
      this.$store.dispatch('AddSeller', this.sellerForm).then((response) => {
        this.$message(response.data)
      }).catch(() => {
        this.$message('error')
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

