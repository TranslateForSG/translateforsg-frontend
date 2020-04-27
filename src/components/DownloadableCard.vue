<template>
    <div class="card">
        <div class="card-content">
            <p class="subtitle is-5">
                {{ downloadable.name }}
            </p>
            <div class="buttons is-centered">
                <b-button icon-left="download" type="is-info" tag="a" :href="downloadable.downloadable_file" download>
                    Download {{fileExtension}} File
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import TranslationPreviewModal from "@/components/TranslationPreviewModal";
    import TranslationFeedback from "@/components/TranslationFeedback";
    import {Howl, Howler} from "howler";
    import BookmarkButton from "@/components/BookmarkButton";
    import * as FavoritesService from "@/services/favorites-service";

    export default {
        name: "DownloadableCard",
        props: ['downloadable'],
        computed: {
            fileName() {
                const parts = this.downloadable.downloadable_file.split('/');

                if (!parts) {
                    return '';
                }

                return parts[parts.length - 1];
            },
            fileExtension() {
                const parts = this.fileName.split('.');

                if (parts.length > 1) {
                    return '.' + parts[parts.length - 1];
                }

                return '';
            },
        }
    }
</script>

<style scoped>
</style>