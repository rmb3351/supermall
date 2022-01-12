<template>
  <div class="login" @click="pageClick">
    <back-nav-bar class="nav-bar">
      <div slot="center">登录/注册</div>
    </back-nav-bar>
    <login-modal :modalAtTop="modalAtTop"></login-modal>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import LoginModal from "components/common/loginModal/LoginModal";
export default {
  name: "Login",
  data() {
    return {
      modalAtTop: false
    };
  },
  components: {
    BackNavBar,
    LoginModal
  },
  methods: {
    pageClick(e) {
      this.modalAtTop = e.path.length >= 11;
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: url(~assets/img/login/login_bg.png);
  background-size: cover;
}
</style>
