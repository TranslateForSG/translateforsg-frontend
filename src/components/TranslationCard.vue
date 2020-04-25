<template>
    <div class="card">
        <div class="card-content">
            <p class="subtitle is-6">
                {{ original }}
            </p>
            <p class="subtitle is-2">
                {{ translated }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TranslationCard",
        props: ['original', 'translated']
    }
</script>

<style scoped>

</style>