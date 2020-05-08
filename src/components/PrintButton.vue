<template>
  <b-button type="is-primary" icon-left="printer" tag="a" :href="printUrl" target="_blank">Print Now</b-button>
</template>

<script>
import * as apiService from "@/services/api-service";

export default {
  name: "PrintButton",
  computed: {
    printUrl() {
      return (
        process.env.VUE_APP_API_BASE_URL +
        "/printables/?" +
        apiService.toQueryString({
          // eslint-disable-next-line
          language__name: this.$store.state.currentLanguage.name,
          // eslint-disable-next-line
          phrase__category__name:
            this.$store.state.currentCategory.name !== "All Categories"
              ? this.$store.state.currentCategory.name
              : ""
        })
      );
    }
  }
};
</script>

<style scoped>
</style>