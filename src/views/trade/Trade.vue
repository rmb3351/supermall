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
      <div slot="left" class="left">共{{ tradeInfo.count }}件</div>
      <div slot="center" class="center">
        <div class="price">
          ￥
          <div class="int">
            {{
              tradeInfo.totalPrice.substring(0, tradeInfo.totalPrice.length - 3)
            }}
          </div>
          {{ tradeInfo.totalPrice.substr(tradeInfo.totalPrice.length - 3) }}
        </div>
      </div>
      <button
        slot="right"
        class="right"
        @click="isConfirmShow = true"
        :disabled="!tradingCondition"
      >
        提交订单
      </button>
    </cart-bottom-bar>

    <!-- 确认支付框 -->
    <trade-confirm
      v-show="isConfirmShow"
      @shadowClick="isConfirmShow = false"
      @confirmClick="handleConfirmTrading"
      :totalPrice="tradeInfo.totalPrice"
    ></trade-confirm>

    <!-- 支付成功页面 -->
    <trade-success
      v-if="isSuccessPaid"
      :tradeMoney="cacheInfo.totalPrice"
    ></trade-success>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import AddressItem from "../address/childComponents/AddressItem.vue";
import CartBottomBar from "views/cart/childComponents/CartBottomBar";
import TradeList from "./childComponents/TradeList.vue";
import TradeConfirm from "./childComponents/TradeConfirm";
import TradeSuccess from "./childComponents/TradeSuccess.vue";

import { mapGetters, mapState } from "vuex";
import { COMFIRM_TRADE } from "@/store/mutations-types";

import { resetResizeMixin, deepCopyMixin } from "common/mixins";

export default {
  name: "Trade",
  data() {
    return {
      nowAddress: {},
      isConfirmShow: false,
      isSuccessPaid: false,
      cacheInfo: {}
    };
  },
  components: {
    // 组件复用
    BackNavBar,
    AddressItem,
    CartBottomBar,

    // 子组件
    TradeList,
    TradeConfirm,
    TradeSuccess
  },
  mixins: [resetResizeMixin, deepCopyMixin],
  computed: {
    ...mapGetters({
      addresses: "userAddresses",
      price: "cartPrice",
      cartCount: "cartCount",
      singleData: "singleBottomData"
    }),
    ...mapState({ isSingle: "handlingSinglePurchase" }),

    // 底部栏商品件数及总价
    tradeInfo() {
      if (this.isSingle) {
        return {
          count: this.singleData.count,
          totalPrice: this.singleData.totalPrice
        };
      } else {
        return {
          count: this.cartCount,
          totalPrice: this.price
        };
      }
    },

    // 提交订单按钮可用条件
    tradingCondition() {
      return this.nowAddress.addr !== "请选择收货地址" && this.tradeInfo.count;
    }
  },
  methods: {
    // 初始化页面
    initialPage() {
      this.isConfirmShow = false;
      this.isSuccessPaid = false;
      this.resetResize("trade");
      // 每次进入页面，刷新展示地址
      this.resetShowingAddress();
    },

    // 选择地址
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

    // 确认支付操作
    handleConfirmTrading() {
      this.isConfirmShow = false;
      this.isSuccessPaid = true;
      // 保存支付成功页面所需要的结算金额数据
      this.deepCopy(this.cacheInfo, this.tradeInfo);
      this.$store.commit(COMFIRM_TRADE, this.isSingle);
    }
  },
  activated() {
    this.initialPage();
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

/* 地址栏底部线条 */
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

/* 商品清单 */
.list {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
}

.left {
  margin-left: 20px;
}

/* 底部栏 */
.bottom-bar {
  border-top: 1px solid #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 10vh;
  background-color: #fff;
}
.bottom-bar .right {
  border: 0;
  outline: 0;
  margin-right: 20px;
  margin-top: 1.5vh;
  width: 30vw;
  height: 7vh;
  border-radius: 7vh;
  display: flex;
  justify-content: center;
  line-height: 7vh;
  background-color: var(--color-tint);
  color: #fff;
}
.bottom-bar .right:disabled {
  background: #ccc;
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
