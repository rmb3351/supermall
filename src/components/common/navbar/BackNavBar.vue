<template>
  <div class="back-nav-bar">
    <!-- 导航栏分为三个部分，分别用具名插槽 -->
    <div class="left" @click="goBack">
      <slot name="left">
        <div class="left-btn">
          <img src="~assets/img/common/back_white.png" alt="" />
        </div>
      </slot>
    </div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "BackNavBar",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.nav-bar {
  /* 弹性布局，设置了以后就可以在对应的选择器里进行布局分配 */
  display: flex;
  height: 44px;
  line-height: 44px;
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  text-align: center;
  font-weight: 700;
  color: white;
}
.left,
.right {
  width: 60px;
}
.left-btn {
  width: 12px;
  height: 21px;
}
.left-btn img {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  vertical-align: middle;
  color: white;
}
.center {
  flex: 1;
}
</style>
