<template>
  <div id="shop-item">
    <div class="item-selector">
      <slot name="left">
        <check-button
          :is-checked="purchase.checked"
          @click.native="ckbClick"
        ></check-button>
      </slot>
    </div>
    <div class="item-img">
      <img :src="purchase.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ purchase.title }}</div>
      <div class="item-desc">{{ purchase.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ purchase.price }}</div>
        <div class="item-count right">
          <button @click="minusCartCount">-</button>
          <span class="item-num" @click="showModifier"
            >{{ purchase.count }}
            <input ref="modifier" type="input" v-show="isModifying"
          /></span>
          <button @click="plusCartCount">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";

import { mapActions } from "vuex";

import { CHECKED_ITEM } from "@/store/mutations-types";

export default {
  name: "CartListItem",
  data() {
    return {
      isModifying: false,
      isFirstBind: true
    };
  },
  components: {
    CheckButton
  },
  props: {
    purchase: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    ...mapActions({
      plus: "plusCartCount",
      minus: "minusCartCount",
      modify: "modifyCartCount"
    }),
    ckbClick() {
      this.$store.commit(CHECKED_ITEM, this.purchase);
    },
    // 修改购物车内商品数量的一系列方法
    plusCartCount() {
      this.plus(this.purchase).then(res => {
        this.$toast.show(res, 1000);
      });
    },
    minusCartCount() {
      if (this.purchase.count < 1) {
        this.$toast.show("已经不能再减啦", 1000);
        return;
      } else if (this.purchase.count === 1 && this.purchase.checked) {
        this.$toast.show("帮您取消选中啦", 1000);
      }
      this.minus(this.purchase);
    },
    showModifier() {
      this.isModifying = true;
      // 不nextTick会在showModifier执行完毕后才修改isModifying，为时已晚
      this.$nextTick(this.modifyCartCount);
    },
    modifyCartCount() {
      let modifier = this.$refs.modifier;
      modifier.focus();
      modifier.value = this.purchase.count;
      // 只需要在第一次点击绑定这个事件
      if (this.isFirstBind) {
        modifier.addEventListener("blur", () => {
          let value = parseInt(modifier.value);
          // 无效修改不映射，返回前要隐藏input
          if (value.isNaN || value === this.purchase.count) {
            this.isModifying = false;
            return;
          } else if (value >= 0) {
            this.modify({ purchase: this.purchase, value }).then(res => {
              this.$toast.show(res);
            });
          }
          this.isModifying = false;
        });
        this.isFirstBind = false;
      }
    }
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 30px;
  line-height: 30px;
}

.info-bottom .item-price {
  color: orangered;
}
.item-count button {
  margin: 0 5px;
  border: 0;
  background: none;
  font-size: 20px;
}
.item-count .item-num {
  display: inline-block;
  box-sizing: content-box;
  position: relative;
  width: 50px;
  height: 20px;
  border: 2px solid #ccc;
  text-align: center;
  vertical-align: top;
  line-height: 23px;
}
.item-num input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
}
</style>
