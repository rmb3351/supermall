<template>
  <div class="list">
    <cart-list-item
      class="item"
      v-for="(item, index) in cartChecked"
      :key="index"
      :purchase="item"
    >
      <div slot="left"></div
    ></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "views/cart/childComponents/CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "TradeList",
  data() {
    return {};
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartChecked"])
  }
};
</script>

<style scoped></style>
