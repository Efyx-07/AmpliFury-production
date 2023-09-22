import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null, // initialise le token à null par défaut
    }),

    mutations: {
        setToken(newToken) {
            this.token = newToken;
        },

        clearToken() {
            this.token = null;
        },
    },
});