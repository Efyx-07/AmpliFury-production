import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'utilisateur 'non connecté'
    }),

    actions: {
        setToken(newToken) {
            this.token = newToken;
        },

        clearToken() {
            this.token = null;
        },
    },
});