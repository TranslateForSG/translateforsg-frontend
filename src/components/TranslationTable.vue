<template>
    <b-table id="phrasebookTable" :data="visibleRows">
        <template slot-scope="props">
            <b-table-column field="content" label="English" v-if="needsOriginalPhrase">
                <strong class="pre-line">{{ props.row.phrase.content }}</strong>
            </b-table-column>
            <b-table-column :field="selectedLanguage" :label="selectedLanguage">
                <span class="pre-line">{{ props.row.content }}</span>
            </b-table-column>
            <b-table-column>
                <b-button icon-left="play" type="is-primary" @click="openPreview(props.row)">Play</b-button>
            </b-table-column>
            <b-table-column>
                <b-button icon-left="help" type="is-light" @click="openFeedback(props.row)">Feedback</b-button>
            </b-table-column>
        </template>
    </b-table>
</template>

<script>
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";
    import TranslationFeedback from "@/components/TranslationFeedback";

    export default {
        name: "TranslationTable",
        props: ['data', 'visibleRows', 'selectedLanguage', 'selectedCategoryObject'],
        methods: {
            openPreview(row) {
                this.$buefy.modal.open({
                    parent: this,
                    component: TranslationPreviewModal,
                    hasModalCard: true,
                    props: {
                        data: this.data,
                        rowIndex: row.order,
                        selectedLanguage: this.selectedLanguage,
                        needsOriginal: this.needsOriginalPhrase,
                    }
                })
            },
            openFeedback(row) {
                this.$ga.event({
                    eventCategory: 'Feedback',
                    eventAction: 'Form Opened',
                    eventLabel: this.selectedLanguage
                });
                this.$buefy.modal.open({
                    parent: this,
                    component: TranslationFeedback,
                    hasModalCard: true,
                    props: {
                        translation: row
                    }
                })
            },
            needsOriginalPhrase() {
                return this.selectedCategoryObject && (this.selectedCategoryObject.needs_original_phrase === null || this.selectedCategoryObject.needs_original_phrase);
            }
        }
    }
</script>

<style scoped>

</style>