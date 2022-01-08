import Vue from "vue";
import VueRouter from "vue-router";

import { getItem } from "../common/utils";
const Home = () => import("../views/home/Home");
const Profile = () => import("../views/profile/Profile");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Detail = () => import("../views/detail/Detail");
const Login = () => import("../views/login/Login");

Vue.use(VueRouter);
const routes = [
  { path: "", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/cart", component: Cart },
  { path: "/profile", component: Profile },
  //传参数的方式别忘了，:加组件里有的data
  { path: "/detail/:iid", component: Detail },
  { path: "/login", component: Login }
];
const router = new VueRouter({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    // 去登录页，未登录则放行
    if (!getItem("loggedInUser")) {
      next();
    } else if (from.path !== "/cart" && from.path !== "/profile") {
      // 键入地址的回主页
      next("/home");
    } else {
      // 去结算和用户信息点过来的后面看情况处理
      console.log("页面还在施工中，完工才能放行噢");
    }
  } else {
    next();
  }
});

export default router;
