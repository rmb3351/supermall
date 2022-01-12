import Vue from "vue";
import App from "./App.vue";
// vue路由和vuex都是在main.js里导入和注册的
import router from "./router";
import store from "./store";
// 指定文件夹就是导入该目录下的index.js文件
import toast from "components/common/toast";
// 这个库用于解决移动端点击的300ms延迟
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";
import VConsole from "vconsole";

Vue.config.productionTip = false;
const vconsole = new VConsole();
export default vconsole;
// 在这里创建vue原型的$bus对象
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
