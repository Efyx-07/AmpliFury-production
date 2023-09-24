import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCatalogueStore } from './stores/CatalogueStore';
import { useUserStore } from './stores/UserStore';

import App from './App.vue';
import router from './router';


// attend la fin du chargement des données pour initialiser l'application
const initApp = async () => {
  const app = createApp(App);

  // initialise Pinia
  app.use(createPinia());
  // crée une instance du store
  const catalogueStore = useCatalogueStore();

  try {
    // appel à la méthode pour charger les données depuis l'API
    await catalogueStore.loadCatalogueData();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  };

  // crée une instance du store
  const userStore = useUserStore();

  // recupère le token dans le localStorage, permet à l'utilisateur de rester connecté après rafraichissemnt de la page
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    // si un token est present dans le localStorage, le stocke dans le store Pinia
    userStore.setToken(storedToken);
    userStore.isConnected = true;
  };

  try {
    // appel à la méthode pour charger les données depuis l'API
    await userStore.loadUsersData();
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }

  app.use(router);
  app.mount('#app');
};

initApp();

