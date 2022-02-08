<template>
  <!-- 组合菜单栏 -->
  <div id="list">
    <div class="item" v-for="item in listData" :key="item.icon" @click="pushTo">
      <span class="icon">
        <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    pushTo(e) {
      // 用事件对象区分点击的位置
      if (e.target.innerText.indexOf("购物车") !== -1) {
        this.$router.push("/cart");
      } else if (e.target.innerText.indexOf("订单") !== -1) {
        this.$router.push("/historyList");
      }
    }
  }
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}
#list .item {
  position: relative;
  height: 44px;
  line-height: 44px;
}
.icon svg {
  width: 18px;
  height: 18px;
}
.item .icon {
  position: absolute;
  left: 16px;
  top: -7px;
  margin-top: 10px;
}
.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}
.item:last-of-type .info {
  border-bottom: none;
}
</style>
