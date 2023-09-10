import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({
        storeName: 'AmpliFury', // declaration du nom de la boutique
        currency: '$' // declaration devise utilisée par la boutique
    }),
});