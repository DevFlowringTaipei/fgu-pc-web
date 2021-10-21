<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Door",

  components: {},
  created() {
    // 初始化用戶訊息
    this.$store.commit("initUser");
  },
  data() {
    return {};
  },
};
</script>

<style>
.this {
  border: 1px solid red;
}
html {
  scroll-behavior: smooth;
}
</style>
