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
          ref="name"
          class="input-content"
          type="text"
          placeholder="请填写收货人姓名"
          :value="cacheAddr.name"
        />
      </div>
      <div class="phone">
        <div class="table-name">手机号码</div>
        <input
          ref="phone"
          class="input-content"
          type="text"
          placeholder="请填写收货人手机号"
          :value="cacheAddr.phone"
        />
      </div>
      <div class="detail-address">
        <div class="table-name">详细地址</div>
        <textarea
          ref="addr"
          class="input-content"
          type="text"
          placeholder="省市区县、乡镇内的街道、楼牌号等"
          :value="cacheAddr.addr"
        />
      </div>
    </div>
    <div class="default">
      <div class="left">
        <div class="sub-title">设置默认地址</div>
        <div class="tip">提醒：每次下单会默认推荐使用该地址</div>
      </div>
      <div class="right">
        <input
          ref="default"
          class="right-check"
          type="checkbox"
          :checked="cacheAddr.default"
        />
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
        return { name: "", phone: "", addr: "", default: false, chosen: false };
      }
    }
  },
  data() {
    return {
      initialHeight: outerHeight,
      cacheAddr: {}
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
      // 保存时获取用户的输入作为地址信息保存，用v-model的话修改后不保存直接点后退也能修改成功
      const newInfo = {
        name: this.$refs.name.value,
        phone: this.$refs.phone.value,
        addr: this.$refs.addr.value,
        default: this.$refs.default.checked,
        id: this.pageInfo.id
      };
      if (newInfo.id !== undefined) {
        // 填写完整信息则保存，否则提示且return
        if (newInfo.name && newInfo.phone && newInfo.addr) {
          this.$store.commit(MOD_ADDRESS, newInfo);
        } else {
          this.$toast.show("请填写完整信息");
          return;
        }
      } else {
        if (newInfo.name && newInfo.phone && newInfo.addr) {
          this.$store.commit(NEW_ADDRESS, newInfo);
        } else {
          this.$toast.show("请填写完整信息");
          return;
        }
      }
      setItem(this.loggedInUser, this.userInfo[this.loggedInUser]);
      this.$router.back();
    },
    // 只用覆盖部分数据，所以使用assign
    saveAddrCache() {
      Object.assign(this.cacheAddr, {
        name: this.$refs.name.value,
        phone: this.$refs.phone.value,
        addr: this.$refs.addr.value,
        default: this.$refs.default.checked
      });
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
    },
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
    this.deepCopy(this.cacheAddr, this.pageInfo);
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
