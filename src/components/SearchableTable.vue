<template>
    <section>
        <div class="block">
            <b-field custom-class="is-large" style="justify-content: center">
                <b-input v-model="searchText" placeholder="Search..." icon-right="search"></b-input>
                <b-select size="large" placeholder="Select a category" v-model="selectedCategory">
                    <option v-for="category in categories" :key="category.name"
                            :value="category.name">
                        {{ category.name }}
                    </option>
                </b-select>
                <b-select size="large" placeholder="Language" v-model="selectedLanguages">
                    <option v-for="language in languages" :key="language.name"
                            :value="language.name">
                        {{ language.name }}
                    </option>
                </b-select>
            </b-field>
        </div>
        <b-table id="phrasebookTable"
                 :data="visibleRows">
            <template slot-scope="props">
                <b-table-column
                        field="summary"
                        label="Summary"
                ><p> {{ props.row.summary }}</p>
                </b-table-column>
                <b-table-column
                        field="content"
                        label="English"
                ><p> {{ props.row.content }}</p>
                </b-table-column>
                <b-table-column
                        :field="selectedLanguages"
                        :label="selectedLanguages"
                ><div class="is-vcentered"> {{ props.row.translations[selectedLanguages] }}</div>
                </b-table-column>
                <b-table-column>
                    <b-button icon-left="play" @click="openPreview(props.row)">Play</b-button>
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script>
    import axios from 'axios';
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";

    export default {
        name: "SearchableTable",
        mounted() {
            axios
                .get('https://api.translatefor.sg/api/v1/phrases')
                .then(response => {
                    const data = response.data.results;

                    let i = 0;
                    for (const phrase of data) {
                        const trs = {};
                        const audioClips = {};
                        phrase['order'] = i++;
                        for (const translation of phrase.translations) {
                            trs[translation['language']] = translation['content'];
                            audioClips[translation['language']] = translation['audio_clip'];
                        }
                        phrase['translations'] = trs;
                        phrase['audio_clips'] = audioClips;
                    }
                    this.data = data;
                });
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
                selectedLanguages: 'Bengali',
                selectedCategory: 'All Categories',
                columns: [],
                searchText: '',
            }
        },
        computed: {
            visibleRows: function () {
                let data = this.data;
                data = data.filter(row => (this.selectedCategory === 'All Categories') || row.category === this.selectedCategory);

                const searchQuery = this.searchText.trim().toLowerCase();

                if (searchQuery) {
                    data = data.filter(row => (row.content.toLowerCase().includes(searchQuery)));
                }

                return data;
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
                        selectedLanguage: this.selectedLanguages
                    }
                })
            }
        }
    }
</script>

<style>
</style>