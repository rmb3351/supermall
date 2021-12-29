import {
  ADD_COUNTER,
  ADD_TO_CART,
  PLUS_CART_COUNT,
  MINUS_CART_COUNT,
  MODIFY_CART_COUNT
} from "./mutations-types";
export default {
  // context是肯定要的参数，但是如果要用state里的东西，还是需要加state，形如context.state
  addToCart(context, goods) {
    // vuex里的actions要和外界通信还要有先后执行顺序的话最好是返回promise，外界再then
    return new Promise((resolve, reject) => {
      // find是数组方法，即查找满足参数函数条件的item，并把item返回给purchase
      let purchase = context.state.cartList.find(item => item.iid == goods.iid);
      if (purchase) {
        // 如果商品列表里已经有这件商品，那么数量增加，两个商品对象的数据都需要
        context.commit(ADD_COUNTER, { purchase, goods });
        resolve("商品数量增加");
      } else {
        // 如果无，那就添加
        // state.cartList.push(goods)
        context.commit(ADD_TO_CART, goods);
        resolve("添加新商品");
      }
      // state.cartList.push(goods)
      // console.log(context.state.cartList);
    });
  },
  // 增加、减少购物车相应商品的数量
  plusCartCount(context, goods) {
    return new Promise((resolve, reject) => {
      let purchase = context.state.cartList.find(item => item.iid == goods.iid);
      if (purchase.count === 0) {
        resolve("又为您选中这个商品啦");
      }
      context.commit(PLUS_CART_COUNT, purchase);
    });
  },
  minusCartCount(context, goods) {
    let purchase = context.state.cartList.find(item => item.iid == goods.iid);
    context.commit(MINUS_CART_COUNT, purchase);
  },
  // 直接修改购物车商品数量
  modifyCartCount(context, goods) {
    return new Promise((resolve, reject) => {
      let purchase = context.state.cartList.find(
        item => item.iid == goods.purchase.iid
      );
      if (purchase.count === 0) {
        resolve("又为您选中这个商品啦");
      } else if (goods.value === 0) {
        resolve("帮您取消选中啦");
      }
      context.commit(MODIFY_CART_COUNT, { purchase, nowCount: goods.value });
    });
  }
};
