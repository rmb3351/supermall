<template>
  <div id="app">
    <!-- 把路由的内容改为keep-alive就可以不用每次路由跳转都重新创建了 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
// 直接把现成的maintabbar拿过来用
import MainTabBar from "components/content/mainTabbar/MainTabBar";
// 为了能在profile中使用svg引入的两个vue
import Icon from "components/content/Icon/Icon";
import SvgIcon from "components/content/Icon/Svg";

export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
};
</script>

<style>
/* 这里导入base，然后base里导入normalize
base主要存放一些自己定的基本样式，normalize是github上下载的统一多个浏览器样式风格的css文件 */
@import "assets/css/base.css";
@import "assets/iconfont/iconfont.css";
#app {
  height: 100%;
}
</style>
