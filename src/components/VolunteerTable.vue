<template>
    <div class="card">
        <div class="card-content">
            <h1 class="subtitle">On-Call Translation Volunteers</h1>
            <div class="block">
                <section>
                    <b-message title="This voluntary service is only for doctors and healthcare professionals." :active.sync="isActive" aria-close-label="Close message">
                        <p>The translators are mostly non-medical, so do take care to explain any jargon thoroughly for a smoother conversation.
                            <br>We are individual community members volunteering during this outbreak, and although not associated with any organisation, have been translating for the Community Isolation Facility in Expo over the weekend. <br></p>
                    </b-message>
                </section>
            </div>
            <div class="block">
                <div class="block">
                    <b-field label="Language:">
                        <b-select size="large" placeholder="Language" v-model="selectedLanguages">
                            <option v-for="language in languages" :key="language.name"
                                    :value="language.name">
                                {{ language.name }}
                            </option>
                        </b-select>
                    </b-field>
                </div>
            </div>
            <b-table
                    :data="visibleRows">
                <template slot-scope="props">
                <b-table-column
                        field="display_name"
                        label="Name"
                >{{ props.row.display_name }}</b-table-column>
                <b-table-column
                        field="language"
                        label="Language"
                >{{ props.row.language }}</b-table-column>
                <b-table-column
                        field="phone_number"
                        label="Handphone"
                ><b-button icon-left="phone" type="is-warning" @click="confirmCall(props.row)">
                    {{ props.row.phone_number }}
                </b-button></b-table-column>
                    <b-table-column
                            field="notes"
                            label="Note"
                    >{{ props.row.notes }}</b-table-column>
                </template>
            </b-table>
        </div>
        <footer class="modal-card-foot">
            <b-button type="is-link" @click="$parent.close()">Go Back</b-button>
        </footer>
    </div>
</template>

<script>
    import axios from 'axios';
    import VolunteerCallConfirm from "@/components/VolunteerCallConfirm";

    export default {
        name: "VolunteerTable",
        mounted() {
            axios
                .get('https://api.translatefor.sg/api/v1/volunteers')
                .then(response => {
                    this.data = response.data.results;
                });
            axios
                .get('https://api.translatefor.sg/api/v1/languages')
                .then(response => {
                    this.languages = response.data.results;
                });
        },
        data() {
            return {
                data: [],
                languages: [],
                isActive: true,
                selectedLanguages: 'Bengali',
                displayUnavailable: false,
                columns: [
                    {
                        label: 'Name',
                        field: 'display_name'
                    },
                    {
                        label: 'Language',
                        field: 'language'
                    },
                    {
                        label: 'Phone Number',
                        field: 'phone_number'
                    },
                    {
                        label: 'Note',
                        field: 'notes'
                    }
                ]
            }
        },
        computed: {
            visibleRows: function() {
                // console.log(row);
                return this.data.filter(row => (this.selectedLanguages === 'All') || row.language === this.selectedLanguages);
            }
        },
        methods: {
            confirmCall($ev) {
                this.$buefy.modal.open({
                    parent: this,
                    component: VolunteerCallConfirm,
                    hasModalCard: true,
                    trapFocus: true,
                    props: {
                        displayName: $ev.display_name,
                        phoneNumber: $ev.phone_number
                    }
                })
            }
        }
    }
</script>

<style>
</style>