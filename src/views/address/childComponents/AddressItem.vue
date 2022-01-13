<template>
  <div class="item">
    <div class="left">
      <div class="addr">{{ addrInfo[0].addr }}</div>
      <div class="left-botm">
        <span class="name">{{ addrInfo[0].name }}</span>
        <span class="phone"
          >{{ addrInfo[0].phone
          }}<span class="default" v-if="addrInfo[0].default">默认</span></span
        >
      </div>
    </div>
    <div class="right">
      <span class="modify" @click="modifyAddr">修改</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressItem",
  data() {
    return {};
  },
  props: {
    addrInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    modifyAddr() {
      this.$router.push(`/address/modAddr/${this.addrInfo[1]}`);
    }
  }
};
</script>

<style scoped>
.item {
  margin: 30px 20px;
  display: flex;
  justify-content: space-between;
}
.item .left {
  flex: 7;
}
.left .addr {
  color: #000;
  font-weight: 700;
  font-size: 17px;
}
.left .left-botm {
  margin-top: 10px;
  display: flex;
  font-size: 15px;
}
.left-botm .name {
  flex: 1;
}
.left-botm .phone {
  flex: 2;
  display: flex;
  justify-content: space-between;
}
.phone .default {
  border-radius: 3px;
  width: 30px;
  height: 18px;
  background: var(--color-tint);
  line-height: 18px;
  text-align: center;
  color: #fff;
  font-size: 12px;
}

.item .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
</style>
