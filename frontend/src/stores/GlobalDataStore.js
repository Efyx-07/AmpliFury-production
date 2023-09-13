import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({

        // GLOBAL
        storeName: 'AmpliFury', // declaration du nom de la boutique
        currency: '$', // declaration devise utilisée par la boutique
        availableMention: 'in stock', // declaration produit disponible
        notAvailableMention: 'on demand', // declaration produit non-disponible

        // FORMULAIRES
        inputMailPlaceholder: 'Mail address', // declaration placeholder pour input mail
        inputPasswordPlaceholder: 'Password', // declaration placeholder pour input password
        inputConfirmPasswordPlaceholder: 'Confirm password', // declaration placeholder pour input confirm password
        inputFirstNamePlaceholder: 'First name', // declaration placeholder pour input first name
        inputLastNamePlaceholder: 'Last name', // declaration placeholder pour input last name
        inputAddressPlaceholder: 'Address', // declaration placeholder pour input address
        inputPostalCodePlaceholder: 'Postal code', // declaration placeholder pour input postal code
        inputCityPlaceholder: 'City', // declaration placeholder pour input city
        inputCountryPlaceholder: 'Country', // declaration placeholder pour input country

        // BUTTONS
        loginButtonMention: 'Login', // declaration mention pour se connecter
        registerButtonMention: 'Register' // declaration mention pour s'inscrire
    }),
});