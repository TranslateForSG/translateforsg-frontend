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
            <BackToCategoriesButton />
        </div>
    </div>
</template>

<script>
    import BackToCategoriesButton from "@/components/BackButton";

    export default {
        name: "ChoiceComponent",
        components: {BackToCategoriesButton},
        props: ['choices'],
        methods: {
            getPath(value) {
                return this.$route.path + (this.$route.path.endsWith('/') ? '' : '/') + value;
            }
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