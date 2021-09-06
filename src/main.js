import Vue from 'vue'
import App from './App.vue'
import router from "./router"

Vue.config.productionTip = false
// 在这里创建vue原型的$bus对象
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
