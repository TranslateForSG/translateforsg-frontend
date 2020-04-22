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
            <div class="block center-block">
                <b-button class="is-centered" type="is-info" icon-left="skip-previous" v-if="previousCategory"
                          @click="goPreviousCategory">
                    {{ previousCategory.name }}
                </b-button>&nbsp;
                <b-button class="is-centered" type="is-info" icon-right="skip-next" v-if="nextCategory"
                          @click="goNextCategory()">
                    {{ nextCategory.name }}
                </b-button>
            </div>
            <b-table id="phrasebookTable" :data="visibleRows">
                <template slot-scope="props">
                    <b-table-column field="content" label="English" v-if="selectedCategoryObject && (selectedCategoryObject.needs_original_phrase === null || selectedCategoryObject.needs_original_phrase)">
                        <strong class="pre-line">{{ props.row.phrase.content }}</strong>
                    </b-table-column>
                    <b-table-column :field="selectedLanguage" :label="selectedLanguage">
                        <span class="pre-line">{{ props.row.content }}</span>
                    </b-table-column>
                    <b-table-column>
                        <b-button icon-left="play" type="is-primary" @click="openPreview(props.row)">Play</b-button>
                    </b-table-column>
                </template>
            </b-table>
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
            <br>
            <div class="block center-block">
                <b-button class="is-centered" type="is-info" icon-left="skip-previous" v-if="previousCategory"
                          @click="goPreviousCategory">
                    {{ previousCategory.name }}
                </b-button>&nbsp;
                <b-button class="is-centered" type="is-info" icon-right="skip-next" v-if="nextCategory"
                          @click="goNextCategory()">
                    {{ nextCategory.name }}
                </b-button>
            </div>
            <div class="block">
                <b-button class="fixed-button" size="is-large" @click="goBackCategoryChoice()" icon-left="arrow-left">Go Back
                </b-button>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";
    import ChoiceComponent from "@/components/ChoiceComponent";

    export default {
        name: "SearchableTable",
        components: {ChoiceComponent},
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
            }
        },
        methods: {
            openPreview(row) {
                this.$buefy.modal.open({
                    parent: this,
                    component: TranslationPreviewModal,
                    hasModalCard: true,
                    props: {
                        data: this.data,
                        rowIndex: row.order,
                        selectedLanguage: this.selectedLanguage
                    }
                })
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
            },
            goNextCategory() {
                const splitPath = this.$route.path.split('/');
                splitPath.pop();
                const newPath = splitPath.join('/') + '/' + this.categories[this.getCurrentCategoryIndex() + 1].name;
                this.$router.push({path: newPath});
            },
            goPreviousCategory() {
                const splitPath = this.$route.path.split('/');
                splitPath.pop();
                const newPath = splitPath.join('/') + '/' + this.categories[this.getCurrentCategoryIndex() - 1].name;
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