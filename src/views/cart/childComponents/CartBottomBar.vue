<template>
  <div class="cart-bottom-bar">
    <div>
      <check-button
        :is-checked="cartCheckedAll"
        class="check-button"
        @click.native="checkAll"
      >
      </check-button>
      <div>全选</div>
    </div>
    <div class="show-price">合计：￥ {{ cartPrice }}</div>
    <span class="go-buy" @click="pay" v-show="!isManaging"
      >去结算({{ checkedCount }})</span
    >
    <span class="go-bye" @click="checkForDelete" v-show="isManaging">移除</span>
    <div class="check-for-delete" v-show="isChecking">
      <div>
        <span>确定删除这些吗？</span>
        <button class="btn_left" @click="deleteItems">确定</button>
        <button class="btn_right" @click="isChecking = !isChecking">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { DELETE_CHOSEN, CHECKED_ALL } from "@/store/mutations-types.js";

import { mapGetters, mapState } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {
      // 决定是否显示遮罩层
      isChecking: false
    };
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      "cart",
      "cartLength",
      "cartChecked",
      "checkedCount",
      "cartPrice",
      "cartCheckedAll"
    ]),
    ...mapState({
      isIn: "loggedIn"
    })
  },
  methods: {
    checkAll() {
      // 为了响应式，交给mutations更新购物车
      this.$store.commit(CHECKED_ALL, this.cartCheckedAll);
    },
    pay() {
      // 需要内置转换，因为cartPrice保留了小数
      if (this.cartPrice == 0) {
        this.$toast.show("请先选择要购买的商品");
      } else {
        this.$router.replace("/login");
      }
    },
    deleteItems() {
      this.$store.commit(DELETE_CHOSEN);
      this.isChecking = !this.isChecking;
    },
    checkForDelete() {
      if (!this.checkedCount) {
        this.$toast.show("请选择要删除的商品");
        return;
      }
      this.isChecking = !this.isChecking;
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}
.cart-bottom-bar div {
  display: flex;
  align-self: center;
  margin-right: 5px;
}
.check-button {
  flex: 1;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.show-price {
  flex: 1;
  margin-left: 10px;
}
.show-count {
  height: 40px;
  width: 90px;
  background: crimson;
  color: #eee;
  margin-right: 0;
  padding-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>
