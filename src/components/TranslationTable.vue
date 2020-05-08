<template>
    <div class="translations">
        <!-- <div class="block">
            <b-field class="has-addons-centered">
                <b-radio-button v-model="viewing"
                                native-value="All"
                                type="is-danger">
                    All
                </b-radio-button>
                <b-radio-button v-model="viewing"
                                native-value="Phrases"
                                type="is-danger">
                    Phrases
                </b-radio-button>
                <b-radio-button v-model="viewing"
                                native-value="Downloads"
                                type="is-danger">
                    Downloads
                </b-radio-button>
            </b-field>
        </div> -->
        <div v-if="viewing === 'All' || viewing === 'Phrases'">
            <div v-for="translation of $store.getters.getVisibleRows()"
                 :key="translation.id"
                 class="translation-card">
                <TranslationCard :row="translation"
                                 :is-favorite="favoriteTranslationIds.indexOf(translation.phrase.id) > -1"
                                 :needs-original-phrase="needsOriginalPhrase"/>
            </div>
        </div>
        <div v-if="viewing === 'All' || viewing === 'Downloads'">
            <div v-for="downloadable of visibleDownloadables"
                 :key="downloadable.id"
                 class="translation-card">
                <DownloadableCard :downloadable="downloadable"/>
            </div>
        </div>
    </div>
</template>

<script>
    import TranslationCard from "@/components/TranslationCard";
    import {getFavoriteTranslationIds} from "@/services/favorites-service";
    import DownloadableCard from "@/components/DownloadableCard";

    export default {
        name: "TranslationTable",
        components: {TranslationCard, DownloadableCard},
        props: ['downloadables', 'visibleDownloadables'],
        data() {
            return {
                favoriteTranslationIds: [],
                viewing: 'All'
            };
        },
        computed: {
            needsOriginalPhrase() {
                return this.$store.state.currentCategory && (this.$store.state.currentCategory.needs_original_phrase === null || this.$store.state.currentCategory.needs_original_phrase);
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