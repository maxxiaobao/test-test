<template>
  <div class="container">
    <h1>处方列表</h1>
    <div class="list">
      <div
        v-for="item in list"
        :key="item.id"
        :data-id="item.id"
        @click="showQRCode"
        class="item"
      >
        {{ item.name + " - " + item.id }}
      </div>
    </div>
  </div>
  <div v-if="isShowQRCode" class="model">
    <div class="qrcode">
      <qrcode-vue :value="QRCodeValue" size="300" />

      <div class="close-icon" @click="hideQRCode">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import SMCrypto from "sm-crypto";
import * as Vue from "vue";

export default {
  data() {
    return {
      QRCodeValue: "",
      isShowQRCode: false,
      list: [
        {
          id: 1,
          name: "处方1",
          signDoc: "0001",
          items: [
            {
              id: "item01-01",
              count: 1,
              name: "药品成分01",
            },
            {
              id: "item01-02",
              count: 1,
              name: "药品成分02",
            },
          ],
        },
        {
          id: 2,
          name: "处方2",
          signDoc: "0002",
          items: [
            {
              id: "item02-01",
              count: 1,
              name: "药品成分01",
            },
            {
              id: "item02-02",
              count: 1,
              name: "药品成分02",
            },
          ],
        },
      ],
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    showQRCode({ target: { dataset } }) {
      const id = "1";
      console.log("event-", dataset);

      const privateKey = localStorage.getItem("privateKey");
      const publicKey = localStorage.getItem("publicKey");
      const timestamp = new Date().getTime();
      const signData = SMCrypto.sm2.doSignature(id + timestamp, privateKey);
      const data = {
        publicKey,
        id,
        timestamp,
        signData,
      };
      const QRCodeValue = JSON.stringify(data);
      this.QRCodeValue = QRCodeValue;
      this.isShowQRCode = true;
    },

    hideQRCode() {
      this.isShowQRCode = false;
      this.QRCodeValue = "";
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  padding: 30px;
  text-align: center;
}
.list {
  margin-top: 16px;
}
.model {
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ccc;
  .qrcode {
    position: relative;
    left: calc(50% - 150px);
    top: calc(50% - 150px);
  }
}
.close-icon {
  width: 30px;
  height: 30px;
  margin-left: 135px;
}
.item {
  height: 45px;
  line-height: 50px;
  background-color: #ccc;
  margin-bottom: 16px;
  padding-left: 16px;
}
</style>
