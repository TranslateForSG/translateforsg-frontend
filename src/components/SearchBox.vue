<template>
  <b-input
    :value="searchText"
    v-debounce:300ms="search"
    placeholder="Search..."
    icon-right="search"
  ></b-input>
</template>

<script>
export default {
  name: "PrintButton",
  computed: {
    searchText: {
      set(value) {
        this.$store.commit("SET_SEARCH_TEXT", value);
      },
      get() {
        return this.$store.state.searchText;
      }
    }
  },
  methods: {
    search(searchText) {
      this.searchText = searchText;
    }
  }
};
</script>

<style scoped>
</style>