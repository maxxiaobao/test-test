<template>
  <el-container>
    <el-header class="header">
      电子处方
      <router-link to="/" class="menu-link"> 菜单</router-link>
    </el-header>
    <el-container>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.header {
  background-color: #b8d5f4;
  line-height: 60px;
}
.aside {
  .menu {
    text-align: center;
    height: calc(100vh - 60px);
  }
}

.el-menu {
  border: none;
}
.menu-link {
  float: right;
}
.el-menu-item {
  a {
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>
