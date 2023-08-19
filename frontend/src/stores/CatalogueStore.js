import { defineStore } from 'pinia';
import catalogueData from '@/catalogue.json';

export const useCatalogueStore = defineStore('catalogue', {

  state: () => ({
    products: catalogueData.categories,
    cartItems: [], // propriété permettant de stocker les articles dans le panier
  }),

  actions: {
    addToCart(product) {
      this.cartItems.push(product); // ajoute l'article au panier
    }
  }

});








