<template>
    <div class="card">
        <div class="card-content">
            <h1 class="subtitle">Are you sure you want to call {{ displayName }}?</h1>
            <div class="block">
                <section>
                    <p class="has-text-danger">This voluntary service is only for doctors and healthcare professionals.</p>
                    <p class="has-text-danger">Please do not use this for personal consultation.</p>
                </section>
            </div>
        </div>

        <footer class="modal-card-foot">
            <b-button type="is-link" size="is-medium" @click="$parent.close()">Go Back</b-button>
            <a :href="'tel:' + phoneNumber" class="button is-danger is-medium">
                Call {{displayName}}
            </a>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "VolunteerCallConfirm",
        props: ['displayName', 'phoneNumber'],
        data() {
            return {}
        },
        computed: {
            visibleRows: function () {
                // console.log(row);
                return this.data.filter(row => (this.selectedLanguages === 'All') || row.language === this.selectedLanguages);
            }
        },
        methods: {}
    }
</script>

<style>
</style>