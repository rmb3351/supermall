import Vue from "vue"
import VueRouter from "vue-router"
const Home = () => import("../views/home/Home")
const Profile = () => import("../views/profile/Profile")
const Classification = () => import("../views/classification/Classification")
const ShoppingCart = () => import("../views/shoppingcart/ShoppingCart")

Vue.use(VueRouter);
const routes=[
  { path: '', redirect: "/home" },
  { path: '/home', component: Home },
  { path: '/category', component: Classification },
  { path: '/cart', component: ShoppingCart },
  { path: '/profile', component: Profile }
]
const router =new VueRouter({
  routes,
})

export default router;