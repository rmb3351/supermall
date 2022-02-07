<template>
  <div>
    <div class="modal-body">
      <div class="input-content" @click="focusWhich">
        <div class="uname">
          <span class="iconfont icon-yonghuming"></span>
          <input ref="uname" type="text" placeholder="账户名/手机号/邮箱" />
        </div>
        <div class="pswd">
          <span class="iconfont icon-password"></span>
          <input ref="pswd" type="password" placeholder="密码" />
        </div>
        <div class="pswd-sure" v-show="!loginShow">
          <span class="iconfont icon-password"></span>
          <input ref="pswd_sure" type="password" placeholder="确认密码" />
        </div>
      </div>
      <div class="login-button" @click="checkForRegister" v-show="!loginShow">
        {{ buttonText }}
      </div>
      <div class="login-button" @click="checkForLogin" v-show="loginShow">
        {{ buttonText }}
      </div>
    </div>
  </div>
</template>

<script>
import { getItem, setItem, mergeArr } from "common/utils";
import { LOGGED_IN } from "@/store/mutations-types";
import { mapGetters } from "vuex";
export default {
  name: "ModalBody",
  data() {
    return {
      unameReg: /^[a-zA-Z0-9_-]{4,16}$/,
      pswdReg: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[a-z])\S*$/,
      // props直接修改不规范，所以定义一个基于它的data，方便修改
      loginShow: this.isShowLogin
    };
  },
  props: ["isShowLogin"],
  computed: {
    ...mapGetters(["cart"]),
    buttonText() {
      if (this.loginShow) return "登录";
      return "注册";
    },
    // 用户名查重，计算属性不接受参数，需要传入时返回函数即可
    unameExisting() {
      return function(uname) {
        return getItem(uname);
      };
    }
  },
  methods: {
    // 点击获取焦点
    focusWhich(e) {
      const which = e.path[e.path.length - 11].children[1];
      which.focus();
    },
    // 检测注册信息
    checkForRegister() {
      const uname = this.$refs.uname.value;
      const pswd = this.$refs.pswd.value;
      const pswdSure = this.$refs.pswd_sure.value;
      if (!this.unameReg.test(uname)) {
        this.$toast.show(
          "用户名要由4到16位数字、字母、下划线、减号组成噢",
          4000
        );
      } else if (!this.pswdReg.test(pswd)) {
        this.$toast.show(
          "密码要由至少6位非空格组成，包含至少1位数字和小写字母噢",
          4000
        );
      } else if (pswdSure !== pswd) {
        this.$toast.show("确认密码要和密码一致噢", 2000);
      } else {
        if (this.unameExisting(uname)) {
          this.$toast.show("这个用户名已经被别人抢注了噢", 2000);
        } else {
          this.registerSuccess(uname, pswd);
        }
      }
    },
    // 注册成功操作
    registerSuccess(uname, pswd) {
      setItem(uname, {
        uname,
        pswd,
        isLoggedIn: false,
        cart: [],
        addresses: [],
        tradedList: []
      });
      this.$toast.show("注册成功，请登录", 2000);
      this.$refs.uname.value = "";
      this.$refs.pswd.value = "";
      this.$refs.pswd_sure.value = "";
      this.loginShow = true;
      // 通知父组件中的标题也需要修改样式
      this.$emit("show-changed", this.loginShow);
    },
    // 检测登录信息
    checkForLogin() {
      const uname = this.$refs.uname.value;
      const pswd = this.$refs.pswd.value;
      if (!this.unameReg.test(uname)) {
        this.$toast.show(
          "用户名要由4到16位数字、字母、下划线、减号组成噢",
          4000
        );
      } else if (!this.unameExisting(uname)) {
        this.$toast.show("这个用户名没有注册噢", 2000);
      } else if (getItem(uname).pswd !== pswd) {
        this.$toast.show("密码错误");
      } else {
        this.loginSuccess(uname, pswd);
      }
    },
    // 登录成功操作
    loginSuccess(uname) {
      const userInfo = getItem(uname);
      // 记录登录状态
      userInfo.isLoggedIn = true;
      // 游客状态购物车和登录账号的购物车合并
      userInfo.cart = mergeArr(this.cart, userInfo.cart);
      setItem(uname, userInfo);
      // 记录登录的用户，在项目重启时可以用到
      setItem("loggedInUser", uname);
      this.$toast.show("登录成功，欢迎您，" + uname + "!", 3000);
      this.$refs.uname.value = "";
      this.$refs.pswd.value = "";
      // 在vuex内保存登录数据
      this.$store.commit(LOGGED_IN, userInfo);
      // 通知相应组件更新状态
      this.$router.replace("/home");
    }
  },
  watch: {
    // 为了能修改使用了data判断是否showlogin，为了响应login-head的点击，实时监视父组件传下来的props变化
    isShowLogin: {
      immediate: true,
      handler() {
        this.loginShow = this.isShowLogin;
      }
    }
  }
};
</script>

<style scoped>
.modal-body {
  margin: 10px auto 0;
  width: 236px;
}
.uname,
.pswd,
.pswd-sure {
  position: relative;
  /* margin-top: 25px; */
  width: 100%;
  height: 50px;
  padding-top: 25px;
  border-bottom: 2px solid rgb(190, 190, 190);
}
.modal-body input {
  position: absolute;
  left: 45px;
  bottom: 2px;
  width: 191px;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 16px;
  color: rgb(160, 160, 160);
}
.modal-body span {
  position: absolute;
  left: 12px;
  bottom: 2px;
  font-size: 20px;
  color: rgb(160, 160, 160);
}
input::placeholder {
  opacity: 0.3;
}
input[type="password"] {
  letter-spacing: 3px;
}

.login-button,
.register-button {
  margin: 40px auto;
  width: 236px;
  height: 38px;
  border-radius: 19px;
  background-color: var(--color-tint);
  text-align: center;
  line-height: 38px;
  font-size: 18px;
  color: white;
}
</style>
