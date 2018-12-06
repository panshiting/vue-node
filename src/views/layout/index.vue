<template>
  <div class="contain">
    <div class="slider">
      <el-menu router default-active="/" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!--<el-submenu index="1">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span slot="title">首页</span>-->
          <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
        <!--</el-submenu>-->
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item :index="`/list`">
          <i class="el-icon-menu"></i>
          <span slot="title">列表</span>
        </el-menu-item>
        <el-menu-item index="/test1">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="/test2">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
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
