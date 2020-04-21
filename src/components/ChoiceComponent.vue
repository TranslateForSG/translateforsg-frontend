<template>
    <div class="full-width">
        <div class="block" v-if="$route.params.language">
            <h2 class="title">{{$route.params.language}}</h2>
        </div>
        <div class="block" v-for="choice of choices" :key="choice.value">
            <b-button class="fixed-button" size="is-large" tag="router-link" :to="getPath(choice.value)"
                      type="is-light">{{choice.label}}
            </b-button>
        </div>
        <div class="block" v-if="$route.path !== '/'">
            <b-button class="fixed-button" size="is-large" @click="goBackLanguageChoice()" icon-left="arrow-left">Go Back
            </b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChoiceComponent",
        props: ['choices'],
        methods: {
            getPath(value) {
                return this.$route.path + (this.$route.path.endsWith('/') ? '' : '/') + value;
            },
            goBackLanguageChoice() {
                const splitPath = this.$route.path.split('/');
                splitPath.pop();
                const newPath = splitPath.join('/');
                this.$router.push({path: newPath || '/'});
            },
        },
    }
</script>

<style scoped>
    .fixed-button {
        width: 90%;
        max-width: 400px;
    }

    .full-width {
        width: 100%;
    }
</style>