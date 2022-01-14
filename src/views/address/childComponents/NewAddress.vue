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
    <div class="info" @click="focusWhich">
      <div class="name">
        <div class="table-name">收货人</div>
        <input
          class="input-content"
          type="text"
          placeholder="请填写收货人姓名"
          v-model="pageInfo.name"
        />
      </div>
      <div class="phone">
        <div class="table-name">手机号码</div>
        <input
          class="input-content"
          type="text"
          placeholder="请填写收货人手机号"
          v-model="pageInfo.phone"
        />
      </div>
      <div class="detail-address">
        <div class="table-name">详细地址</div>
        <textarea
          class="input-content"
          type="text"
          placeholder="省市区县、乡镇内的街道、楼牌号等"
          v-model="pageInfo.addr"
        />
      </div>
    </div>
    <div class="default">
      <div class="left">
        <div class="sub-title">设置默认地址</div>
        <div class="tip">提醒：每次下单会默认推荐使用该地址</div>
      </div>
      <div class="right">
        <input class="right-check" type="checkbox" v-model="pageInfo.default" />
      </div>
    </div>
    <div class="save" @click="savAddr" v-show="isCompShow">保存</div>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import { setItem } from "common/utils";
import { resetResizeMixin } from "common/mixins";
import { mapState } from "vuex";
import { NEW_ADDRESS, MOD_ADDRESS, DEL_ADDRESS } from "@/store/mutations-types";
export default {
  name: "NewAddress",
  components: {
    BackNavBar
  },
  mixins: [resetResizeMixin],
  props: {
    pageInfo: {
      type: Object,
      default() {
        return { name: "", phone: "", addr: "", default: false };
      }
    }
  },
  data() {
    return {
      initialHeight: outerHeight
    };
  },
  methods: {
    delAddr() {
      // 先跳转再删除，避免显示bug或获取数据出错，且不允许返回
      this.$router.replace("/address");
      this.$store.commit(DEL_ADDRESS, this.pageInfo);
      setItem(this.loggedInUser, this.userInfo[this.loggedInUser]);
      this.$router.back();
    },
    savAddr() {
      if (this.pageInfo.id !== undefined) {
        this.$store.commit(MOD_ADDRESS, this.pageInfo);
      } else {
        this.$store.commit(NEW_ADDRESS, this.pageInfo);
      }
      setItem(this.loggedInUser, this.userInfo[this.loggedInUser]);
      this.$router.back();
    },

    // 辅助获取输入框焦点的功能
    focusWhich(e) {
      let which;
      if (this.pageInfo.id === undefined) {
        which = e.path[e.path.length - 9].children[1];
      } else {
        which = e.path[e.path.length - 10].children[1];
      }
      which.focus();
    }
  },
  computed: {
    ...mapState(["loggedInUser", "userInfo"]),
    diffUI() {
      return this.$route.path.indexOf("newAddr") !== -1
        ? { title: "新建", navRight: false }
        : { title: "修改", navRight: true };
    }
  },
  mounted() {
    this.resetResize("addr");
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
  background-color: #fff;
  border-radius: 15px;
  padding: 0 20px;
}
/* 各信息框样式 */
.info > div {
  border-bottom: 3px solid rgb(246, 246, 246);
  height: 65px;
  line-height: 65px;
}
/* 栏名 */
.info .table-name {
  display: inline-block;
  width: 25%;
  height: 100%;
  font-weight: 550;
}
/* 填写框 */
.info .input-content {
  vertical-align: text-top;
  border: 0;
  outline: 0;
  width: 75%;
  font-weight: 700;
  font-size: 17px;
}
.info .input-content::placeholder {
  color: #ccc;
  font-weight: 400;
}
.info .detail-address {
  border: 0;
  height: 120px;
}
.info .detail-address .input-content {
  height: 90px;
}

/* 默认地址样式 */
.default {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  height: 85px;
}
.default .left,
.default .right {
  display: flex;
  height: 85px;
  padding: 15px 0;
  flex-direction: column;
  justify-content: space-around;
}
.left .sub-title {
  font-weight: 550;
}
.left .tip {
  font-size: 14px;
}
.right .right-check {
  width: 20px;
  height: 20px;
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
