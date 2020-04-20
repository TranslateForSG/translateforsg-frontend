<template>
    <div class="card">
        <div class="card-content has-text-centered">
            <article class="message">
                <div class="message-header">
                    <p>Our Contributors</p>
                </div>
                <div class="message-body">
                    These are the heroes responsible for ensuring our medical workers can protect the
                    people of the tiny island we call home. The <strong>Kampung spirit</strong> is still alive today!
                    The list isn't small, it scrolls!
                </div>
            </article>
            <br>
            <div class="credits">
                <span v-for="contributor of contributors" :key="contributor.id" v-bind:style="{ fontSize: getRandomSize() + 'px' }">{{ contributor.name }}</span>
            </div>
            <br>
            <div>Missing from the list? Submit your name <a href="https://forms.gle/KNiSteMC4arNPtGN8">here</a>.</div>
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