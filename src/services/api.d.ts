export interface ApiResponse<T> {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
}

export interface ApiError {
    detail: string;
}

export interface Phrase {
    id: number;
    content: string;
    summary: string;
}

export interface Translation {
    id: number;
    phrase: Phrase;
    content: string;
    language: string;
    audio_clip?: string;
    special_note: string;
    order? :number;
}

export interface Language {
    name: string;
    native_name: string;
    code: string;
}

export interface Category {
    id: number;
    name: string;
    needs_original_phrase: boolean;
}

export interface TranslationQuery {
    language?: string;
    category?: string;
    search?: string;
    phrases: number[];
}

export interface Contributor {
    name: string;
}


/*
name: this.name,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    whats_wrong: this.whatsWrong,
                    suggestion: this.suggestions,
                    recaptcha: this.recaptcha,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    translation_id: this.translation.id
 */

export interface RecaptchaRequest {
    recaptcha: string;
}

export interface TranslationFeedback {
    name: string;
    whats_wrong: string;
    suggestion: string;
    translation_id: number;
}

export interface TranslationFeedbackRequest extends TranslationFeedback, RecaptchaRequest {

}

export interface Downloadable {
    id: number;
    name: string;
    downloadable_file: string;
    description: string;
    order?: number;
}

export interface DownloadableQuery {
    language?: string;
    category?: string;
    search?: string;
}

export interface Section extends Category {
    categories: Category[];
}