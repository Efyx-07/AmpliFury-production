import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({
        storeName: 'AmpliFury', // declaration du nom de la boutique
        currency: '$', // declaration devise utilisée par la boutique
        availableMention: 'in stock', // declaration produit disponible
        notAvailableMention: 'on demand', // declaration produit non-disponible
        inputMailPlaceholder: 'Your mail address', // declaration placeholder pour input mail
        inputPasswordPlaceholder: 'Password' // declaration placeholder pour input password
    }),
});