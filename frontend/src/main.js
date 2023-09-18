import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCatalogueStore } from './stores/CatalogueStore';

import App from './App.vue';
import router from './router';

// attend la fin du chargement des données pour initialiser l'app
const initApp = async () => {
    const app = createApp(App);

    // initialisation de Pinia
    app.use(createPinia());
    //création d'un instance du store
    const catalogueStore = useCatalogueStore();

    try {
        // appels fetch sur le store
        await catalogueStore.fetchCatalogueData();
    } catch (error) {
        console.log('Erreur lors du chragement des categories: ', error);
    };

    app.use(router);
    app.mount('#app');
};

initApp();

