<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt style="margin-right: 5px" />
        <strong>TranslateForSG</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Phrasebook</b-navbar-item>
      <b-navbar-dropdown label="About">
        <b-navbar-item tag="router-link" to="/disclaimer">Disclaimer</b-navbar-item>
        <b-navbar-item tag="router-link" to="/about">Our Story</b-navbar-item>
        <b-navbar-item tag="router-link" to="/contributors">Contributors</b-navbar-item>
        <b-navbar-item tag="router-link" to="/contact">Contact Us</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end"></template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
</style>