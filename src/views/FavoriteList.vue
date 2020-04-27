<template>
    <div class="translations">
        <h2 class="is-4 title">Favorites</h2>
        <div class="block">
            <b-field style="overflow-x: scroll;" class="has-addons-centered">
                <b-radio-button v-for="language in languages" v-model="selectedLanguage" :key="language.code"
                                :native-value="language.name"
                                type="is-danger">
                    {{ language.name }}
                </b-radio-button>
            </b-field>
        </div>
        <div class="block" v-if="!visibleRows || visibleRows.length === 0">
            <h3 class="is-5 title">Whoopsy Daisy</h3>
            <p>Looks like you haven't added any favorites yet! How?</p>
            <strong>Click on the heart!</strong><br>
            <br>
            <img src="../assets/favorites.gif" alt="Video Demo" class="demo">
            <br>
            <b-button tag="router-link" to="/" size="is-large" icon-left="home">Go Home</b-button>
        </div>
        <div v-for="translation of visibleRows"
             :key="translation.id"
             class="translation-card">
            <TranslationCard :row="translation"
                             :data="data"
                             :is-favorite="true"
                             v-on:favorite-removed="loadTranslations()"
                             :needs-original-phrase="needsOriginalPhrase"/>
        </div>

    </div>
</template>

<script>
    import TranslationCard from "@/components/TranslationCard";
    import * as apiService from '@/services/api-service';
    import * as FavoritesService from '@/services/favorites-service';

    export default {
        name: "FavoriteList",
        components: {
            TranslationCard,
        },
        mounted() {
            this.loadTranslations();
            apiService.listLanguages()
                .then(response => {
                    this.languages = response.results;
                });
        },
        data() {
            return {
                data: [],
                needsOriginalPhrase: true,
                selectedLanguage: 'Bengali',
                languages: []
            }
        },
        computed: {
            visibleRows() {
                return this.data;
            }
        },
        watch: {
            selectedLanguage() {
                this.loadTranslations();
            }
        },
        methods: {
            loadTranslations() {
                const favoriteTranslationIds = FavoritesService.getFavoriteTranslationIds();
                if (favoriteTranslationIds.length === 0) {
                    this.data = [];
                    return;
                }
                apiService.listTranslations({
                    language: this.selectedLanguage,
                    phrases: favoriteTranslationIds
                }).then(data => {
                    this.data = data.results;
                })
            }
        }
    }
</script>

<style scoped>
    .translation-card {
        margin: 20px auto;
        max-width: 640px;
        width: 100%;
    }

    .demo {
        border: 2px solid black;
    }
</style>