<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
      <button class="btn-top-right" slot="right" @click="manageCart">
        {{ buttonName[currentIndex] }}
      </button>
    </nav-bar>
    <scroll class="wrapper" ref="scroll" :probetype="3">
      <cart-list class="cart-list"></cart-list>
    </scroll>
    <cart-bottom-bar :isManaging="isManaging"></cart-bottom-bar>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      // 记录购物车商品数量，根据这个同步与否决定scroll是否刷新
      purchaseCount: 0,
      buttonName: ["管理", "完成"],
      currentIndex: 0,
      isManaging: false
    };
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    // mapgetters函数的两种用法:1.直接按原名映射过来，在参数里放数组，数组里放每个函数名的字符串就行
    // ...mapGetters(["cartLength","cart"])
    // 2.参数里放对象，然后键用作映射过来后的别名，值就是映射的函数名(注意这里键和值缺一不可)
    ...mapGetters({
      length: "cartLength",
      cart: "cart"
    })
  },
  methods: {
    manageCart() {
      this.currentIndex = (this.currentIndex + 1) % 2;
      this.isManaging = !this.isManaging;
    }
  },
  activated() {
    // console.log("activated");
    this.$refs.scroll.scrollRefresh();
  }
};
</script>

<style scoped></style>
