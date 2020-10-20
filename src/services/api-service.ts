import axios from 'axios';
import {
    ApiResponse,
    Category,
    Contributor, Downloadable, DownloadableQuery,
    Language, Section,
    Translation, TranslationFeedback,
    TranslationFeedbackRequest,
    TranslationQuery
} from "@/services/api";

export const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

// eslint-disable-next-line
export const toQueryString = (params: any) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export const listLanguages = async () => {
    const requestUrl = `/api/v1/languages.json`;
    const response = await apiClient.get<ApiResponse<Language>>(requestUrl);
    return response.data;
}

export const listCategories = async () => {
    const requestUrl = `/api/v1/categories.json`;
    const response = await apiClient.get<ApiResponse<Category>>(requestUrl);
    return response.data;
}

export const listContributors = async () => {
    const requestUrl = `/api/v1/contributors.json`;
    const response = await apiClient.get<ApiResponse<Contributor>>(requestUrl);
    return response.data;
}

export const listTranslations = async (query: TranslationQuery) => {
    // eslint-disable-next-line
    const queryParams: any = {};

    // if (query.search) {
    //     queryParams['search'] = query.search;
    // }

    // if (query.phrases) {
    //     queryParams['phrases'] = query.phrases;
    // }

    let requestUrl = `/api/v1/${query.language}/All.json`;
    if (query.category) {
        requestUrl = `/api/v1/${query.language}/${query.category}.json`;
    }
    const response = await apiClient.get<ApiResponse<Translation>>(requestUrl);
    return response.data;
};

export const postTranslationFeedback = async (translationFeedback: TranslationFeedbackRequest) => {
    const requestUrl = '/api/v1/translationFeedbacks/';
    const response = await apiClient
        .post<ApiResponse<TranslationFeedback>>(requestUrl, translationFeedback);
    return response.data;
}

export const getDownloadables = async (config: DownloadableQuery) => {
    let requestUrl = `/api/v1/downloadables/${config.language}/All.json`;
    if (config.category) {
        requestUrl = `/api/v1/downloadables/${config.language}/${config.category}.json`;
    }
    const response = await apiClient.get<ApiResponse<Downloadable>>(requestUrl);
    return response.data;
}

export const getSections = async () => {
    const requestUrl = '/api/v1/sections.json';
    const response = await apiClient.get<ApiResponse<Section>>(requestUrl);
    return response.data;
}