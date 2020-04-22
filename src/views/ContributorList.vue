<template>
    <div class="center-flex">
        <div class="inner-container">
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
            <span v-for="contributor of contributors" :key="contributor.id"
                  v-bind:style="{ fontSize: getRandomSize() + 'px' }">{{ contributor.name }}</span>
            </div>
            <br>
            <div>
                <b-button icon-left="heart" tag="router-link" to="/thanks" type="is-primary">Say Thanks</b-button>
                <br><br>
                <p>Missing from the list? Submit your name <a href="https://forms.gle/KNiSteMC4arNPtGN8">here</a>.</p>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ContributorList",
        components: {},
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
    .credits span {
        margin: 5px;
    }

    .credits span:hover {
        color: #0d64c6;
    }

    .inner-container {
        max-width: 640px;
    }

    .center-flex {
        display: flex;
        justify-content: center;
    }
</style>