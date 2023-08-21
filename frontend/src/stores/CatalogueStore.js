import { defineStore } from 'pinia';
import catalogueData from '@/catalogue.json';

export const useCatalogueStore = defineStore('catalogue', {

  state: () => ({
    products: catalogueData.categories,
    cartItems: [], // propriété permettant de stocker les articles dans le panier
  }),

  actions: {
    // ajoute l'article au panier
    addToCart(product) {
      this.cartItems.push(product); 
    },
    // retire l'article du panier
    removeFromCart(product) {
      const index = this.cartItems.findIndex( item => item.id === product.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      };
    },
    // retire tous les articles du panier
    clearCart() {
      this.cartItems = [];
    },
  }

});








