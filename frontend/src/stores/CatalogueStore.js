import { defineStore } from 'pinia';
import catalogueData from '@/catalogue.json';

export const useCatalogueStore = defineStore('catalogue', {
  state: () => ({
    products: catalogueData.categories,
  }),
});








