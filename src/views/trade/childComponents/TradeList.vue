<template>
  <div class="list">
    <cart-list-item v-if="isSingle" :purchase="purchase"></cart-list-item>
    <div class="cart-list" v-else>
      <cart-list-item
        class="item"
        v-for="(item, index) in cartChecked"
        :key="index"
        :purchase="item"
      >
        <div slot="left"></div
      ></cart-list-item>
    </div>
  </div>
</template>

<script>
import CartListItem from "views/cart/childComponents/CartListItem";

import { mapGetters, mapState } from "vuex";
export default {
  name: "TradeList",
  data() {
    return {};
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartChecked"]),
    ...mapState({
      isSingle: "handlingSinglePurchase",
      purchase: "singlePurchase"
    })
  }
};
</script>

<style scoped></style>
