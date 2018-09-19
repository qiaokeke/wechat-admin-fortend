<template>
  <div>
    <el-container>
      <el-main>
        <div class="components-container">
          <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="value"/>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-button type="primary" @click="onDelete">删除</el-button>
        <el-button type="primary" @click="onCreate">新增</el-button>
        <el-button type="primary" @click="onRefresh">刷新</el-button>
        <el-button type="primary" @click="onCreateTest">新增测试</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { fetchMenu, deleteMenu, createMenu, createTest } from '@/api/menu'
// const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

export default {
  components: { JsonEditor },
  data() {
    return {
      value: ''
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      fetchMenu().then(response => {
        console.log(response.data)
        this.value = response.data
        console.log(this.value)
      })
    },
    onDelete() {
      deleteMenu().then(response => {
        this.$message(response.data)
        this.getMenu()
      })
    },
    onCreate() {
      createMenu(this.value).then(response => {
        this.$message(response.data)
        this.getMenu()
      })
    },
    onRefresh() {
      this.getMenu()
    },
    onCreateTest() {
      createTest().then(response => {
        this.$message(response.data)
        this.getMenu()
      })
    }
  }
}
</script>

<style scoped>
.editor-container{
  position: relative;
  height: 100%;
}
</style>
