<template>
    <div class="downloadables">
        <div v-for="downloadable of downloadables"
             :key="downloadable.id"
             class="downloadable-card">
            <DownloadableCard :downloadable="downloadable"/>
        </div>
        <div v-if="!downloadables || downloadables.length === 0">
            <h2 class="subtitle is-4">Sorry, no Downloads are available for {{selectedLanguage}}.</h2>
        </div>
        <br>
        <BackButton />
    </div>
</template>

<script>
    import DownloadableCard from "@/components/DownloadableCard";
    import {getDownloadables} from "@/services/api-service";
    import BackButton from "@/components/BackButton";

    export default {
        name: "DownloadableTable",
        components: {BackButton, DownloadableCard},
        data() {
            return {
                downloadables: [],
                selectedLanguage: null
            };
        },
        watch: {
            $route() {
                this.selectedLanguage = this.$route.params.language;
                getDownloadables({language: this.selectedLanguage})
                    .then(response => {
                        this.downloadables = response.results;
                    });
            }
        },
        mounted() {
            this.selectedLanguage = this.$route.params.language;
            getDownloadables({language: this.selectedLanguage})
                .then(response => {
                    this.downloadables = response.results;
                });
        }
    }
</script>

<style scoped>
    .downloadable-card {
        margin: 20px auto;
        max-width: 640px;
        width: 100%;
    }
</style>