<template>
    <div>
        <Navbar/>
        <div class="container">
            <SearchableTable></SearchableTable>
        </div>
        <br>
        <div class="footer">
            <p>Developed, hosted and maintained by <a href="https://adhikary.net">Aniruddha Adhikary (Ani)</a>.</p>
            <p>The <a @click="openContributorList">most amazing people on the planet</a> contributed the Content, feedback and design.</p>
            <p>Open Source. Source code available on <a href="https://github.com/aniruddha-adhikary/translateforsg-frontend">GitHub</a></p>
            <br>
            <br>
            <p>This spontaneous volunteer-driven project is not affiliated to any organization.</p>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchableTable from "@/components/SearchableTable";
    import Navbar from "@/components/Navbar";
    import ContributorList from "@/components/ContributorList";

    export default {
        name: 'Home',
        components: {
            SearchableTable,
            Navbar
        },
        methods: {
            openContributorList() {
                this.$buefy.modal.open({
                    parent: this,
                    component: ContributorList,
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