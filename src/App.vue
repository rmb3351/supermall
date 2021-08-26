<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 直接把现成的maintabbar拿过来用
import MainTabBar from "components/content/mainTabbar/MainTabBar"


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* 这里导入base，然后base里导入normalize
base主要存放一些自己定的基本样式，normalize是github上下载的统一多个浏览器样式风格的css文件 */
@import "assets/css/base.css";
</style>
