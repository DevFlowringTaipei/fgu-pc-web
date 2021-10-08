export default {
  methods: {
    needLabelMorewidth(word) {
      //判對字長限制 四個字=>width:80px為分水嶺
      return word.length > 4 ? true : false;
    },
    goTo(name, id = 0) {
      this.$router.push({
        name: name,
        query: { id },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    showLoading(notify_str = "") {
      this.$q.loading.show();
      setTimeout(() => {
        this.$q.loading.hide();
        if (notify_str !== "") {
          this.$q.notify({
            message: notify_str,
            timeout: 1500,
            type: "warning",
            position: "top-right",
          });
        }
      }, 1500);
    },
  },
};
