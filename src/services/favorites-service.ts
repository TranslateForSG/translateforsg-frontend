import {Translation} from "@/services/api";

const FAVORITE_STORAGE_KEY = 'favoritePhrases';

export const getFavoriteTranslationIds = (): number[] => {
    const localString = localStorage.getItem(FAVORITE_STORAGE_KEY);

    if (localString) {
        const currentItems = JSON.parse(localString);

        if (Array.isArray(currentItems)) {
            return currentItems;
        }
    }

    return [];
};

export const addToFavorites = (translation: Translation) => {
    console.log(translation);
    const currentItems = getFavoriteTranslationIds();

    const targetIndex = currentItems.indexOf(translation.phrase.id);

    if (targetIndex > -1) {
        return;
    }

    currentItems.push(translation.phrase.id);

    const localString = JSON.stringify(currentItems);
    localStorage.setItem(FAVORITE_STORAGE_KEY, localString);
};


export const removeFromFavorites = (translation: Translation) => {
    const currentItems = getFavoriteTranslationIds();
    const targetIndex = currentItems.indexOf(translation.phrase.id);

    if (targetIndex <= -1) {
        return;
    }

    currentItems.splice(targetIndex, 1);
    const localString = JSON.stringify(currentItems);
    localStorage.setItem(FAVORITE_STORAGE_KEY, localString);
};
