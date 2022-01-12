<template>
  <new-address></new-address>
</template>

<script>
import NewAddress from "./NewAddress";
export default {
  name: "ModifyAddress",
  data() {
    return {};
  },
  components: {
    NewAddress
  }
};
</script>

<style scoped>
.mod-addr {
  width: 400px;
  height: 400px;
  background-color: yellowgreen;
}
</style>
