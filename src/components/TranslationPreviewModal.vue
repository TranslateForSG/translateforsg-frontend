<template>
    <div class="card" v-if="row">
        <div class="card-content" v-touch:swipe.left="nextTrack" v-touch:swipe.right="previousTrack">
            <p class="smallText">{{ row.content }}</p>
            <p class="largeText">{{ row.translations[this.selectedLanguage] }}</p>
            <p v-if="!row.audio_clips[this.selectedLanguage]" class="smallText">No Audio</p>
        </div>


        <footer class="modal-card-foot">
            <div class="columns">
                <div class="column">
                    <b-button class="is-centered" type="is-link" @click="previousTrack" icon-left="skip_backward">
                        Previous
                    </b-button>
                </div>
                <div class="column">
                    <b-button v-if="row.audio_clips[this.selectedLanguage] && !isLoading" class="is-centered"
                              icon-left="play" :type="isPlaying ? 'is-light': 'is-success'" @click="playAudio">Play
                        Again
                    </b-button>
                    <b-button v-if="isLoading" class="is-centered" icon-left="play" :type="'is-warning'">Loading...
                    </b-button>
                </div>
                <div class="column">
                    <b-button class="is-centered" type="is-link" @click="nextTrack" icon-right="skip_forward">Next
                    </b-button>
                </div>
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
        methods: {
            playAudio() {
                const audioClip = this.row.audio_clips[this.selectedLanguage];
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
                }
            },
            closeModal() {
                if (this.currentSoundTrack && this.isPlaying) {
                    this.currentSoundTrack.stop();
                }
                this.$parent.close();
            },
            previousTrack() {
                if (this.currentSoundTrack && this.isPlaying) {
                    this.currentSoundTrack.stop();
                }
                if (this.innerRowIndex > 0) {
                    this.innerRowIndex--;
                }
                this.playAudio();
            },
            nextTrack() {
                if (this.currentSoundTrack && this.isPlaying) {
                    this.currentSoundTrack.stop();
                }

                if (this.innerRowIndex < this.data.length - 1) {
                    this.innerRowIndex++;
                }
                this.playAudio();
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
</style>