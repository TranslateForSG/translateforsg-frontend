<template>
  <b-button class="is-centered" type="is-primary" icon-left="share" @click="shareQr()">Share</b-button>
</template>

<script>
import ShareQR from "@/components/ShareQR";

export default {
  name: "PrintButton",
  methods: {
    shareQr() {
      this.$buefy.modal.open({
        parent: this,
        component: ShareQR,
        hasModalCard: true,
        props: {
          url: window.location.href,
          title: `${this.$store.state.currentCategory.name} (${this.$store.state.currentLanguage.name})`
        }
      });
      this.$ga.event({
        eventCategory: "Engagement",
        eventAction: "Share",
        eventLabel: this.$store.state.currentLanguage.name
      });
    }
  }
};
</script>

<style scoped>
</style>