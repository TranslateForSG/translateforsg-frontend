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
            <b-navbar-item @click="openOurStory()">
                Our Story
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/contributors">
                Contributors
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/thanks">
                Say Thanks
            </b-navbar-item>
        </template>

        <template slot="end">
        </template>
    </b-navbar>
</template>

<script>
    import TheStory from "@/components/TheStory";

    export default {
        name: "Navbar",
        methods: {
            openOurStory() {
                this.$buefy.modal.open({
                    parent: this,
                    component: TheStory,
                    hasModalCard: true
                })
            }
        }
    }
</script>

<style scoped>

</style>