<template>
    <div class="router-content">
      <div>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
           <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="searchForm.sex" placeholder="请选择性别">
              <el-option label="全部" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="denger" @click="deleterList">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
     <el-col :span="23" >
    <el-table
      ref="multipleTable"
      :data="userList"
      border
      @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            header-align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
            align="center"
            header-align="center"
            width="260">
          </el-table-column>
           <el-table-column
            prop="birth"
            label="出生日期"
            align="center"
            header-align="center"
            width="260">
          </el-table-column>
           <el-table-column
            prop="sex"
            label="性别"
            align="center"
            header-align="center"
            width="140">
               <template slot-scope="scope">
                   {{ scope.row.sex === '1' ? '男': '女' }}
               </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
               <el-button type="text"
                @click="editUser(scope.row)">编辑</el-button>
                <el-button type="text"
                @click="deletUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
    <div class="block" style="margin-top:10px;text-align:right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageNo"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    </el-col>
    <el-dialog title="编辑用户" :visible.sync="dialogVisible" @close="handleClose">
         <el-row >
            <el-col :span="20">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="userForm.sex" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input type="number" v-model="userForm.age"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="userForm.idCard"></el-input>
              </el-form-item>
              
              <el-form-item label="出生日期" prop="birth">
                  <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="userForm.birth" style="width: 100%;">
                    
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="地址" prop="addr">
                <el-input v-model="userForm.addr"></el-input>
              </el-form-item>
          
              <el-form-item label="个人介绍" prop="desc">
                <el-input type="textarea" v-model="userForm.desc"></el-input>
              </el-form-item>
            </el-form>
        </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
  import Paas from '@/common/api/paas/index.js'
  import { idCardReg } from '@/common/validation/index.js'
  export default {
    data () {
      return {
        searchForm: {
          name: '',
          sex: '',
          pageNo: 1,
          pageSize: 10
        },
        total: 0,
        userList: [],
        selectIds: [],
        dialogVisible: false,
        userForm: {},
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选输入住址', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: idCardReg, trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写个人介绍', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      getUserList () {
        Paas.App.getList(this.searchForm).then(res => {
          console.log(res)
          this.total = res.total
          this.userList = res.userList
        })
      },
      search () {
        this.searchForm.pageNo = 1
        this.getUserList()
      },
      handleSizeChange (val) {
        this.searchForm.pageSize = val
        this.searchForm.pageNo = 1
        this.getUserList()
      },
      handleCurrentChange (val) {
        this.searchForm.pageNo = val
        this.getUserList()
      },
      handleSelectionChange (data, row) {
        this.selectIds = []
        console.log(data, row)
        data.forEach(item => {
          this.selectIds.push(item.id)
        })
      },
      deleterList () {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Paas.App.deleteUserList({ids: this.selectIds.join(',')}).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUserList()
          })
        }).catch(() => {
        })
      },
      deletUser (data) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Paas.App.deleteUser(data).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUserList()
          })
        }).catch(() => {
        })
      },
      editUser (data) {
        console.log(data)
        this.userForm = JSON.parse(JSON.stringify(data))
        this.dialogVisible = true
      },
      handleClose () {
        this.$refs['userForm'].resetFields()
      },
      submit () {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            Paas.App.editUser(this.userForm).then(res => {
              this.$message.success(res.msg)
              this.dialogVisible = false
              this.getUserList()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
