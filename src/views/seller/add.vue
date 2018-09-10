<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.userid"/>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="form.shopName"/>
      </el-form-item>
      <el-form-item label="店铺url">
        <el-input v-model="form.shopUrl"/>
      </el-form-item>
      <el-form-item label="微信id">
        <el-input v-model="form.wechatId"/>
      </el-form-item>
      <el-form-item label="微信昵称">
        <el-input v-model="form.wechatName"/>
      </el-form-item>
      <el-form-item label="QQid">
        <el-input v-model="form.qqId"/>
      </el-form-item>
      <el-form-item label="QQ昵称">
        <el-input v-model="form.qqName"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phoneNumber"/>
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
        userid: '',
        username: '',
        shopName: '',
        shopUrl: '',
        wechatId: '',
        wechatName: '',
        qqId: '',
        qqName: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('AddSellerInfo', this.form).then((response) => {
        this.$message(response.data)
      })
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

