<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.taskId" style="width: 200px;" class="filter-item" placeholder="任务Id" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.taskStatus" clearable style="width: 200px" placeholder="任务状态" class="filter-item">
        <el-option v-for="item in taskStatusOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-input v-model="listQuery.sellerId" style="width: 200px;" class="filter-item" placeholder="商家Id" @keyup.enter.native="handleFilter"/>
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
      <el-table-column label="Id" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.tid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖家Id" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.tsellerId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="押款金额" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tchargeAmout }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tprogress }}</span>/<span>{{ scope.row.ttotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠品" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.tgift }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠品url" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.tgiftPicUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预热时间" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.tpreheatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" class-name="status-col" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.tpublishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" class-name="status-col" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.tfinishTime }}</span>
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
        <el-form-item label="Id" prop="type">
          <el-input v-model="temp.tid"/>
        </el-form-item>
        <el-form-item label="名称" prop="timestamp">
          <el-input v-model="temp.tname"/>
        </el-form-item>
        <el-form-item label="卖家Id" prop="title">
          <el-input v-model="temp.tsellerId"/>
        </el-form-item>
        <el-form-item label="押款金额" prop="title">
          <el-input v-model="temp.tchargeAmout"/>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='update'" label="进度" prop="title">
          <el-input v-model="temp.tprogress"/>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="任务总数" prop="title">
          <el-input v-model="temp.ttotal"/>
        </el-form-item>
        <el-form-item label="赠品图片" prop="title">
          <el-input v-model="temp.tgiftPicUrl"/>
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            multiple="false"
            class="upload-demo"
            action="http://localhost:9001/oss/upload/img"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="赠品" prop="title">
          <el-input v-model="temp.tgift"/>
        </el-form-item>
        <el-form-item label="预热时间" prop="title">
          <el-date-picker v-model="temp.tpreheatTime" type="datetime" placeholder="选择预热时间" align="right" value-format="yyyy-MM-dd HH:mm:00" format="yyyy-MM-dd HH:mm:00"/>
        </el-form-item>
        <el-form-item label="发布时间" prop="title">
          <el-date-picker v-model="temp.tpublishTime" type="datetime" placeholder="选择发布时间" align="right" value-format="yyyy-MM-dd HH:mm:00" format="yyyy-MM-dd HH:mm:00"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="title">
          <el-date-picker v-model="temp.tfinishTime" type="datetime" placeholder="选择结束时间" align="right" value-format="yyyy-MM-dd HH:mm:00" format="yyyy-MM-dd HH:mm:00"/>
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
import { fetchList, updateTask, deleteTask, createTask, getTaskId } from '@/api/task'
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
        taskId: '',
        sellerId: '',
        taskStatus: '已发布'
      },
      taskStatusOptions: ['未开始', '预热中', '已发布', '已结束'],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        tid: '',
        tname: '',
        tsellerId: '',
        tgift: '',
        tgiftPicUrl: '',
        tpreheatTime: '',
        tpublishTime: '',
        tfinishTime: '',
        tprogress: '',
        ttotal: '',
        tchargeAmout: ''
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
      this.temp.tgiftPicUrl = response.data
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
        tid: '',
        tname: '',
        tsellerId: '',
        tgift: '',
        tgiftPicUrl: '',
        tpreheatTime: '',
        tpublishTime: '',
        tfinishTime: '',
        tprogress: '',
        ttotal: '',
        tchargeAmout: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      getTaskId().then(response => {
        this.temp.tid = response.data
      })
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      createTask(this.temp).then(response => {
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
      updateTask(tempData).then(response => {
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
      deleteTask(temp).then(response => {
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
