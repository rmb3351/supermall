<template>
  <div class="address">
    <router-view v-show="showRouter"></router-view>
    <div class="content" v-show="!showRouter">
      <back-nav-bar class="nav-bar">
        <div slot="center">地址管理</div>
      </back-nav-bar>
      <div class="add-btn" @click="addNewAddress">
        ＋ 新建收货地址
      </div>
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
    addNewAddress() {
      this.$router.push("/address/newAddr");
    }
  },
  computed: {
    showRouter() {
      return this.$route.path !== "/address";
    }
  }
};
</script>

<style scoped>
.address {
  width: 100vw;
  height: 100vh;
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
