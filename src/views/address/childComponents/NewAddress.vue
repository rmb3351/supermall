<template>
  <div class="page-content">
    <back-nav-bar class="gray">
      <div slot="left">
        <div class="left-btn">
          <img src="~assets/img/common/back_black.png" alt="" />
        </div>
      </div>
      <div slot="center" class="center">{{ diffUI.title }}收货地址</div>
      <div slot="right" @click="delAddr" v-if="diffUI.navRight">删除</div>
    </back-nav-bar>
    <div class="info">
      <div class="name"></div>
      <div class="phone"></div>
      <div class="detail-address"></div>
    </div>
    <div class="default"></div>
    <div class="save" @click="savAddr">保存</div>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
export default {
  name: "NewAddress",
  components: {
    BackNavBar
  },
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    delAddr() {
      console.log("删除");
    },
    savAddr() {
      this.$router.back();
    }
  },
  computed: {
    diffUI() {
      return Object.keys(this.pageInfo).length === 0
        ? { title: "新建", navRight: false }
        : { title: "修改", navRight: true };
    }
  }
};
</script>

<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  background-color: rgb(246, 246, 246);
}
.gray {
  background-color: rgb(246, 246, 246);
  color: rgb(40, 40, 40);
}

.info,
.default {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 15px;
  padding: 0 20px;
}
.info div {
  border-bottom: 3px solid rgb(246, 246, 246);
  height: 65px;
}
.info .detail-address {
  border: 0;
  height: 120px;
}

.default {
  height: 85px;
}

.save {
  position: fixed;
  bottom: 3%;
  left: 10%;
  right: 10%;
  border-radius: 21px;
  height: 42px;
  background-color: var(--color-tint);
  text-align: center;
  line-height: 42px;
  font-weight: 500;
  color: white;
}
</style>
