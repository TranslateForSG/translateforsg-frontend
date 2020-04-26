<template>
    <div class="translations">
        <div v-for="translation of visibleRows"
             :key="translation.id"
             class="translation-card">
            <TranslationCard :row="translation"
                             :data="data"
                             :needs-original-phrase="needsOriginalPhrase" />
        </div>

    </div>
</template>

<script>
    import TranslationCard from "@/components/TranslationCard";

    export default {
        name: "TranslationTable",
        components: {TranslationCard},
        props: ['data', 'visibleRows', 'selectedCategoryObject'],
        computed: {
            needsOriginalPhrase() {
                return this.selectedCategoryObject && (this.selectedCategoryObject.needs_original_phrase === null || this.selectedCategoryObject.needs_original_phrase);
            }
        },
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