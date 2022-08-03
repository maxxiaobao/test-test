<template>
  <el-container>
    <el-header class="header">电子处方</el-header>
    <el-container>
      <el-main>
        <el-menu class="menu">
          <el-menu-item index="2">
            <router-link to="/about">我的信息</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/prescriptionList">我的处方</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/facetest">人脸认证</router-link>
          </el-menu-item>
        </el-menu>
      </el-main>
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
.el-menu-item {
  a {
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>
