<template>
    <b-navbar class="is-success">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <strong>🇸🇬 TranslateForSG</strong>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" to="/">
                Phrasebook
            </b-navbar-item>
<!--            <b-navbar-dropdown label="Info">-->
<!--                <b-navbar-item href="#">-->
<!--                    About-->
<!--                </b-navbar-item>-->
<!--                <b-navbar-item href="#">-->
<!--                    Contact-->
<!--                </b-navbar-item>-->
<!--            </b-navbar-dropdown>-->
        </template>

        <template slot="end">
        </template>
    </b-navbar>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>