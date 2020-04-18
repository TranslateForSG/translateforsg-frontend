<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="is-hidden-tablet" style="margin-bottom: 20px;">
                <a class="button is-warning is-large" @click="openVolunteerTable">
                    <b-icon icon="phone"
                            size="is-large"></b-icon>
                    <strong>Translator On Call</strong>
                </a>
            </div>
            <SearchableTable></SearchableTable>
        </div>
        <div class="footer">
            Developed by <a href="https://github.com/aniruddha-adhikary">Aniruddha Adhikary</a>. Content contributed by Sudesna, Soumil, and others. (Soon to be updated)
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchableTable from "@/components/SearchableTable";
    import Navbar from "@/components/Navbar";
    import VolunteerTable from "@/components/VolunteerTable";

    export default {
        name: 'Home',
        components: {
            SearchableTable,
            Navbar
        },
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

<style>
    .container {
        padding-top: 40px;
    }
</style>