import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserStore = defineStore('users', {
    state: () => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'utilisateur 'non connecté'
        userData: reactive({}), // déclare userData comme réactif
    }),

    actions: {

        // stocke le token obtenu à la connexion du user
        setToken(newToken) { 
            this.token = newToken;
        },

        // supprime le token à la deconnexion du user
        clearToken() {
            this.token = null;
        },

        // sauvegarde les données de l'utilisateur connecté dans le localStorage
        saveUserDataInLocalStorage() {
            localStorage.setItem('userData', JSON.stringify(this.userData));
            console.log('UserData sauvegardées dans le localStorage:', this.userData);
        },

        // charge les données utilisateur à partir de la reponse JSON
        setUserData(userData) {
            this.userData = userData;
            this.saveUserDataInLocalStorage();
            console.log('UserData définies dans le store:', this.userData);
        },

        // charge les données utilisateur à partir du localStorage
        async loadUserDataFromLocalStorage() {
            const localStorageUserData = localStorage.getItem('userData');
            if (localStorageUserData) {
                this.userData = JSON.parse(localStorageUserData);
                console.log('UserData chargées depuis le localStorage:', this.userData);
            };
        },
    },
});