<template>
    <div class="translations">
        <div v-for="translation of visibleRows"
             :key="translation.id"
             class="translation-card">
            <TranslationCard :row="translation"
                             :data="data"
                             :is-favorite="favoriteTranslationIds.indexOf(translation.phrase.id) > -1"
                             :needs-original-phrase="needsOriginalPhrase" />
        </div>

    </div>
</template>

<script>
    import TranslationCard from "@/components/TranslationCard";
    import {getFavoriteTranslationIds} from "@/services/favorites-service";

    export default {
        name: "TranslationTable",
        components: {TranslationCard},
        props: ['data', 'visibleRows', 'selectedCategoryObject'],
        data() {
            return {
                favoriteTranslationIds: []
            };
        },
        computed: {
            needsOriginalPhrase() {
                return this.selectedCategoryObject && (this.selectedCategoryObject.needs_original_phrase === null || this.selectedCategoryObject.needs_original_phrase);
            }
        },
        mounted() {
            this.favoriteTranslationIds = getFavoriteTranslationIds();
        }
    }
</script>

<style scoped>
    .translation-card {
        margin: 20px auto;
        max-width: 640px;
        width: 100%;
    }
</style>