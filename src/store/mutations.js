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
  LOGGED_OUT,
  NEW_ADDRESS,
  MOD_ADDRESS,
  ROUTE_CHANGE
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
  },

  // 保存新地址信息和修改现有地址信息的操作
  // 也加入了默认地址的排序首位功能和取消其他地址的默认功能
  [NEW_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    // 逻辑类似于修改时勾选，还简单点
    if (payload.default) {
      addresses.unshift(payload);
      addresses.forEach((addr, id) => {
        addr.id = id;
        if (addr.default && addr.id) {
          addr.default = false;
        }
      });
    } else {
      payload.id = addresses.length;
      addresses.push(payload);
    }
  },
  [MOD_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    // 勾选默认且勾选前不是默认
    if (payload.default && payload.id !== 0) {
      // 删除这个元素、从头插入、修改id并去除其他默认
      addresses.splice(payload.id, 1);
      addresses.unshift(payload);
      addresses.forEach((addr, id) => {
        addr.id = id;
        if (addr.default && addr.id) {
          addr.default = false;
        }
      });
    } else {
      addresses[payload.id] = payload;
    }
  },

  // 记录路由跳转次数，决定是否可以后退
  [ROUTE_CHANGE](state, payload) {
    state.routeChangeCount++;
  }
};
