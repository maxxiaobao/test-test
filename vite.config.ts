import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/faceDetect": {
        target: "http://apis.juhe.cn",
        changeOrigin: true,
      },
      "/faceToken": {
        target: "https://faceid.tencentcloudapi.com",
        changeOrigin: true,
        rewrite(path) {
          return "/";
        },
      },
      "/oauth": {
        target: "https://aip.baidubce.com",
        changeOrigin: true,
      },
      "/rest": {
        target: "https://aip.baidubce.com",
        changeOrigin: true,
      },
    },
  },
});
