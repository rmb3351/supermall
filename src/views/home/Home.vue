<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners">
    </home-swiper>
    <!--用法和上面的轮播图基本一致 -->
    <recommend-view :recommends="recommends">
    </recommend-view>
    <feature-view></feature-view>
    <!-- 防止显示不完，先用列表拉距离 -->
    <ul>
      <li>拉距离</li>
      <li>拉距离</li>
      <li>拉距离</li>
      <li>拉距离</li>
      <li>拉距离</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// 这里由于不是default所以要用大括号把函数包含起来
import { getHomeMultidata } from "network/home";
// 主页轮播图
import HomeSwiper from "./childComponents/HomeSwiper"
// 轮播图下的推荐页面
import RecommendView from "./childComponents/RecommendView.vue"
import FeatureView from "./childComponents/FeatureView.vue"
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      //  用自己定义的的data属性把create里请求的网络数据保存起来，否则create生命周期结束了会失去数据
      banners: [],
      recommends: [],
    };
  },
  // 生命周期函数记得是状态词而不是动词，这里写错是不会报错的，非常难找，一定要注意
  created() {
    // 获取home.js里的方法请求网络数据
    getHomeMultidata().then( res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home{
  /* 为了不让其余内容被navbar遮挡，所以默认有个距离页面顶部44px的距离 */
  padding-top: 44px;
}
.home-nav {
  /* 直接用现有的变量 */
  background-color: var(--color-tint);
  color: #fff;
  /* 为了让顶部导航栏不随滚动条一起滚动 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  /* 堆叠顺序，数字越大则离用户越近，越能挡住其他元素，而且这个属性必须用在定位的元素上 */
  z-index: 5;
}
</style>
