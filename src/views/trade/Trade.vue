<template>
  <div class="trade-content">
    <back-nav-bar>
      <div slot="center">确认订单</div>
    </back-nav-bar>
    <div class="addr" @click="enterChoosing">
      <address-item :tradeAddr="showingAddress">
        <div slot="right" class="iconfont icon-youjiantou"></div>
      </address-item>
      <div class="bottom-line">
        <div class="line" v-for="i in 30" :key="i"></div>
      </div>
    </div>
    <trade-list class="list"></trade-list>
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
      <div slot="right" class="right">提交订单</div>
    </cart-bottom-bar>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import AddressItem from "../address/childComponents/AddressItem.vue";
import CartBottomBar from "views/cart/childComponents/CartBottomBar";
import TradeList from "./childComponents/TradeList.vue";

import { mapGetters, mapState } from "vuex";

import { resetResizeMixin } from "common/mixins";
export default {
  name: "Trade",
  data() {
    return {
      addrId: 0
    };
  },
  components: {
    BackNavBar,
    AddressItem,
    CartBottomBar,
    TradeList
  },
  mixins: [resetResizeMixin],
  computed: {
    ...mapGetters({
      addresses: "userAddresses",
      price: "cartPrice",
      cartChecked: "cartChecked",
      singleData: "singleBottomData"
    }),
    ...mapState({ isSingle: "handlingSinglePurchase", id: "addressId" }),
    showingAddress() {
      if (this.addrId !== undefined) {
        console.log(this.addrId);
        return this.addresses[this.addrId];
      } else {
        return {
          addr: "请选择收货地址"
        };
      }
    }
  },
  methods: {
    enterChoosing() {
      this.$router.push({ path: "/address", query: { type: "choose" } });
    },
    // 确保地址id有效，每次activated主动调用
    checkAddressId() {
      if (this.addresses.length > this.id) {
        this.addrId = this.id;
      } else if (this.addresses.length > 0) {
        this.addrId = 0;
      } else {
        this.addrId = undefined;
      }
    }
  },
  activated() {
    this.resetResize("trade");
    this.checkAddressId();
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
