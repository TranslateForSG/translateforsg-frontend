<template>
    <div>
        <ChoiceComponent v-if="!selectedCategory && !selectedLanguage" :choices="languageChoices"></ChoiceComponent>
        <ChoiceComponent v-if="!selectedCategory && selectedLanguage" :choices="categoryChoices"></ChoiceComponent>
        <section v-if="selectedCategory && selectedLanguage" style="width: 100%">
            <div class="block">
                <b-field custom-class="is-large" style="justify-content: center">
                    <span></span>
                    <b-input v-model="searchText" placeholder="Search..." icon-right="search"></b-input>
                </b-field>
            </div>
            <CategoryNavigation :next-category="nextCategory" :previous-category="previousCategory" />
            <div class="block center-block">
                <b-button class="is-centered" type="is-primary" icon-left="share" @click="shareQr()">Share</b-button>
            </div>
            <TranslationTable
                    :data="data"
                    :visible-rows="visibleRows"
                    :selected-category-object="selectedCategoryObject"
                    :selected-language="selectedLanguage" />
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
            <br>
            <CategoryNavigation :next-category="nextCategory" :previous-category="previousCategory" />
            <div class="block">
                <b-button class="fixed-button" size="is-large"
                          @click="goBackCategoryChoice()" icon-left="arrow-left">
                    Go Back
                </b-button>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import ChoiceComponent from "@/components/ChoiceComponent";
    import ShareQR from "@/components/ShareQR";
    import TranslationTable from "@/components/TranslationTable";
    import CategoryNavigation from "@/components/CategoryNavigation";

    export default {
        name: "SearchableTable",
        components: {CategoryNavigation, TranslationTable, ChoiceComponent},
        mounted() {
            this.loadParams();
            this.getListing();
            axios
                .get('https://api.translatefor.sg/api/v1/languages')
                .then(response => {
                    this.languages = response.data.results;
                });
            axios
                .get('https://api.translatefor.sg/api/v1/categories')
                .then(response => {
                    this.categories = response.data.results;
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    this.categories.splice(0, 0, {name: 'All Categories', needs_original_phrase: true});
                });
        },
        data() {
            return {
                data: [],
                languages: [],
                categories: [],
                selectedLanguage: null,
                selectedCategory: null,
                columns: [],
                searchText: '',
                isLoading: true,
            }
        },
        watch: {
            selectedLanguage: function () {
                this.getListing();
            },
            selectedCategory: function () {
                this.getListing();
            },
            $route() {
                this.loadParams();
            }
        },
        computed: {
            visibleRows: function () {
                if (this.searchText) {
                    return this.data.filter(row => (row.phrase.content.toLowerCase().includes(this.searchText.toLowerCase())))
                }
                return this.data;
            },
            languageChoices: function () {
                return this.languages.map(l => ({value: l.name, label: l.name + ' (' + l.native_name + ')'}));
            },
            categoryChoices: function () {
                return this.categories.map(l => ({value: l.name, label: l.name}));
            },
            nextCategory() {
                return this.categories[this.getCurrentCategoryIndex() + 1];
            },
            previousCategory() {
                return this.categories[this.getCurrentCategoryIndex() - 1];
            },
            selectedCategoryObject() {
                return this.categories.filter(c => c.name === this.selectedCategory)[0];
            },
        },
        methods: {
            shareQr() {
                this.$buefy.modal.open({
                    parent: this,
                    component: ShareQR,
                    hasModalCard: true,
                    props: {
                        url: window.location.href,
                        title: `${this.selectedCategory} (${this.selectedLanguage})`
                    }
                });
                this.$ga.event({
                    eventCategory: 'Engagement',
                    eventAction: 'Share',
                    eventLabel: this.selectedLanguage
                });
            },
            getListing() {
                this.isLoading = true;

                // prevent API calls
                if (!this.selectedCategory || !this.selectedLanguage) {
                    return;
                }

                const url = new URL('https://api.translatefor.sg/api/v1/translations');
                url.searchParams.append('language__name', this.selectedLanguage);
                if (this.selectedCategory && this.selectedCategory !== 'All Categories') {
                    url.searchParams.append('phrase__category__name', this.selectedCategory);
                }
                // if (this.searchText && this.searchText.length > 3) {
                //     url.searchParams.append('search', this.searchText);
                // }

                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const component = this;

                axios
                    .get(url.toString())
                    .then(response => {
                        let i = 0;
                        response.data.results.forEach(row => row.order = i++);
                        this.data = response.data.results;
                        component.isLoading = false;
                    });
            },
            loadParams() {
                this.selectedLanguage = this.$route.params.language;
                this.selectedCategory = this.$route.params.category;
            },
            getCurrentCategoryIndex() {
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].name === this.selectedCategory) {
                        return i;
                    }
                }
            },
            goBackCategoryChoice() {
                const splitPath = this.$route.path.split('/');
                splitPath.pop();
                const newPath = splitPath.join('/');
                this.$router.push({path: newPath});
            }
        }
    }
</script>

<style>
    @media screen and (max-width: 768px) {
        .b-table td::before {
            content: "" !important;
            display: none;
        }

        .b-table td {
            text-align: left !important;
            min-width: 90%;
        }

        .b-table td:nth-child(3) {
            text-align: right !important;
        }
    }

    .center-block {
        margin-left: auto;
        margin-right: auto;
    }

    .pre-line {
        white-space: pre-line;
    }
</style>
