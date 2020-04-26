import axios from 'axios';
import {
    ApiResponse,
    Category,
    Contributor,
    Language,
    Translation, TranslationFeedback,
    TranslationFeedbackRequest,
    TranslationQuery
} from "@/services/api";

export const apiClient = axios.create({
    baseURL: 'https://api.translatefor.sg/',
    timeout: 5000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

const toQueryString = (params: any) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export const listLanguages = async (page = 1) => {
    const requestUrl = `/api/v1/languages/?page=${page}`;
    const response = await apiClient.get<ApiResponse<Language>>(requestUrl);
    return response.data;
}

export const listCategories = async (page = 1) => {
    const requestUrl = `/api/v1/categories/?page=${page}`;
    const response = await apiClient.get<ApiResponse<Category>>(requestUrl);
    return response.data;
}

export const listContributors = async (page = 1) => {
    const requestUrl = `/api/v1/contributors/?page=${page}`;
    const response = await apiClient.get<ApiResponse<Contributor>>(requestUrl);
    return response.data;
}

export const listTranslations = async (query: TranslationQuery) => {
    // eslint-disable-next-line
    const queryParams: any = {};

    if (query.category) {
        queryParams['phrase__category__name'] = query.category;
    }

    if (query.language) {
        queryParams['language__name'] = query.language;
    }

    if (query.search) {
        queryParams['search'] = query.search;
    }

    const requestUrl = '/api/v1/translations/?' + toQueryString(queryParams);
    const response = await apiClient.get<ApiResponse<Translation>>(requestUrl);
    return response.data;
};

export const postTranslationFeedback = async (translationFeedback: TranslationFeedbackRequest) => {
    const requestUrl = '/api/v1/translationFeedbacks';
    const response = await apiClient
        .post<ApiResponse<TranslationFeedback>>(requestUrl, translationFeedback);
    return response.data;
}