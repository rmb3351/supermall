<template>
  <div class="address">
    <back-nav-bar class="nav-bar">
      <div slot="center">地址管理</div>
    </back-nav-bar>
    <div class="add-btn" @click="addNewAddress">
      ＋ 新建收货地址
    </div>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
export default {
  name: "Address",
  data() {
    return {};
  },
  components: {
    BackNavBar
  },
  methods: {
    addNewAddress() {}
  }
};
</script>

<style scoped>
.address {
  width: 100vw;
  height: 100vh;
}
.left {
  width: 12px;
  height: 21px;
}
.left img {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  vertical-align: middle;
  color: white;
}
.add-btn {
  position: fixed;
  bottom: 3%;
  left: 15%;
  right: 15%;
  border-radius: 21px;
  height: 42px;
  background-color: var(--color-tint);
  text-align: center;
  line-height: 42px;
  font-weight: 500;
  color: white;
}
</style>
