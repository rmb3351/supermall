<template>
  <div>
    <div class="modal-body">
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
      <div class="login-button" @click="checkForRegister">{{ buttonText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBody",
  data() {
    return {
      unameReg: /^[a-zA-Z0-9_-]{4,16}$/,
      pswdReg: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[a-z])\S*$/,
      unames: ["rmb123", "coderwhy", "morong126"],
      // props直接修改不规范，所以定义一个基于它的data，方便修改
      loginShow: this.isShowLogin
    };
  },
  props: ["isShowLogin"],
  computed: {
    buttonText() {
      if (this.loginShow) return "登录";
      return "注册";
    },
    // 用户名查重
    unameExisting(uname) {
      return this.unames.includes(uname);
    }
  },
  methods: {
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
          this.registerSuccess();
        }
      }
    },
    // 注册成功操作
    registerSuccess() {
      this.$toast.show("注册成功，请登录", 2000);
      this.$refs.uname.value = "";
      this.$refs.pswd.value = "";
      this.$refs.pswd_sure.value = "";
      this.loginShow = true;
      // 通知父组件中的标题也需要修改样式
      this.$emit("show-changed", this.loginShow);
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
  margin-top: 25px;
  width: 100%;
  height: 25px;
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
