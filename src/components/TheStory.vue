<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <article class="message">
                <div class="message-header">
                    <p>The Story</p>
                </div>
                <div class="message-body">
                    <p>This website started from the work of Sudesna Roy Chowdhury's Website. The website had been a
                        treasure trove of translations from the Singaporean Bengali community.
                        <a href="https://docs.google.com/spreadsheets/d/1T96tsR2y0bZYUAnrjLv6ZX0j9gPMNQpI1F8AuRedRk0/edit#gid=786619596">Medi-translate</a>
                        and other communities stepped up to drive the efforts to many languages.</p>
                    <br>
                    <p>Many have worked and contributed to this project, we thank you all for coming forward for Singapore! 🇸🇬</p>
                    <br>
                    <p>This spontaneous volunteer-driven project is <strong>not affiliated to any organization</strong>.</p>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ContributorList",
        data() {
            return {
                contributors: []
            }
        },
        mounted() {
            axios
                .get('https://api.translatefor.sg/api/v1/contributors')
                .then(response => {
                    this.contributors = response.data.results;
                    let i = 0;
                    this.contributors.forEach(contributor => contributor.id = i++);
                });
        },
        methods: {
            getRandomSize() {
                return Math.floor(Math.random() * 24) + 10;
            }
        }
    }
</script>

<style scoped>
    .credits {
        max-height: 40vh;
        overflow-y: scroll;
    }

    .credits span {
        margin: 5px;
    }

    .credits span:hover {
        color: #0d64c6;
    }


</style>