<template>
  <div class="about">
    <h1 class="title">私钥</h1>
    <el-card style="word-break: break-word">
      <el-button @click="clearPrivateKey"> 清除私钥 </el-button>
      {{ privateKey }}
    </el-card>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      privateKey: "",
    };
  },
  mounted() {
    this.generateKey();
  },
  methods: {
    generateKey() {
      this.privateKey = localStorage.getItem("privateKey");
    },
    clearPrivateKey() {
      localStorage.removeItem("privateKey");
      localStorage.removeItem("publicKey");
      this.privateKey = "";
      router.push("/register");
    },
  },
};
</script>

<style>
.about {
  width: 100%;
  padding: 30px;
  text-align: center;
}
.title {
  margin-bottom: 16px;
}
</style>
