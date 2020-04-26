<template>
    <div class="card">
        <div class="card-content">
            <b-tag rounded type="is-warning">{{ row.phrase.summary }}</b-tag>
            <br><br>
            <p class="subtitle is-6 pre-line" v-if="needsOriginalPhrase">
                {{ row.phrase.content }}
            </p>
            <p :class="'subtitle is-4 pre-line ' + (needsOriginalPhrase ? 'has-text-centered' : 'has-text-left')">
                {{ row.content }}
            </p>
            <div class="buttons is-centered">
                <b-button class="is-left" icon-left="alert-octagon" type="is-dark" @click="openFeedback(row)"></b-button>
                <b-button icon-left="video" type="is-info" @click="openPreview(row)">Preview</b-button>
                <b-button icon-left="play" type="is-primary"
                          @click="playAudio(row)"
                          v-if="!amIPlaying(row)">Play</b-button>
                <b-button icon-left="stop" type="is-danger"
                          @click="stopPlaying()"
                          v-if="amIPlaying(row)">Stop</b-button>
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
        props: ['row', 'needsOriginalPhrase', 'data'],
        data() {
            return {
                currentRow: null,
                isLoading: false,
                isPlaying: false
            }
        },
        methods: {
            amIPlaying(row) {
                return row && this.currentRow && row.id === this.currentRow.id;
            },
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
                            this.$ga.event({
                                eventCategory: 'Error',
                                eventAction: 'LoadError',
                            });
                        },
                        onplayerror: function () {
                            component.currentRow = null;
                            this.$ga.event({
                                eventCategory: 'Error',
                                eventAction: 'PlayError',
                            });
                        },
                        onstop: function () {
                            component.currentRow = null;
                        },
                    });
                    soundTrack.play();
                    this.$ga.event({
                        eventCategory: 'Usage',
                        eventAction: 'PlayDirectly'
                    });
                }
            },
            stopPlaying() {
                Howler.unload();
                this.currentRow = null;
            },
            openPreview(row) {
                this.stopPlaying();
                this.$buefy.modal.open({
                    parent: this,
                    component: TranslationPreviewModal,
                    hasModalCard: true,
                    props: {
                        data: this.data,
                        rowIndex: row.order,
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
                    eventAction: 'Form Opened'
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