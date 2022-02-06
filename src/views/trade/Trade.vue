<template>
  <div class="trade-content">
    <back-nav-bar>
      <div slot="center">确认订单</div>
    </back-nav-bar>

    <!-- 地址栏 -->
    <div class="addr" @click="enterChoosing">
      <address-item :tradeAddr="nowAddress">
        <div slot="right" class="iconfont icon-youjiantou"></div>
      </address-item>
      <div class="bottom-line">
        <div class="line" v-for="i in 30" :key="i"></div>
      </div>
    </div>

    <!-- 商品清单 -->
    <trade-list class="list"></trade-list>

    <!-- 底部栏 -->
    <cart-bottom-bar v-show="isCompShow" class="bottom-bar">
      <!-- 购物车结算商品数量 -->
      <div v-if="!isSingle" slot="left" class="left">
        共{{ cartChecked.length }}件
      </div>
      <!-- 单件购买商品数量 -->
      <div v-else slot="left" class="left">共{{ singleData.count }}件</div>
      <div slot="center" class="center">
        合计
        <!-- 购物车结算显示价格 -->
        <div class="price" v-if="!isSingle">
          ￥
          <div class="int">{{ price.substring(0, price.length - 3) }}</div>
          {{ price.substr(price.length - 3) }}
        </div>
        <!-- 单件购买显示价格 -->
        <div class="price" v-else>
          ￥
          <div class="int">
            {{
              singleData.totalPrice.substring(
                0,
                singleData.totalPrice.length - 3
              )
            }}
          </div>
          {{ singleData.totalPrice.substr(singleData.totalPrice.length - 3) }}
        </div>
      </div>
      <div slot="right" class="right" @click="handleTrading">提交订单</div>
    </cart-bottom-bar>

    <!-- 确认支付框 -->
    <trade-confirm
      v-show="isConfirmShow"
      @shadowClick="isConfirmShow = false"
    ></trade-confirm>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import AddressItem from "../address/childComponents/AddressItem.vue";
import CartBottomBar from "views/cart/childComponents/CartBottomBar";
import TradeList from "./childComponents/TradeList.vue";
import TradeConfirm from "./childComponents/TradeConfirm";

import { mapGetters, mapState } from "vuex";

import { resetResizeMixin } from "common/mixins";
export default {
  name: "Trade",
  data() {
    return {
      nowAddress: {},
      isConfirmShow: false
    };
  },
  components: {
    BackNavBar,
    AddressItem,
    CartBottomBar,
    TradeList,
    TradeConfirm
  },
  mixins: [resetResizeMixin],
  computed: {
    ...mapGetters({
      addresses: "userAddresses",
      price: "cartPrice",
      cartChecked: "cartChecked",
      singleData: "singleBottomData"
    }),
    ...mapState({ isSingle: "handlingSinglePurchase" })
  },
  methods: {
    enterChoosing() {
      this.$router.push({ path: "/address", query: { type: "choose" } });
    },
    // 优先级：选中的=》默认的（第一个）=》空的
    resetShowingAddress() {
      const chosenAddress = this.addresses.filter(addr => addr.chosen);
      if (chosenAddress.length) {
        this.nowAddress = chosenAddress[0];
      } else if (this.addresses.length) {
        this.nowAddress = this.addresses[0];
      } else {
        this.nowAddress = {
          addr: "请选择收货地址"
        };
      }
    },
    handleTrading() {
      if (!this.addresses.length) {
        this.$toast.show("还未选择有效地址噢", 1500);
        return;
      }
      this.isConfirmShow = true;
    }
  },
  activated() {
    this.resetResize("trade");
    // 每次进入页面，刷新展示地址
    this.resetShowingAddress();
  }
};
</script>

<style scoped>
.trade-content {
  height: 100vh;
  background-color: rgb(243, 241, 244);
}
.addr {
  overflow: hidden;
  padding: 0;
  border-radius: 0 0 20px 20px;
  background-color: #fff;
}

.bottom-line {
  margin-top: -1.5vh;
  margin-left: 1.5vw;
  white-space: nowrap;
  transform: translateY(0.5vh);
}
.bottom-line .line {
  display: inline-block;
  margin-right: 3.2vw;
  width: 6vw;
  border-bottom: 5px solid var(--color-tint);
}
.bottom-line .line:nth-child(2n) {
  border-bottom: 5px solid rgb(119, 170, 251);
}

.list {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 20px;
}

.left {
  margin-left: 20px;
}
.bottom-bar {
  border-top: 1px solid #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 10vh;
  background-color: #fff;
}
.bottom-bar .right {
  margin-right: 20px;
  width: 30vw;
  height: 7vh;
  border-radius: 7vh;
  display: flex;
  justify-content: center;
  line-height: 7vh;
  background-color: var(--color-tint);
  color: #fff;
}
.bottom-bar .center {
  line-height: 30px;
}
.bottom-bar .price {
  color: var(--color-tint);
  font-weight: 700;
}
.bottom-bar .price .int {
  margin-top: -7px;
  font-weight: 550;
  font-size: 30px;
}
</style>
