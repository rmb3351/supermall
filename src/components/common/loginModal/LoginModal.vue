<template>
  <div class="login-modal" :class="{ 'at-top': modalAtTop }">
    <div class="modal-head">
      <div
        class="login-choice"
        :class="{ active: isShowLogin }"
        @click="clickLogin"
      >
        登录
      </div>
      <div
        class="register-choice"
        :class="{ active: !isShowLogin }"
        @click="clickRegister"
      >
        注册
      </div>
    </div>
    <!-- 两个相同组件的不同定制，为了不会复用 -->
    <modal-body :isShowLogin="isShowLogin" v-show="isShowLogin"></modal-body>
    <!-- 子组件跳到登录框时，父组件靠监听自定义事件响应标题变化 -->
    <modal-body
      :isShowLogin="isShowLogin"
      v-show="!isShowLogin"
      @show-changed="changeShow"
    ></modal-body>
  </div>
</template>

<script>
import ModalBody from "./ModalBody.vue";
export default {
  name: "LoginModal",
  data() {
    return {
      isShowLogin: false,
      pathCount: 0
    };
  },
  components: {
    ModalBody
  },
  props: {
    modalAtTop: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    clickLogin() {
      this.isShowLogin = true;
    },
    clickRegister() {
      this.isShowLogin = false;
    },
    changeShow(isShow) {
      this.isShowLogin = isShow;
    }
  },
  computed: {}
};
</script>

<style scoped>
.login-modal {
  box-sizing: border-box;
  margin: 40% auto;
  width: 90%;
  box-shadow: 0 0 10px #ccc;
  border: 1px solid transparent;
  border-radius: 20px;
  padding-top: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}
.at-top {
  margin: 5% auto !important;
}

.modal-head {
  margin: 0 auto;
  width: 236px;
  display: flex;
  justify-content: space-around;
  color: rgb(190, 190, 190);
}
.login-choice,
.register-choice {
  width: 43px;
  height: 28px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.active {
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
}
</style>
