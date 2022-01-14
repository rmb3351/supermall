import Vue from "vue";
import VueRouter from "vue-router";

import { getItem } from "../common/utils";
const Home = () => import("../views/home/Home");
const Profile = () => import("../views/profile/Profile");
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Detail = () => import("../views/detail/Detail");
const Login = () => import("../views/login/Login");
const Address = () => import("../views/address/Address");
const NewAddress = () => import("../views/address/childComponents/NewAddress");
const ModifyAddress = () =>
  import("../views/address/childComponents/ModifyAddress");
const Trade = () => import("../views/trade/Trade");

Vue.use(VueRouter);
const routes = [
  { path: "", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/cart", component: Cart },
  { path: "/profile", component: Profile },
  //传参数的方式别忘了，:加组件里有的data
  { path: "/detail/:iid", component: Detail },
  { path: "/login", component: Login },
  {
    path: "/address/",
    component: Address,
    // 函数连续解构写法
    props({ query: { type } }) {
      return { type };
    },
    children: [
      { path: "newAddr", component: NewAddress },
      { path: "modAddr/:aid", props: true, component: ModifyAddress }
    ]
  },
  {
    path: "/trade",
    component: Trade,
    props({ query: { id } }) {
      return { id };
    }
  }
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
    } else if (from.path === "/profile") {
      next("/address");
    } else {
      // 去结算的后面看情况处理
      console.log("页面还在施工中，下次再尝试噢");
    }
  } else if (to.path.indexOf("address") !== -1) {
    // 去地址页，未登录回主页
    if (!getItem("loggedInUser")) {
      next("/home");
    } else if (to.path.indexOf("modAddr") !== -1) {
      // 登录则验证地址id是否合法
      const idPattern = /modAddr\/(\d*)/;
      // 正则捕获aid，只会获取正整数
      let aid = idPattern.exec(to.path)[1];
      // 排除第一位不是数字（负数或者乱输）
      if (aid === "") return;
      aid *= 1;
      const user = getItem("loggedInUser");
      const userInfo = getItem(user);
      if (aid < userInfo.addresses.length) {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
