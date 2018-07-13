<template>
    <div class="router-content">
        <el-row >
            <el-col :span="16">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="userForm.sex" placeholder="请选择性别">
                  <el-option label="男" value=1></el-option>
                  <el-option label="女" value=0></el-option>
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
              <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </el-col>
        </el-row>
    </div>
</template>
<script>
  import Paas from '@/common/api/paas/index.js'
  import { idCardReg } from '@/common/validation/index.js'
  export default {
    data () {
      return {
        userForm: {
          name: '',
          addr: '',
          sex: '1',
          birth: '',
          idCard: '',
          age: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选输入住址', trigger: 'blur' }
          ],
          birth: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
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
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Paas.App.addUser(this.userForm).then(res => {
              this.$router.push({name: 'userList'})
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
