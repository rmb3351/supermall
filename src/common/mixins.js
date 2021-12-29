// 这个文件用于存放不同vue里的重复代码，到时候直接在vue文件里导入就会自动生效
import {debounce} from "./utils"
export const itemListenerMixin = {
  // 这个看样子是用不上了
  // data() {
  //   return {
  //     itemListener: null
  //   }
  // },
  mounted() {
    // 用常量接收防抖函数
    const scrollRefresh = debounce(this.$refs.scroll.scrollRefresh, 100);
    // 每次开始就监听图片加载，每次加载完毕都重新刷新滚动条以适配图片加载后的新高度
    this.$bus.$on("ImageLoad", () => {
      // 这个的意思是有这个对象的时候调用后面的函数，如果没有，直接不执行，不会再判断后面了
      // 必须要在这里判断，进入函数的时候再判断已经迟了，你已经调用了，再判断有没有这个对象已经来不及了
      // this.$refs.scroll&&this.$refs.scroll.scrollRefresh()
      // 调用防抖函数，似乎在这里就不用判断this.$refs.scroll了
      scrollRefresh();
    });
  }
}