<template>
  <div class="item">
    <div class="left">
      <div class="addr">{{ addrInfo.addr }}</div>
      <div class="left-botm">
        <span class="name">{{ addrInfo.name }}</span>
        <span class="phone">{{ addrInfo.phone }}</span>
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
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    modifyAddr() {}
  }
};
</script>

<style scoped>
.item {
  margin: 20px;
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
  margin-top: 5px;
  display: flex;
  font-size: 14px;
}
.left-botm .name {
  flex: 3;
}
.left-botm .phone {
  flex: 5;
}

.item .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
</style>
