<template>
  <div class="container">
    <el-card class="login">
      <h1 class="title">登录</h1>
      <el-form ref="form" label-width="80px">
        <el-form-item label="身份证号" class="card-box">
          <el-input v-model="form.IDCardNum"></el-input>
        </el-form-item>
        <el-form-item label="私钥">
          <el-input v-model="form.privateKey" type="textarea"></el-input>
        </el-form-item>
        <div class="button-group">
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button @click="goRegister">注册</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import SMCrypto from "sm-crypto";
import router from "../router";
export default {
  data() {
    return {
      form: {
        IDCardNum: "",
        privateKey: "",
      },
    };
  },
  mounted() {
    const privateKey = localStorage.getItem("privateKey");
    this.form.privateKey = privateKey;
    console.log("mounted");
  },
  methods: {
    copyPrivateKey() {
      console.log("copyPrivateKey");
    },
    onSubmit() {
      const { publicKey, privateKey } = this.form;
      localStorage.setItem("privateKey", privateKey);
      localStorage.setItem("publicKey", publicKey);
      this.$message("注册成功");
    },
    goRegister() {
      router.push("/register");
    },
    onLogin() {
      const { sm2 } = SMCrypto;
      const privateKey = this.form.privateKey;
      const publicKey = localStorage.getItem("publicKey");
      const date = new Date().getTime().toString();

      if (!privateKey || !publicKey) {
        this.$message("没有找的相应的公钥或者私钥");
        return;
      } else {
        const signData = sm2.doSignature(date, privateKey);
        const verifyRes = sm2.doVerifySignature(date, signData, publicKey);
        console.log("verifyRes------", verifyRes);
        if (verifyRes) {
          router.push("/");
        } else {
          this.$message("登录错误，请检查私钥是否正确");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  @media (max-width: 390px) {
    width: 100%;
  }
  width: 45%;
  max-width: 450px;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
}
.button-group {
  display: flex;
  justify-content: center;
}
.card-box {
  flex-grow: 1;
  margin-right: 12px;
}
</style>
