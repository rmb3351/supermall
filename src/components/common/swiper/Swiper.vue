<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"> </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
import { WINDOW_RESIZE } from "@/store/mutations-types";
import { mapState } from "vuex";
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    // 拖动比例到达多少时进入下一个图片
    moveRatio: {
      type: Number,
      default: 0.2
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
      firstActivated: true
    };
  },
  computed: {
    ...mapState(["resizeType"])
  },
  mounted() {
    // 监听到加载完成了以后才进行dom和计时器的操作
    this.$bus.$on("swiperLoad", () => {
      setTimeout(() => {
        this.handleDom();

        // 2.开启定时器
        this.startTimer();
        // 这里的延时可以适当加长一点，因为如果时长短，可能会导致画面渲染快过拿到数据
        // 出现空图片，要刷新才能正常展示
      }, 100);
    });
  },
  activated() {
    if (!this.firstActivated) {
      this.startTimer();
    }
    if (this.resizeType !== "home") {
      this.resetResize();
    }
  },
  deactivated() {
    this.firstActivated = false;
    this.stopTimer();
  },

  methods: {
    /**
     * 定时器操作
     */
    startTimer: function() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;

      // 1.开始滚动动画
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 校验正确的位置
     */
    checkPosition: function() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 2.结束移动后的回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    /**
     * 设置滚动的位置
     */
    setTransform: function(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom: function() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");
      // let slidesEls = swiperEl.getElementsByTagName("swiper-item");

      // 2.保存个数
      this.slideCount = slidesEls.length;
      // console.log(this.slideCount)

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        // 轮播图总是滚空的原因破案了，是这个totalWidth首次获取不正确，刷新后才能获取正确
        // this.totalWidth=swiperEl.offsetWidth;
        // 在这里直接设置成页面宽度，反正轮播图一张图片也和页面同宽
        this.totalWidth = document.body.clientWidth;
        this.swiperStyle = swiperEl.style;
      }

      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },

    /**
     * 拖动事件的处理
     */
    touchStart: function(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd: function(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向左移动超过0.5
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个, 下一个
     */
    previous: function() {
      this.changeItem(-1);
    },

    next: function() {
      this.changeItem(1);
    },

    changeItem: function(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },

    resetResize() {
      // 监听改变窗口大小，每次改变窗口大小后重新设置totalWidth，让它适配宽度滚动
      window.onresize = () => {
        return (() => {
          this.totalWidth = document.body.clientWidth;
        })();
      };
      this.$store.commit(WINDOW_RESIZE, "home");
    }
  }
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
