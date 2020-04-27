<template>
    <div class="full-width">
        <div class="block" v-if="$route.params.language">
            <h2 class="title">{{$route.params.language}}</h2>
        </div>
        <div class="block">
            <b-tabs v-model="activeTab" type="is-boxed">
                <b-tab-item v-for="section of sections" :key="section.id" :label="section.name">
                    <div class="block">
                        <b-button class="fixed-button" size="is-large" tag="router-link" :to="getPath('All Categories')"
                                  type="is-light">All Categories
                        </b-button>
                    </div>
                    <div class="block" v-for="category in section.categories" :key="category.id">
                        <b-button class="fixed-button" size="is-large" tag="router-link" :to="getPath(category.name)"
                                  type="is-light">{{category.name}}
                        </b-button>
                    </div>
                </b-tab-item>
            </b-tabs>
        </div>
        <div class="block" v-if="$route.path !== '/'">
            <BackToCategoriesButton/>
        </div>
    </div>
</template>

<script>
    import BackToCategoriesButton from "@/components/BackButton";
    import {getSections} from "@/services/api-service";

    export default {
        name: "CategoryChoiceComponent",
        components: {BackToCategoriesButton},
        data() {
            return {
                sections: [],
                activeTab: null
            }
        },
        watch: {
            activeTab: function (newTab, oldTab) {
                localStorage.setItem('activeSectionTab', newTab);
            }
        },
        mounted() {
            this.loadSections();
        },
        methods: {
            getPath(value) {
                return this.$route.path + (this.$route.path.endsWith('/') ? '' : '/') + value;
            },
            loadSections() {
                getSections().then(response => {
                    this.sections = response.results;

                    const activeTab = localStorage.getItem('activeSectionTab');

                    if (activeTab === null) {
                        localStorage.setItem('activeSectionTab', 1);
                    } else {
                        setTimeout(() => {this.activeTab = parseInt(activeTab)}, 500);
                    }
                });
            }
        },
    }
</script>

<style>
    .fixed-button {
        width: 90%;
        max-width: 400px;
    }

    .full-width {
        width: 100%;
    }

    nav.tabs ul {
        justify-content: center;
    }
</style>