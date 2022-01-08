import {
  ADD_COUNTER,
  ADD_TO_CART,
  PLUS_CART_COUNT,
  MINUS_CART_COUNT,
  MODIFY_CART_COUNT,
  DELETE_CHOSEN,
  CHECKED_ITEM,
  CHECKED_ALL,
  LOGGED_IN,
  LOGGED_OUT
} from "./mutations-types";
import { syncUserInfo } from "../common/utils";
export default {
  // 用来做方法名时记得加中括号
  [ADD_COUNTER](state, payload) {
    payload.purchase.count += payload.goods.count;
    syncUserInfo(state);
  },
  [ADD_TO_CART](state, payload) {
    // 加入购物车默认选中
    payload.checked = true;
    state.cartList.push(payload);
    syncUserInfo(state);
  },
  [PLUS_CART_COUNT](state, payload) {
    payload.count++;
    if (payload.count === 1) payload.checked = true;
    syncUserInfo(state);
  },
  [MINUS_CART_COUNT](state, payload) {
    payload.count--;
    if (payload.count === 0) payload.checked = false;
    syncUserInfo(state);
  },
  [MODIFY_CART_COUNT](state, payload) {
    // 由于都是有效修改，当前为0，则需选中，改后为0，则需反选
    if (payload.purchase.count === 0) payload.purchase.checked = true;
    payload.purchase.count = payload.nowCount;
    if (payload.nowCount === 0) payload.purchase.checked = false;
    syncUserInfo(state);
  },
  [DELETE_CHOSEN](state, payload) {
    state.cartList = state.cartList.filter(item => {
      return !item.checked;
    });
    syncUserInfo(state);
  },
  // 购物车的选中和全选
  [CHECKED_ITEM](state, payload) {
    const index = state.cartList.indexOf(payload);
    state.cartList[index].checked = !payload.checked;
    syncUserInfo(state);
  },
  [CHECKED_ALL](state, payload) {
    if (payload) {
      state.cartList.forEach(item => (item.checked = false));
    } else {
      state.cartList.forEach(item => (item.checked = true));
    }
    syncUserInfo(state);
  },
  // 登录和登出的相关状态修改
  [LOGGED_IN](state, payload) {
    state.loggedIn = true;
    state.loggedInUser = payload.uname;
    state.userInfo[payload.uname] = payload;
    // 因为在登录时，用户购物车和游客购物车进行了合并，登录后现有购物车取用户购物车的值即可
    state.cartList = payload.cart;
  },
  [LOGGED_OUT](state, payload) {
    state.loggedIn = false;
    state.loggedInUser = "";
    state.userInfo[payload].isLoggedIn = false;
    state.cartList = [];
  }
};
