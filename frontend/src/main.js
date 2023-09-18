import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCatalogueStore } from './stores/CatalogueStore';

import App from './App.vue';
import router from './router';

// Attend la fin du chargement des données pour initialiser l'application
const initApp = async () => {
  const app = createApp(App);

  // Initialisation de Pinia
  app.use(createPinia());
  // Création d'une instance du store
  const catalogueStore = useCatalogueStore();

  try {
    // Appel à la méthode pour charger les données depuis l'API
    await catalogueStore.loadCatalogueData();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }

  app.use(router);
  app.mount('#app');
};

initApp();

