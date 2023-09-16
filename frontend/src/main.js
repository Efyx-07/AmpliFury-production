import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCatalogueStore } from './stores/CatalogueStore';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// initialisation de Pinia
const pinia = createPinia();
app.use(pinia);
//création d'un instance du store
const catalogueStore = useCatalogueStore();
// appels fetch sur le store
catalogueStore.fetchCategories();
catalogueStore.fetchProducts();

app.use(router);

app.mount('#app');
