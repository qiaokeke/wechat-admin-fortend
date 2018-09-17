<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.sellerId" style="width: 200px;" class="filter-item" placeholder="卖家Id" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.sellerName" style="width: 200px;" class="filter-item" placeholder="卖家昵称" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column label="卖家Id" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖家名称" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖家Id" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerShopUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信Id" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerWechatId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerWechatName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QQId" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerQQId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QQ昵称" class-name="status-col" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerQQName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" class-name="status-col" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sellerPhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="卖家Id" prop="type">
          <el-input v-model="temp.sellerId"/>
        </el-form-item>
        <el-form-item label="卖家名称" prop="timestamp">
          <el-input v-model="temp.sellerName"/>
        </el-form-item>
        <el-form-item label="店铺名称" prop="title">
          <el-input v-model="temp.sellerShopName"/>
        </el-form-item>
        <el-form-item label="店铺url" prop="title">
          <el-input v-model="temp.sellerShopUrl"/>
        </el-form-item>
        <el-form-item label="微信Id" prop="title">
          <el-input v-model="temp.sellerWechatId"/>
        </el-form-item>
        <el-form-item label="微信昵称" prop="title">
          <el-input v-model="temp.sellerWechatName"/>
        </el-form-item>
        <el-form-item label="QQId" prop="title">
          <el-input v-model="temp.sellerQQId"/>
        </el-form-item>
        <el-form-item label="QQ昵称" prop="title">
          <el-input v-model="temp.sellerQQName"/>
        </el-form-item>
        <el-form-item label="手机号" prop="title">
          <el-input v-model="temp.sellerPhoneNumber"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, updateSeller, deleteSeller, createSeller } from '@/api/seller'
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      giftPicList: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        sellerId: '',
        sellerName: ''
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        sellerId: '',
        sellerName: '',
        sellerShopName: '',
        sellerShopUrl: '',
        sellerWechatId: '',
        sellerWechatName: '',
        sellerQQId: '',
        sellerQQName: '',
        sellerPhoneNumber: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleUploadSuccess(response) {
      this.$message('上传成功')
      this.temp.sellerWechatName = response.data
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        sellerId: '',
        sellerName: '',
        sellerShopName: '',
        sellerShopUrl: '',
        sellerWechatId: '',
        sellerWechatName: '',
        sellerQQId: '',
        sellerQQName: '',
        sellerPhoneNumber: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      createSeller(this.temp).then(response => {
        this.$notify({
          title: response.msg,
          message: response.data,
          type: 'success',
          duration: 2000
        })
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      updateSeller(tempData).then(response => {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: 'message',
          message: response.data,
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleDelete(row) {
      const temp = Object.assign({}, row)
      deleteSeller(temp).then(response => {
        this.$notify({
          title: '成功',
          message: response.data,
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
