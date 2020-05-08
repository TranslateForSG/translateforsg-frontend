<template>
  <div class="block center-block">
    <b-button
      class="is-centered"
      type="is-info"
      icon-left="skip-previous"
      v-if="previousCategory"
      @click="goPreviousCategory"
    >{{ previousCategory.name }}</b-button>&nbsp;
    <b-button
      class="is-centered"
      type="is-info"
      icon-right="skip-next"
      v-if="nextCategory"
      @click="goNextCategory()"
    >{{ nextCategory.name }}</b-button>
  </div>
</template>

<script>
export default {
  name: "CategoryNavigation",
  props: [],
  computed: {
    nextCategory() {
      return this.$store.state.categories[
        this.$store.state.currentCategoryIndex + 1
      ];
    },
    previousCategory() {
      return this.$store.state.categories[
        this.$store.state.currentCategoryIndex - 1
      ];
    }
  },
  methods: {
    goNextCategory() {
      const splitPath = this.$route.path.split("/");
      splitPath.pop();
      const newPath = splitPath.join("/") + "/" + this.nextCategory.name;
      this.$router.push({ path: newPath });
    },
    goPreviousCategory() {
      const splitPath = this.$route.path.split("/");
      splitPath.pop();
      const newPath = splitPath.join("/") + "/" + this.previousCategory.name;
      this.$router.push({ path: newPath });
    }
  }
};
</script>

<style scoped>
</style>