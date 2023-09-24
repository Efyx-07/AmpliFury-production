import { defineStore } from 'pinia';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'utilisateur 'non connecté'
        users: [], // initialise users comme un tableau vide
    }),

    actions: {
        setToken(newToken) {
            this.token = newToken;
        },

        clearToken() {
            this.token = null;
        },

        async loadUsersData() {
            try {
                const usersData = await api.fetchUsersData();
                // met à jour la propriété users avec les données de l'API
                this.users = usersData.users;
            } catch (error) {
                console.error('Erreur lors du chargement des données utilisateurs: ', error)
            }
        },
    },
});