<template>
  <section class="form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男" value="男"></el-radio>
          <el-radio label="女" value="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">新建</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'TableAdd',
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        age: '',
        sex: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getDetail (id) {
      let config = {
        method: 'get',
        url: `/api/stuList/detail/${id}`
      }
      this.$http(config).then(res => {
        if (res.data.respBody.stu) {
          this.ruleForm = res.data.respBody.stu
        }
      }).catch(e => {
        console.log(e)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit () {
      let config = {
        method: 'post',
        url: '/api/stuList/add',
        headers: {
          'Content-type': 'application/json'
        },
        data: {
          ...this.ruleForm
        }
      }
      this.$http(config).then(res => {
        if (res.data.respHeader.message === '正确执行') {
          this.$message.success('新增成功')
          this.$refs['ruleForm'].resetFields()
          this.$router.push({name: 'TableList'})
        }
      }).catch(e => {
        console.log(e)
      })
    },
    goBack () {
      this.$refs['ruleForm'].resetFields()
      this.$router.push({name: 'TableList'})
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .form {
    padding: 20px;
  }
</style>
