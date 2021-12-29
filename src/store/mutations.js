import {
  ADD_COUNTER,
  ADD_TO_CART,
  PLUS_CART_COUNT,
  MINUS_CART_COUNT,
  MODIFY_CART_COUNT
} from "./mutations-types";

export default {
  // 用来做方法名时记得加中括号
  [ADD_COUNTER](state, payload) {
    payload.purchase.count += payload.goods.count;
  },
  [ADD_TO_CART](state, payload) {
    // 加入购物车默认选中
    payload.checked = true;
    state.cartList.push(payload);
  },
  [PLUS_CART_COUNT](state, payload) {
    payload.count++;
    if (payload.count === 1) payload.checked = true;
  },
  [MINUS_CART_COUNT](state, payload) {
    payload.count--;
    if (payload.count === 0) payload.checked = false;
  },
  [MODIFY_CART_COUNT](state, payload) {
    // 由于都是有效修改，当前为0，则需选中，改后为0，则需反选
    if (payload.purchase.count === 0) payload.purchase.checked = true;
    payload.purchase.count = payload.nowCount;
    if (payload.nowCount === 0) payload.purchase.checked = false;
  }
};
