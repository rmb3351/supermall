// 主页轮播图的vue文件
<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <!-- 从返回的数组的条目里找到对应属性设置a标签的链接和img标签的图片 -->
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>

    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  name:'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    // 让使用这个组件的时候自己传入banners的数组
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped>

</style>
