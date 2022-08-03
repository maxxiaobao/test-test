<template>
  <div class="about">
    <h1 class="title">人脸识别测试</h1>
    <input type="file" id="image" accept="image/*" capture="camera" multiple />
    <input type="file" id="video" accept="video/*" capture="camcorder" />
    <form id="take_picture">
      <video
        class="video"
        id="player"
        width="300"
        height="300"
        autoplay
        playsinline
      ></video>
    </form>
    <canvas
      style="display: block; margin: 0 auto"
      width="300"
      height="300"
      id="picture"
    ></canvas>
    <textarea
      style="display: block; margin: 10px auto"
      rows="10"
      cols="35"
      :value="faceInfo"
    ></textarea>
    <el-button @click="takePhoto">拍照</el-button>
    <el-button @click="uploadFace">上传</el-button>
    <el-button @click="getFaceIdTokenByBaidu">获取Token</el-button>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      image: "",
      faceInfo: "",
    };
  },
  mounted() {
    const mediaStreamContrains = {
      video: { width: 400, height: 400, frameRate: 15 },
      audio: false,
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Get camera
      navigator.mediaDevices
        .getUserMedia(mediaStreamContrains)
        .then((mediaStream) => {
          console.log("mediaStream", mediaStream);
          const localVideo = document.querySelector("video#player");
          localVideo.srcObject = mediaStream;
        })
        .catch((error) => {
          console.log("navigator.getUserMedia error: ", error);
        });
    } else if (navigator.getUserMedia) {
      window.alert(2);
    } else {
      window.alert(3);
    }
  },

  methods: {
    uploadFace() {
      if (!this.image) return;
      // 聚合数据文档 https://www.juhe.cn/box/index/id/388
      const key = "f75b779acdfdac725feaf4273734fa64";
      const api = `/faceDetect/index?key=${key}`;
      const params = new URLSearchParams();
      params.append("face_type", 1);
      params.append("image_type", 1);
      params.append("image", this.image);

      console.log("params", encodeURIComponent(this.image));
      this.axios
        .post(api, params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          console.log(response.data);
        });
    },

    async getAccessToken() {
      const apiKey = "skTwT8eP0wLBHlCNf3OFZI2W";
      const secretKey = "tHPdAdUIREqGXmCIwpF5tjpGcS4qWAsG";
      const api = `/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`;

      const { data } = await this.axios.post(api);
      console.log("data", data);
      return data;
    },

    async getFaceIdTokenByBaidu() {
      const { access_token } = await this.getAccessToken();

      const params = {
        image: this.image,
        image_type: "BASE64",
        max_face_num: 1,
      };

      const api = `/rest/2.0/face/v3/detect?access_token=${access_token}`;

      this.axios.post(api, params).then((response) => {
        console.log(response.data);
        this.faceInfo = JSON.stringify(response.data);
      });
    },

    takePhoto() {
      const localVideo = document.querySelector("video#player");
      const picture = document.querySelector("canvas#picture");
      const ctx = picture.getContext("2d");
      // ctx.filter = 'blur(3px)';

      ctx.drawImage(localVideo, 0, 0, picture.width, picture.height);
      this.image = picture.toDataURL("image/jpeg", 1.0);
    },
  },
};
</script>
