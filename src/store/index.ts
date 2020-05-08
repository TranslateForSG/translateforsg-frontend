import Vue from 'vue'
import Vuex from 'vuex'
import { Category, Language, Section, Translation, Downloadable } from '@/services/api'
import * as apiService from "@/services/api-service"

Vue.use(Vuex)

interface Idable {
  id: number;
}

interface Named {
  name: string;
}

interface State {
  categories: Category[];
  languages: Language[];
  sections: Section[];
  translations: Translation[];
  downloadables: Downloadable[];

  currentCategory: Category | null;
  currentCategoryIndex: number | null;
  currentLanguage: Language | null;
  currentLanguageIndex: number | null;
  currentSection: Section | null;
  currentSectionIndex: number | null;

  searchText: string;
}

const state: State = {
  categories: Array<Category>(),
  languages: Array<Language>(),
  sections: Array<Section>(),
  translations: Array<Translation>(),
  downloadables: Array<Downloadable>(),

  currentCategory: null,
  currentCategoryIndex: null,
  currentLanguage: null,
  currentLanguageIndex: null,
  currentSection: null,
  currentSectionIndex: null,

  searchText: '',
};

function findIndexById(arr: Array<Idable>, obj: Idable) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === obj.id) {
      return i;
    }
  }

  return null;
}

function findIndexByCode(arr: Array<Language>, obj: Language) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].code === obj.code) {
      return i;
    }
  }

  return null;
}

function findIndexByName(arr: Array<Named>, name: string) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return i;
    }
  }

  return null;
}

export default new Vuex.Store({
  state,
  getters: {
    getQuery: state => () => {
      const query = {
        language: state.currentLanguage?.name || '',
        category: ''
      };

      if (state.currentCategory && state.currentCategory.name !== 'All Categories') {
        query.category = state.currentCategory.name;
      }

      return query;
    },
    getVisibleRows: state => () => {
      if (state.searchText) {
        return state.translations.filter(row => (row.phrase.content.toLowerCase().includes(state.searchText.toLowerCase())))
      }
      return state.translations;
    },
    getVisibleDownloadables: state => () => {
      if (state.searchText) {
        return state.downloadables.filter(row => (row.name.toLowerCase().includes(state.searchText.toLowerCase())))
      }
      return state.downloadables;
    },
  },
  mutations: {
    SET_CATEGORIES(state, categories: Category[]) {
      state.categories = categories;
    },
    SET_LANGUAGES(state, languages: Language[]) {
      state.languages = languages;
    },
    SET_SECTIONS(state, sections: Section[]) {
      state.sections = sections;
    },
    SET_TRANSLATIONS(state, translations: Translation[]) {
      state.translations = translations;
    },
    SET_DOWNLOADABLES(state, downloadables: Downloadable[]) {
      state.downloadables = downloadables;
    },
    SET_SEARCH_TEXT(state, searchText: string) {
      state.searchText = searchText;
    },
    SET_CURRENT_CATEGORY(state, category: Category, index: number | null = null) {
      state.currentCategory = category;

      state.currentCategoryIndex = (index === null) ? findIndexById(state.categories, category) : index;
    },
    SET_CURRENT_CATEGORY_BY_NAME(state, name: string | null) {
      if (!name) {
        state.currentCategory = null;
        state.currentCategoryIndex = null;
        return;
      }

      const categoryIdx = findIndexByName(state.categories, name);

      if (categoryIdx === null) { return }

      state.currentCategory = state.categories[categoryIdx];
      state.currentCategoryIndex = categoryIdx;
    },
    SET_CURRENT_LANGUAGE(state, language: Language, index: number | null = null) {
      state.currentLanguage = language;

      state.currentLanguageIndex = (index === null) ? findIndexByCode(state.languages, language) : index;
    },
    SET_CURRENT_LANGUAGE_BY_NAME(state, name: string | null) {
      if (!name) {
        state.currentLanguage = null;
        state.currentLanguageIndex = null;
        return;
      }

      const languageIdx = findIndexByName(state.languages, name);

      if (languageIdx === null) { return }

      state.currentLanguage = state.languages[languageIdx];
      state.currentLanguageIndex = languageIdx;
    },
    SET_CURRENT_SECTION(state, section: Section, index: number | null = null) {
      state.currentSection = section;

      state.currentSectionIndex = (index === null) ? findIndexById(state.sections, section) : index;
    },
  },
  actions: {
    async loadCategories({ commit }) {
      return apiService.listCategories()
        .then(response => {
          const categories = response.results;
          // eslint-disable-next-line @typescript-eslint/camelcase
          categories.splice(0, 0, { id: 0, name: 'All Categories', needs_original_phrase: true });
          commit('SET_CATEGORIES', categories);
        });
    },
    async loadLanguages({ commit }) {
      return apiService.listLanguages()
        .then(response => {
          commit('SET_LANGUAGES', response.results);
        });
    },
    async loadSections({ commit }) {
      return apiService.getSections()
        .then(response => {
          commit('SET_SECTIONS', response.results);
        });
    },
    async loadTranslations({ getters, commit }) {
      return apiService.listTranslations(getters.getQuery())
        .then(response => {
          let i = 0;
          response.results.forEach(row => row.order = i++);
          commit('SET_TRANSLATIONS', response.results);
        });
    },
    async loadDownloadables({ getters, commit }) {
      return apiService.getDownloadables(getters.getQuery())
        .then(response => {
          let i = 0;
          response.results.forEach(row => row.order = i++);
          commit('SET_DOWNLOADABLES', response.results);
        });
    },
  },
  modules: {
  }
})
