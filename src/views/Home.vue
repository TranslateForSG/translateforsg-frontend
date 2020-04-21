<template>
    <div>
        <Navbar/>
        <SearchableTable></SearchableTable>
        <br>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchableTable from "@/components/SearchableTable";
    import Navbar from "@/components/Navbar";
    import ContributorList from "@/views/ContributorList";
    import Footer from "@/components/Footer";

    export default {
        name: 'Home',
        components: {
            Footer,
            SearchableTable,
            Navbar
        }
    }
</script>

<style>
    .container {
        padding-top: 40px;
    }
</style>