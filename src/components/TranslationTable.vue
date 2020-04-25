<template>
    <div class="translations">
        <div v-for="translation of visibleRows"
             :key="translation.id"
             class="translation-card">
            <TranslationCard :row="translation"
                             :data="data"
                             :selected-category-object="selectedCategoryObject"
                             :selected-language="selectedLanguage"/>
        </div>

    </div>
</template>

<script>
    import TranslationCard from "@/components/TranslationCard";

    export default {
        name: "TranslationTable",
        components: {TranslationCard},
        props: ['data', 'visibleRows', 'selectedLanguage', 'selectedCategoryObject']
    }
</script>

<style scoped>
    .translations {
    }

    .translation-card {
        margin: 20px auto;
        max-width: 640px;
        width: 100%;
    }
</style>