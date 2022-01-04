<template>
  <div class="login">
    <nav-bar class="nav-bar">
      <div slot="center">登录/注册</div>
    </nav-bar>
    <login-modal></login-modal>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import LoginModal from "components/common/loginModal/LoginModal";
export default {
  name: "Login",
  data() {
    return {};
  },
  components: {
    NavBar,
    LoginModal
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  bottom: 49px;
  width: 100%;
  background: url(~assets/img/login/login_bg.png);
  background-size: cover;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
