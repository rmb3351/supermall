<template>
  <div class="confirm">
    <div class="shadow" @click="handleShadowClick"></div>
    <div class="confirm-box">
      <div class="price-box">
        <div class="price">
          ￥
          <div class="int">8299</div>
          .00
        </div>
      </div>
      <div class="payway-box">
        <div class="payway">
          <div class="payway-left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifubao"></use>
            </svg>
            支付宝支付
          </div>
          <input type="radio" class="payway-right" name="payway" />
        </div>
        <div class="payway">
          <div class="payway-left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixinzhifu"></use></svg
            >微信支付
          </div>
          <input type="radio" class="payway-right" name="payway" />
        </div>
        <div class="payway">
          <div class="payway-left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yunshanfu"></use></svg
            >云闪付
          </div>
          <input type="radio" class="payway-right" name="payway" />
        </div>
      </div>
      <div class="bottom-btn-box">
        <div class="pay-btn">微信支付￥8299.00</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradeConfirm",
  data() {
    return {};
  },
  methods: {
    handleShadowClick() {
      this.$emit("shadowClick");
    }
  }
};
</script>

<style scoped>
.confirm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.shadow {
  height: 45%;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
}

/* 底部确认框样式 */
.confirm-box {
  position: relative;
  height: 55%;
  width: 100vw;
  background-color: rgb(245, 245, 245);
}

/* 价格栏 */
.confirm-box .price-box {
  height: 18%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-box div {
  display: inline-block;
}
.price-box .price {
  color: var(--color-tint);
  font-weight: 700;
}
.price-box .price .int {
  margin-top: -7px;
  font-weight: 550;
  font-size: 30px;
}

/* 支付框样式 */
.confirm-box .payway-box {
  height: 54%;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}
/* 支付栏 */
.payway-box .payway {
  flex: 1;
  border-bottom: 1px solid burlywood;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  line-height: 16px;
}
.payway-box .payway:last-child {
  border-bottom: 0;
}
.payway-left {
  display: flex;
  align-items: center;
}

.payway .icon {
  width: 2.5em;
  height: 2.5em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 10px;
}

/* 底部按钮框 */
.confirm-box .bottom-btn-box {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 16%;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-btn-box .pay-btn {
  width: 90%;
  height: 70%;
  border-radius: 25px;
  background-color: var(--color-tint);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #fff;
}
</style>
