<template>
    <div class="card" v-if="row" @keydown.left="previousTrack" @keydown.right="nextTrack">
        <div class="card-content" v-touch:swipe.left="nextTrack" v-touch:swipe.right="previousTrack">
            <p class="smallText">{{ row.phrase.content }}</p>
            <p class="largeText">{{ row.content }}</p>
            <p v-if="!row.audio_clip" class="smallText">No Audio</p>
        </div>
        <footer class="modal-card-foot">
            <div class="block center-block">
                <b-button class="is-centered" type="is-link" @click="previousTrack" icon-left="skip-previous"
                          v-if="data[innerRowIndex - 1]">
                    {{ data[innerRowIndex - 1].phrase.summary }}
                </b-button>
                <b-button v-if="row.audio_clip && !isLoading" class="is-centered"
                          icon-left="play" :type="isPlaying ? 'is-light': 'is-success'" @click="playAudio">
                    Play Again
                </b-button>
                <b-button v-if="isLoading" class="is-centered" icon-left="play" :type="'is-warning'">Loading...
                </b-button>
                <b-button class="is-centered" type="is-link" @click="nextTrack" icon-right="skip-next"
                          v-if="data[innerRowIndex + 1]">
                    {{ data[innerRowIndex + 1].phrase.summary }}
                </b-button>
            </div>
        </footer>

    </div>
</template>

<script>
    import {Howl} from 'howler';

    export default {
        name: "TranslationPreviewModal",
        props: ['data', 'rowIndex', 'selectedLanguage'],
        data() {
            return {
                isPlaying: false,
                isLoading: true,
                currentSoundTrack: null,
                currentTrackId: null,
                innerRowIndex: null,
            }
        },
        mounted() {
            this.innerRowIndex = this.rowIndex;
            this.playAudio();
        },
        computed: {
            row: function () {
                return this.data[this.innerRowIndex] || null;
            }
        },
        watch: {
            innerRowIndex() {
                this.$ga.event({
                    eventCategory: 'Usage',
                    eventAction: 'OpenPreview',
                    eventLabel: this.selectedLanguage,
                    eventValue: this.row.phrase.summary
                });
            }
        },
        methods: {
            playAudio() {
                const audioClip = this.row.audio_clip;
                if (audioClip) {
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    const component = this;
                    this.isLoading = true;
                    this.currentSoundTrack = new Howl({
                        src: audioClip,
                        autoplay: true,
                        loop: false,
                        volume: 1.0,
                        onload: function () {
                            component.isLoading = false;
                            component.isPlaying = true;
                        },
                        onend: function () {
                            component.isPlaying = false;
                        }
                    });
                    this.currentTrackId = this.currentSoundTrack.play();
                }
            },
            stopPlaying() {
                if (!this.currentSoundTrack) return;
                this.currentSoundTrack.unload();
            },
            closeModal() {
                this.stopPlaying();
                this.$parent.close();
            },
            previousTrack() {
                this.stopPlaying();
                if (this.innerRowIndex > 0) {
                    this.innerRowIndex--;
                    this.playAudio();
                }
            },
            nextTrack() {
                this.stopPlaying();
                if (this.innerRowIndex < this.data.length - 1) {
                    this.innerRowIndex++;
                    this.playAudio();
                }
            }
        },
    }
</script>

<style scoped>
    .largeText {
        font-size: 200%;
        padding: 30px;
        text-align: center;
    }

    .smallText {
        text-align: center;
    }

    .center-block {
        margin-left: auto;
        margin-right: auto;
    }

    .card-content {
        max-height: 70vh;
        overflow-y: scroll;
    }
</style>
