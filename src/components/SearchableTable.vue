<template>
    <div>
        <ChoiceComponent v-if="!selectedCategory && !selectedLanguage" :choices="languageChoices"></ChoiceComponent>
        <ChoiceComponent v-if="!selectedCategory && selectedLanguage" :choices="categoryChoices"></ChoiceComponent>
        <section v-if="selectedCategory && selectedLanguage">
            <div class="block">
                <b-field custom-class="is-large" style="justify-content: center">
                    <span></span>
                    <b-input v-model="searchText" placeholder="Search..." icon-right="search"></b-input>
                </b-field>
                <b-field custom-class="is-large" style="justify-content: center">
                    <b-select size="large" placeholder="Select a category" v-model="selectedCategory">
                        <option v-for="category in categories" :key="category.name"
                                :value="category.name">
                            {{ category.name }}
                        </option>
                    </b-select>
                    <b-select size="large" placeholder="Language" v-model="selectedLanguage">
                        <option v-for="language in languages" :key="language.name"
                                :value="language.name">
                            {{ language.name }} ({{ language.native_name }})
                        </option>
                    </b-select>
                </b-field>
            </div>
            <b-table id="phrasebookTable" :data="visibleRows">
                <template slot-scope="props">
                    <b-table-column field="content" label="English"><p> {{ props.row.phrase.content }} </p>
                    </b-table-column>
                    <b-table-column :field="selectedLanguage" :label="selectedLanguage"
                    >
                        <div class="is-vcentered"> {{ props.row.content }}</div>
                    </b-table-column>
                    <b-table-column>
                        <b-button icon-left="play" type="is-primary" @click="openPreview(props.row)">Play</b-button>
                    </b-table-column>
                </template>
            </b-table>
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
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
                    this.categories.splice(0, 0, {name: 'All Categories'});
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
            }
        }
    }
</script>

<style>
</style>