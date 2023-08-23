import { defineStore } from 'pinia';
import catalogueData from '@/catalogue.json';

export const useCatalogueStore = defineStore('catalogue', {

  state: () => ({
    products: catalogueData.categories,
    cartItems: [], // propriété permettant de stocker les articles dans le panier
  }),

  actions: {

    // sauvegarde dans le Local Storage après chaque modification du panier
    saveInLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    // ajoute l'article au panier
    addToCart(product) {

      // empeche l'affichage de l'article plus d'une fois dans le panier 
      const existingItem = this.cartItems.find(item => item.id === product.id); // compare si l'id de l'article à ajouter existe déjà dans le panier

      if (existingItem) {
        existingItem.quantity++; // si article déjà présent dans panier, alors augmente la quantité
        this.updateItemPrice(product); // met à jour le prix
      } else {
        const itemToAdd = { ...product, quantity: 1, initialPrice: product.price }; // initialPrice est défini ici pour maj dans le panier selon la quantité
        this.cartItems.push(itemToAdd); 
      };
      this.saveInLocalStorage(); 
    },

    // retire l'article du panier
    removeFromCart(product) {
      const index = this.cartItems.findIndex( item => item.id === product.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      };
      this.saveInLocalStorage();
    },

    // retire tous les articles du panier
    clearCart() {
      this.cartItems = [];
      this.saveInLocalStorage();
    },

    // met à jour le prix des articles dans le panier selon la quantité compteur
    updateItemPrice(item) {
      if(item.quantity > 0 ) {
        item.price = (parseFloat(item.initialPrice) * item.quantity).toFixed(2);
      } else {
        item.price = item.initialPrice;
      }
    },

  },

  getters: {

    // convertit le prix des articles en number et calcule la somme des articles du panier (au format 2 décimales apres la virgule)
    totalPrice(){
      return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    }
  }

});








