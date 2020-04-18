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
            <b-navbar-item>
                <div class="buttons">
                    <a class="button is-white" @click="openVolunteerTable">
                        <b-icon
                                icon="phone"
                                size="is-small"></b-icon>
                        <strong>Translator On Call</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    import VolunteerTable from "@/components/VolunteerTable";

    export default {
        name: "Navbar",
        methods: {
            openVolunteerTable() {
                this.$buefy.modal.open({
                    parent: this,
                    component: VolunteerTable,
                    hasModalCard: true
                })
            }
        }
    }
</script>

<style scoped>

</style>