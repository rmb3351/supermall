<template>
  <tab-bar v-show="showCondition">
    <tab-bar-item path="/home">
      <!-- 在src里用别名的话前面要加上个~
      决定点击后去向哪个页面地址的是这里的path属性
      如果想显示vue路由里对应的页面，记得把vue路由里的path和这里统一 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~/assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { getItem } from "common/utils";
import { LOGGED_IN } from "@/store/mutations-types";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      excludePaths: ["/address", "/login"]
    };
  },
  mounted() {
    // 记录登录状态功能：程序启动时检查是否有未登出的用户，并看看能否获取它的信息
    const nowUser = getItem("loggedInUser");
    if (nowUser) {
      const nowUserInfo = getItem(nowUser);
      if (nowUserInfo) {
        this.$store.commit(LOGGED_IN, nowUserInfo);
      }
    }
  },
  computed: {
    showCondition() {
      // path不包含所有excludePaths中的路径才显示
      const flag = this.excludePaths.every(ele => {
        return this.$route.path.indexOf(ele) === -1;
      });
      return flag;
    }
  }
};
</script>

<style scoped></style>
