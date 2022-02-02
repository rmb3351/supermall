<template>
  <div class="wrapper" ref="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <scroll id="tab-content" ref="tab_scroll">
        <!-- 监听到某个item被点击后，发送网络请求，获取item下各个数据 -->
        <tab-menu :categories="categories" @selectItem="getSubCat"></tab-menu>
      </scroll>

      <scroll ref="scroll">
        <div>
          <tab-content-category
            :subCategories="subCategories"
          ></tab-content-category>
        </div>
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tab_control"
        ></tab-control>
        <tab-content-details
          :categoryDetails="categoryDetails"
        ></tab-content-details>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childComponents/TabMenu.vue";
import TabContentCategory from "./childComponents/TabContentCategory.vue";
import TabContentDetails from "./childComponents/TabContentDetails.vue";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category";
import { tabControlMixin } from "common/mixins";
import { debounce } from "common/utils";

export default {
  name: "Category",
  components: {
    Scroll,
    NavBar,
    TabControl,
    TabMenu,
    TabContentCategory,
    TabContentDetails
  },
  mixins: [tabControlMixin],
  data() {
    return {
      scroll: null,
      currentIndex: -1,
      // 所有分类
      categories: [],
      // 所有分类数据
      categoryDatas: []
    };
  },
  methods: {
    // 获取分类总数据
    getCat() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        this.categories.forEach((e, i) => {
          // 用数组的响应式方法修改数组，否则vue监听不到页面就不更新了
          // 细分分类数据的每一项，顺序调用，在不同方法内获取
          this.categoryDatas.push({
            subCategories: {},
            categoryDetails: {
              pop: [],
              sell: [],
              new: []
            }
          });
        });
        this.getSubCat(0);
      });
    },
    // 获取子分类的数据
    getSubCat(index) {
      this.currentIndex = index;
      const MAIT_KET = this.categories[index].maitKey;
      getSubCategory(MAIT_KET).then(res => {
        this.categoryDatas[index].subCategories = res.data;
        this.getCatDet("pop");
        this.getCatDet("sell");
        this.getCatDet("new");
        this.$refs.scroll.scrollRefresh();
        this.$refs.tab_scroll.scrollRefresh();
      });
    },
    // 获取分类的细数据
    getCatDet(type) {
      const MINI_WALL_KEY = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(MINI_WALL_KEY, type).then(res => {
        this.$set(
          this.categoryDatas[this.currentIndex].categoryDetails,
          type,
          res
        );
      });
    },
    tabClick(index) {
      this.itemClick(index);
      this.$refs.tab_control.tabCurrentIndex = index;
    }
  },
  computed: {
    subCategories() {
      if (this.currentIndex === -1) return {};
      return this.categoryDatas[this.currentIndex].subCategories;
    },
    categoryDetails() {
      if (this.currentIndex === -1) return [];
      return this.categoryDatas[this.currentIndex].categoryDetails[
        this.currentTab
      ];
    }
  },
  created() {
    this.getCat();
  },
  mounted() {
    this.$refs.scroll.scrollRefresh();
    this.$refs.tab_scroll.scrollRefresh();
    // 和主页逻辑一样，监听图片加载防抖刷新
    this.$bus.$on("ImageLoad", debounce(this.$refs.scroll.scrollRefresh, 200));
  },
  updated() {
    this.$refs.scroll.scrollRefresh();
    this.$refs.tab_scroll.scrollRefresh();
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  top: 44px;
}
</style>
