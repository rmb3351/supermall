<template>
  <grid-view>
    <goods-list-item
      v-for="(item, index) in categoryDetails"
      :key="index"
      :goodsItem="item"
    ></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "TabContentDetails",
  data() {
    return {};
  },
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    categoryDetails: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped></style>
