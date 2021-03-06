// 这个文件用于存放不同vue里的重复代码，到时候直接在vue文件里导入就会自动生效
import { debounce } from "./utils";
import BackToTop from "components/content/backToTop/BackToTop";
import { WINDOW_RESIZE, HIDE_TAB_BAR } from "@/store/mutations-types";
export const itemListenerMixin = {
  // 这个看样子是用不上了
  // data() {
  //   return {
  //     itemListener: null
  //   }
  // },
  mounted() {
    // 用常量接收防抖函数，如果直接匿名调用没有常量来接收，那么防抖函数无用
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
};
// 由于主页和详情页里都需要backtotop，所以这里也整个抽取
export const backToTopMixin = {
  components: {
    BackToTop
  },
  data() {
    return {
      isShowBTT: false
    };
  },
  methods: {
    bttClick(x, y, time) {
      // console.log(this.$refs.scroll.scroll);
      // 这里直接调用方法，可以少加一次.scroll再拿到data里的scroll，体现一波封装思想
      // 这里的time本来可以给默认值，但是给默认值的话它又不成功，怪事
      this.$refs.scroll.scrollTo(x, y, time);
    },
    bttShow(position) {
      this.isShowBTT = position.y < -600;
    }
  }
};

export const tabControlMixin = {
  data() {
    return {
      currentTab: "pop"
    };
  },
  methods: {
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
          break;
      }
    }
  }
};

// 让底部栏或按键适时隐藏的混入
export const resetResizeMixin = {
  data() {
    return {
      initialHeight: outerHeight,
      isCompShow: true
    };
  },
  methods: {
    resetResize(type) {
      window.onresize = () => {
        return (() => {
          this.isCompShow = this.initialHeight === outerHeight;
          // 购物车界面是否显示maintabbar的判断
          if (this.buttonName !== undefined) {
            this.$store.commit(HIDE_TAB_BAR, !this.isCompShow);
          }
          /*  resize后，由于地址栏的信息是v-bind绑定而不是v-model（使用v-model会引起未保存就修改地址的bug），在resize后填写的信息会全部消息，所以这里在手机输入法弹下去之前保存 */
          if (type === "addr") {
            if (!this.isCompShow) {
              this.saveAddrCache();
            }
          }
        })();
      };
      this.$store.commit(WINDOW_RESIZE, type);
    }
  }
};

export const deepCopyMixin = {
  methods: {
    deepCopy(target, source) {
      //数组和对象都可以for in遍历
      for (const key in source) {
        //数组和对象需要单独处理，其他直接拷贝
        if (
          Object.prototype.toString.call(source[key]).slice(8, -1) === "Array"
        ) {
          target[key] = [];
          deepCopy(target[key], source[key]);
        } else if (
          Object.prototype.toString.call(source[key]).slice(8, -1) === "Object"
        ) {
          target[key] = {};
          deepCopy(target[key], source[key]);
        } else {
          // 不直接赋值，做vue的响应式修改
          this.$set(target, [key], source[key]);
        }
      }
    }
  }
};
