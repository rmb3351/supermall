<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>
    <!-- 登录、注册 -->
    <user-info></user-info>
    <!-- 余额、优惠、积分 -->
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <!-- 两栏菜单 -->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
    <!-- 退出登录 -->
    <div class="logout" v-show="isIn" @click="logOut">
      退出登录
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./childComponents/UserInfo.vue";
import ListView from "./childComponents/ListView.vue";

import { setItem, getItem } from "common/utils";

import { LOGGED_OUT } from "@/store/mutations-types";
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" }
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物App" }
      ]
    };
  },
  methods: {
    logOut() {
      const userInfo = getItem(this.user);
      // localStorage里指定user的登录状态置为false
      userInfo.isLoggedIn = false;
      setItem(this.user, userInfo);
      // 登录用户置空
      setItem("loggedInUser", "");
      this.$store.commit(LOGGED_OUT, this.user);
    }
  },
  computed: {
    ...mapState({
      isIn: "loggedIn",
      user: "loggedInUser"
    })
  }
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.account {
  display: flex;
}
.account-item {
  margin-right: 1px;
  width: 100%;
  background-color: #fff;
  padding: 18px;
  text-align: center;
  color: #666;
  font-size: 13px;
}
.account-item:last-of-type {
  margin-right: 0;
}
.account-item .balance {
  font-weight: 700;
  font-size: 24px;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}
.order-list,
.service-list,
.logout {
  margin-top: 12px;
}
.logout {
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  line-height: 44px;
  text-align: center;
  font-size: 15px;
  color: #333;
}
</style>
