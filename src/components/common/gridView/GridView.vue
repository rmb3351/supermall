<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    cols: {
      type: Number,
      default: 2
    },
    hMargin: {
      type: Number,
      default: 8
    },
    vMargin: {
      type: Number,
      default: 8
    },
    itemSpace: {
      type: Number,
      default: 8
    },
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  methods: {
    autoLayout() {
      let gridEl = this.$refs.gridView;
      let children = gridEl.children;
      // 开始根据配置自动布局，模板字符串可以保留格式也可以读取数据
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`;
      let itemWidth =
        (gridEl.clientWidth -
          2 * this.hMargin -
          (this.cols - 1) * this.itemSpace) /
        this.cols;
      children.forEach((item, i) => {
        item.style.width = itemWidth + "px";
        if ((i + 1) % this.cols !== 0) {
          item.style.marginRight = this.itemSpace + "px";
        }
        if (i >= this.cols) {
          item.style.marginTop = this.lineSpace + "px";
        }
      });
    }
  },
  mounted() {
    this.$nextTick(this.autoLayout);
    window.onresize = () => {
      this.autoLayout();
    };
  },
  updated() {
    this.$nextTick(this.autoLayout);
  }
};
</script>

<style scoped>
.grid-view {
  display: flex;
  flex-wrap: wrap;
}
</style>
