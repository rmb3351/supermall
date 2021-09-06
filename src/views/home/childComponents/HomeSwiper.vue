// 主页轮播图的vue文件
<template>
  <swiper ref="swip">
    <swiper-item v-for="item in banners">
      <!-- 从返回的数组的条目里找到对应属性设置a标签的链接和img标签的图片 -->
      <a :href="item.link">
        <!-- 为了获取tabcontrol吸顶的高度，需要监听轮播图是否加载完成 -->
        <img :src="item.image" alt="" >
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
      // 这里的default是对象或者数组时，必须采用return的写法，其他的可以用键值对写法
      default(){
        return []
      }
    },
  },
  data(){
   return {
    //  默认轮播图没加载完成
     isLoaded:false
   }
  },
  methods: {
    startTimer(){
      console.log("进入homeswiper");
      // this.$refs.swip.startTimer()
    },
    stopTimer(){
      // this.$refs.swip.stopTimer()
      console.log("进入homeswiper");
    },
    // loadSwiper(){
    //   // 这里只调用且发射一次事件，优化思想
    //   if(!this.isLoaded){
    //     this.isLoaded=true
    //     this.$emit("swiperloaded")
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
