<template>
    <div class="card">
        <div class="card-content">
            <p class="subtitle is-6 pre-line" v-if="needsOriginalPhrase">
                {{ row.phrase.content }}
            </p>
            <p :class="'subtitle is-4 pre-line ' + (needsOriginalPhrase ? 'has-text-centered' : 'has-text-left')">
                {{ row.content }}
            </p>
            <div class="buttons is-centered">
                <b-button class="is-left" icon-left="mailbox" type="is-light" @click="openFeedback(row)">Feedback
                </b-button>
                <b-button icon-left="video" type="is-info" @click="openPreview(row)">Preview</b-button>
                <b-button icon-left="play" type="is-primary"
                          @click="playAudio(row)"
                          :disabled="row && currentRow && row.id === currentRow.id">Play Audio
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";
    import TranslationFeedback from "@/components/TranslationFeedback";
    import {Howl, Howler} from "howler";

    export default {
        name: "TranslationCard",
        props: ['row', 'selectedCategoryObject', 'selectedLanguage', 'data'],
        data() {
            return {
                currentRow: null,
                isLoading: false,
                isPlaying: false
            }
        },
        computed: {
            needsOriginalPhrase() {
                return this.selectedCategoryObject && (this.selectedCategoryObject.needs_original_phrase === null || this.selectedCategoryObject.needs_original_phrase);
            }
        },
        methods: {
            playAudio(row) {
                this.stopPlaying();
                const audioClip = row.audio_clip;
                if (audioClip) {
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    const component = this;
                    this.isLoading = true;
                    component.currentRow = row;
                    const soundTrack = new Howl({
                        src: audioClip,
                        autoplay: true,
                        html5: true,
                        loop: false,
                        volume: 1.0,
                        onload: function () {
                            component.isLoading = false;
                        },
                        onplay: function () {
                            component.isPlaying = true;
                        },
                        onend: function () {
                            component.isPlaying = false;
                            component.currentRow = null;
                        },
                        onloaderror: function () {
                            component.currentRow = null;
                        },
                        onplayerror: function () {
                            component.currentRow = null;
                        },
                        onstop: function () {
                            component.currentRow = null;
                        },
                    });
                    soundTrack.play();
                }
            },
            stopPlaying() {
                Howler.unload();
                this.currentRow = null;
            },
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
                    },
                    onCancel() {
                        console.log('closed');
                        Howler.unload();
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
            }
        }
    }
</script>

<style scoped>

</style>