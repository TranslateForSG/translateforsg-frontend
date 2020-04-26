<template>
    <b-button :icon-left="currentState ? 'heart' : 'heart-outline'" :type="currentState ? 'is-info' : ''"
              @click="toggle"></b-button>
</template>

<script>
    import {SnackbarProgrammatic as Snackbar} from 'buefy'

    export default {
        name: "BookmarkButton",
        data() {
            return {
                currentState: null,
                currentSnackBar: null
            }
        },
        props: [
            'bookmarked'
        ],
        mounted() {
            this.currentState = this.bookmarked;
        },
        watch: {
            bookmarked() {
                this.currentState = this.bookmarked;
            }
        },
        methods: {
            toggle() {
                this.currentState = !this.currentState;
                const snackBarMessage = this.currentState ? 'Added to Favorites' : 'Deleted from Favorites';

                if (this.currentState === true) {
                    this.$emit('add')
                } else {
                    this.$emit('remove');
                }

                if (this.currentSnackBar) {
                    this.currentSnackBar.close();
                }
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const component = this;

                this.currentSnackBar = Snackbar.open({
                    message: snackBarMessage,
                    duration: 5000,
                    queue: false,
                    actionText: 'View Favorites',
                    onAction() {
                        component.$router.push({path: '/favorites'});
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>