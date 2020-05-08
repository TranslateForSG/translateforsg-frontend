<template>
  <b-field custom-class="is-large" style="justify-content: center">
    <b-input
      :value="searchText"
      v-debounce:300ms="search"
      placeholder="Search..."
      icon-right="search"
    ></b-input>
    <p class="controls">
      <b-button @click="searchText = ''" class="button is-dark" icon-left="close"></b-button>
    </p>
  </b-field>
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