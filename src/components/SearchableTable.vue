<template>
  <div>
    <ChoiceComponent
      v-if="!$store.state.currentCategory && !$store.state.currentLanguage"
      :choices="languageChoices"
    />
    <CategoryChoiceComponent v-if="!$store.state.currentCategory && $store.state.currentLanguage" />
    <section
      v-if="$store.state.currentCategory && $store.state.currentLanguage"
      style="width: 100%"
    >
      <div class="block">
        <b-field custom-class="is-large" style="justify-content: center">
          <span></span>
          <SearchBox />
        </b-field>
      </div>
      <CategoryNavigation />
      <TranslationTable />
      <br />
      <CategoryNavigation />
      <div class="block">
        <BackToCategoriesButton />
      </div>
    </section>
  </div>
</template>

<script>
import ChoiceComponent from "@/components/ChoiceComponent";
import TranslationTable from "@/components/TranslationTable";
import CategoryNavigation from "@/components/CategoryNavigation";
import BackToCategoriesButton from "@/components/BackButton";
import CategoryChoiceComponent from "@/components/CategoryChoiceComponent";
import SearchBox from "@/components/SearchBox";

export default {
  name: "SearchableTable",
  components: {
    CategoryChoiceComponent,
    BackToCategoriesButton,
    CategoryNavigation,
    TranslationTable,
    ChoiceComponent,
    SearchBox
  },
  mounted() {
    Promise.all([
      this.$store.dispatch("loadCategories"),
      this.$store.dispatch("loadLanguages")
    ])
      .then(() => this.loadParams())
      .then(() => this.getListing());
  },
  watch: {
    $route() {
      this.loadParams();
      this.getListing();
    }
  },
  computed: {
    languageChoices: function() {
      return this.$store.state.languages.map(l => ({
        value: l.name,
        label: l.name + " (" + l.native_name + ")"
      }));
    },
    categoryChoices: function() {
      return this.$store.state.categories.map(l => ({
        value: l.name,
        label: l.name
      }));
    }
  },
  methods: {
    getListing() {
      // prevent API calls
      if (
        !this.$store.state.currentCategory ||
        !this.$store.state.currentLanguage
      ) {
        return;
      }

      this.$store.dispatch("loadTranslations");
      this.$store.dispatch("loadDownloadables");
    },
    loadParams() {
      this.$store.commit(
        "SET_CURRENT_LANGUAGE_BY_NAME",
        this.$route.params.language
      );
      this.$store.commit(
        "SET_CURRENT_CATEGORY_BY_NAME",
        this.$route.params.category
      );
    }
  }
};
</script>

<style>
.center-block {
  margin-left: auto;
  margin-right: auto;
}

.pre-line {
  white-space: pre-line;
}
</style>
