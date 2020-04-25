<template>
    <div class="card">
        <div class="card-content">
            <p class="subtitle is-6">
                {{ row.phrase.content }}
            </p>
            <p class="subtitle is-4">
                {{ row.content }}
            </p>
            <div class="buttons is-centered">
                <b-button class="is-left" icon-left="mailbox" type="is-light" @click="openFeedback(row)">Feedback</b-button>
                <b-button icon-left="play" type="is-primary" @click="openPreview(row)">Play Audio</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";
    import TranslationFeedback from "@/components/TranslationFeedback";

    export default {
        name: "TranslationCard",
        props: ['row', 'selectedCategoryObject', 'selectedLanguage', 'data'],
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