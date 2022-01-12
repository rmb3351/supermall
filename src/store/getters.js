export default {
  // 这里的方法还是需要把state传进来
  cartLength(state) {
    return state.cartList.length;
  },
  cart(state) {
    return state.cartList;
  },
  // 选中的商品
  cartChecked(state, getters) {
    return getters.cart.filter(item => item.checked);
  },
  checkedCount(state, getters) {
    return getters.cartChecked.length;
  },
  // 合计价格
  cartPrice(state, getters) {
    return getters.cartChecked
      .reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0)
      .toFixed(2);
  },
  // 是否已经全选
  cartCheckedAll(state, getters) {
    // 空车不全选
    if (!getters.cartLength) return false;
    return getters.checkedCount === getters.cartLength;
  },
  userAddresses(state, getters) {
    if (!state.loggedInUser) return [];
    return state.userInfo[state.loggedInUser].addresses;
  }
};
