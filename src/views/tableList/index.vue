<template>
  <section>
    <el-form>
      <el-form-item>
        <el-input placeholder="输入搜索名称" style="width: auto;" v-model="inputTex"></el-input>
        <el-button type="primary" @click="handleBtn">点击</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="性别">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      inputTex: '',
      tableData: []
    }
  },
  methods: {
    getList () {
      this.$http.post('/api/stuList').then(res => {
        console.log(res.data.respBody.stuList)
        this.tableData = res.data.respBody.stuList
      })
    },
    handleBtn () {
      let params = {
        name: this.inputTex
      }
      this.$http.post('/api/stuList/name', params).then(res => {
        console.log(res)
        this.tableData = res.data.respBody.stuList
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
