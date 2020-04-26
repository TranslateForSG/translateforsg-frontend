<template>
    <div class="card">
        <div class="card-content" v-if="!submitted">
            <h2 class="subtitle">Suggest Correction</h2>
            <b-field label="Your Name (Optional, for crediting)">
                <b-input v-model="name"></b-input>
            </b-field>
            <p>
                At least one of the following fields is required
            </p><br>
            <p class="pre-line has-background-light" style="padding: 5px">{{ translation.phrase.content }}</p>
            <br>
            <b-field label="What did we do wrong?">
                <b-input v-model="whatsWrong"></b-input>
            </b-field>
            <b-field label="What should be the correct translation?">
                <b-input v-model="suggestions"></b-input>
            </b-field>
            <vue-recaptcha sitekey="6LcwC-0UAAAAAAyDGxSZZfs7Bwo0CQbGLxvrfSEu" :loadRecaptchaScript="true" v-model="recaptcha" v-on:verify="onVerify"></vue-recaptcha>
            <br>
            <b-button icon-left="upload" size="is-medium" type="is-success" :disabled="!canSubmit" @click="submit()">Submit</b-button>&nbsp;
            <b-button icon-left="cancel" size="is-medium" type="is-danger" @click="$parent.close()">Cancel</b-button>
        </div>
        <div class="card-content has-text-centered" v-if="submitted && !failed">
            <h2 class="title has-text-success"><b-icon
                    icon="heart"
                    size="is-medium"
                    type="is-success"></b-icon> Thank you!</h2>
            <p>Thank you for your contribution! We will look into your suggestion and verify it. If we accept your translation, your name will be added to our contributors list.</p>
            <br>
            <b-button icon-left="close" size="is-medium" type="is-danger" @click="$parent.close()">Close</b-button>
        </div>
        <div class="card-content has-text-centered" v-if="submitted && failed">
            <h2 class="title has-text-danger"><b-icon
                    icon="close"
                    size="is-medium"
                    type="is-danger"></b-icon> Something went wrong!</h2>
            <p>Sorry we couldn't figure out what went wrong!</p>
            <br>
            <b-button icon-left="close" size="is-medium" type="is-danger" @click="$parent.close()">Close</b-button>
        </div>
    </div>
</template>

<script>
    import VueRecaptcha from "vue-recaptcha";
    import * as apiService from "@/services/api-service";

    export default {
        name: "TranslationFeedback",
        components: {
            VueRecaptcha
        },
        props: ['translation'],
        data: function () {
            return {
                name: '',
                whatsWrong: '',
                suggestions: '',
                recaptcha: '',
                submitted: false,
                failed: false,
            }
        },
        computed: {
            canSubmit() {
                return (this.whatsWrong.trim() || this.suggestions.trim()) && this.recaptcha;
            },
            postData() {
                return {
                    name: this.name,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    whats_wrong: this.whatsWrong,
                    suggestion: this.suggestions,
                    recaptcha: this.recaptcha,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    translation_id: this.translation.id
                }
            }
        },
        methods: {
            onVerify(response) {
                this.recaptcha = response;
            },
            submit() {
                apiService.postTranslationFeedback(this.postData)
                    .then(response => {
                        this.submitted = true;
                        this.failed = false;
                        this.$ga.event({
                            eventCategory: 'Feedback',
                            eventAction: 'Form Submission Success'
                        });
                    })
                    .catch(error => {
                        this.submitted = true;
                        this.failed = true;
                        this.$ga.event({
                            eventCategory: 'Feedback',
                            eventAction: 'Form Submission Failed'
                        });
                    });
            }
        }
    }
</script>

<style scoped>
    .card {
        max-height: 80vh;
        overflow-y: scroll;
    }
</style>
