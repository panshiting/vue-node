<template>
  <div class="contain">
    <div class="slider">
      <el-menu
        router
        :default-active="key"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/" key="/">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item :index="`/list`" key="/list">
          <i class="el-icon-menu"></i>
          <span slot="title">列表</span>
        </el-menu-item>
        <el-menu-item index="/test1" key="/test1">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="/test2" key="/test2">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-container">
      <router-view :key="key"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped lang="scss">
.contain {
  position: relative;
  width: 100%;
  height: 100%;
  .slider {
    width: 200px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    .el-menu {
      height: 100%;
    }
  }
  .main-container {
    height: 100%;
    margin-left: 200px;
    padding: 20px;
  }
}
</style>
