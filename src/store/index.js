import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  cartList: [],
  userInfo: {},
  // 方便判断登录状态和登录用户
  loggedIn: false,
  loggedInUser: "",
  routeChangeCount: 0,
  // 为了自动初始化，把type设为空让两个type都不匹配
  resizeType: "",
  hideTabBar: false
};

const store = new Vuex.Store({
  state,
  // 由于对于mutations的要求一般是简单且功能单一，所以这里重构一下
  mutations,
  actions,
  getters
});
export default store;
