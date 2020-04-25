<template>
    <b-button class="fixed-button" size="is-large"
              @click="goBackCategoryChoice()" icon-left="arrow-left">
        Go Back
    </b-button>
</template>

<script>
    export default {
        name: "BackButton",
        methods: {
            goBackCategoryChoice() {
                const splitPath = this.$route.path.split('/');
                splitPath.pop();
                const newPath = splitPath.join('/');
                this.$router.push({path: newPath || '/'});
            }
        }
    }
</script>

<style scoped>

</style>