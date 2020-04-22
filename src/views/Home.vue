<template>
    <div>
        <SearchableTable></SearchableTable>
        <br>
    </div>
</template>

<script>
    // @ is an alias to /src
    import SearchableTable from "@/components/SearchableTable";

    export default {
        name: 'Home',
        components: {
            SearchableTable,
        }
    }
</script>

<style>
    .container {
        padding-top: 40px;
    }
</style>