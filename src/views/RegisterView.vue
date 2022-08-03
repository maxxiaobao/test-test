<template>
  <div class="container">
    <el-card class="register">
      <h1 class="title">注册</h1>
      <el-form ref="form" label-width="80px">
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="身份证号" class="card-box">
            <el-input v-model="form.IDCardNum"></el-input>
          </el-form-item>
          <el-button type="primary" @click="generateKey">生成私钥</el-button>
        </div>
        <el-form-item label="公钥">
          <el-input
            v-model="form.publicKey"
            type="textarea"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="私钥">
          <el-input
            v-model="form.privateKey"
            type="textarea"
            disabled
          ></el-input>
        </el-form-item>
        <div class="button-group">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="goLogin">登录</el-button>
          <!--<el-button @click="verifyPublicKey">验证公钥+验签登录</el-button> -->
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
        publicKey: "",
        privateKey: "",
      },
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    generateKey() {
      const { publicKey, privateKey } = SMCrypto.sm2.generateKeyPairHex();
      this.form = { ...this.form, publicKey, privateKey };
    },
    copyPrivateKey() {
      console.log("copyPrivateKey");
    },
    onSubmit() {
      const { publicKey, privateKey } = this.form;
      localStorage.setItem("privateKey", privateKey);
      localStorage.setItem("publicKey", publicKey);
      this.$message("注册成功");
    },
    goLogin() {
      router.push("/login");
    },
    verifyPublicKey() {
      const privateKey = localStorage.getItem("privateKey");
      const publicKey = localStorage.getItem("publicKey");
      console.log("verifyPublicKey-publicKey", publicKey);
      console.log("verifyPublicKey-privateKey", privateKey);
      let verifyResult = SMCrypto.sm2.verifyPublicKey(publicKey);
      console.log("this.$history", this);
      if (verifyResult) {
        router.push("/");
      } else {
        this.$message.error("验证失败");
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
.register {
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
