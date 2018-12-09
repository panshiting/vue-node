<template>
  <section class="table-list">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="goToAdd">新增</el-button>
      </el-form-item>
      <el-form-item class="search">
        <el-input placeholder="输入搜索名称" style="width: auto;" v-model="inputTex"></el-input>
        <el-button type="primary" @click.prevent="getList">点击</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="性别">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="goToEdit(scope.row.id)">
            编辑
          </el-button>
          <span>|</span>
          <el-button type="text" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
          <!--<el-dropdown>-->
            <!--<el-button type="text">更多</el-button>-->
            <!--<el-dropdown-menu slot="dropdown">-->
              <!--<el-dropdown-item @click.native.prevent="goToEdit(scope.row.entityId)">-->
                <!--编辑-->
              <!--</el-dropdown-item>-->
              <!--<el-dropdown-item @click.native.prevent="handleDelete(scope.row)">-->
                <!--删除-->
              <!--</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        </template>
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
      let config = {
        method: 'post',
        url: '/api/stuList',
        data: {
          name: this.inputTex
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$http(config).then(res => {
        console.log(res)
        this.tableData = res.data.respBody.stuList
      })
    },
    goToAdd () {
      this.$router.push({ path: '/list/add' })
    },
    goToEdit (id) {
      this.$router.push({ path: `/list/edit/${id}` })
    },
    handleDelete (id) {
      this.$confirm(
        '确定删除数据吗?',
        '提示',
        {type: 'warning'}
      ).then(() => {
        let config = {
          method: 'get',
          url: `/api/stuList/delete/${id}`
        }
        this.$http(config).then(res => {
          if (res.data.respHeader.message === '正确执行') {
            this.$message.success('删除成功')
            this.getList()
          }
        }).catch(e => {
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/mixin";
  .table-list {
    @include clearfix;
    .el-form-item {
      display: inline-block;
    }
    .search {
      float: right;
    }
  }
</style>
