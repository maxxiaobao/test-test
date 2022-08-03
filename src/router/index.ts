import { createRouter, createWebHistory } from "vue-router";
import SMCrypto from "sm-crypto";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MenuView from "../views/MenuView.vue";
import DashboardView from "../views/DashboardView.vue";
import AboutView from "../views/AboutView.vue";
import FaceTest from "../views/FaceTest.vue";
import PrescriptionListView from "../views/PrescriptionListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "menu",
      component: MenuView,
      children: [{ path: "menu", component: MenuView }],
    },
    {
      path: "/",
      name: "about",
      component: DashboardView,
      children: [{ path: "about", component: AboutView }],
    },
    {
      path: "/",
      name: "prescriptionList",
      component: DashboardView,
      children: [
        {
          path: "prescriptionList",
          component: PrescriptionListView,
        },
      ],
    },
    {
      path: "/facetest",
      name: "facetest",
      component: FaceTest,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { sm2 } = SMCrypto;
  const privateKey = localStorage.getItem("privateKey");
  const publicKey = localStorage.getItem("publicKey");
  const date = new Date().getTime().toString();
  console.log(privateKey, publicKey);

  if (!privateKey || !publicKey) {
    if (
      to.name === "register" ||
      to.name === "login" ||
      to.name === "facetest"
    ) {
      next();
    } else {
      next({ path: "/register" });
    }
  } else {
    const signData = sm2.doSignature(date, privateKey);
    const verifyRes = sm2.doVerifySignature(date, signData, publicKey);

    if (!verifyRes && to.name !== "register" && to.name !== "login") {
      return { name: "register" };
    } else {
      next();
    }
  }
});

export default router;
