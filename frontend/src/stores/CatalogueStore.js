import { defineStore } from 'pinia';
import catalogueData from '@/catalogue.json';

export const useCatalogueStore = defineStore('catalogue', {

  state: () => ({
    products: catalogueData.categories,
    cartItems: [], // propriété permettant de stocker les articles dans le panier
    wishlistItems: [], // propriété permettant de stocker les articles dans la wishlist
  }),

  actions: {

    // sauvegarde dans le Local Storage après chaque modification du panier
    saveInLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
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
      this.saveInLocalStorage();
    },

    // action privée - génére un ordre aléatoire des produits
    _randomizeProducts(products) {
      return products.slice().sort(() => Math.random() - 0.5);
    },

    // tri par prix croissant
    sortProductsByAscPrice() {
      this.products.forEach(category => {
        category.products.sort((a, b) => a.price - b.price);
      });
    },

    // tri par prix décroissant
    sortProductsByDescPrice() {
      this.products.forEach(category => {
        category.products.sort((a, b) => b.price - a.price);
      });
    },

    // tri par ordre alphabetique A à Z
    sortProductsByAscAlphabet() {
      this.products.forEach(category => {
        category.products.sort((a, b) => a.brand.localeCompare(b.brand));
      });
    },

    // tri par ordre alphabetique Z à A
    sortProductsByDescAlphabet() {
      this.products.forEach(category => {
        category.products.sort((a, b) => b.brand.localeCompare(a.brand));
      });
    },

    // ajoute l'article à la wishlist 
    addToWishlist(product) {
      // verifie si l'article est déjà dans la wishlist (un article ne peut y être ajouté qu'une fois) - comparaison des ID retourne un booléen 
      const isAlreadyInWishlist = this.wishlistItems.some(item => item.id === product.id);
      // verifie si l'article est déjà dans le panier (un article ne peut pas se trouver dans la wishlist si présent dans le panier) - comparaison des ID retourne un booléen 
      const isAlreadyInCart = this.cartItems.some(item => item.id === product.id);
      // si article pas présent dans la wishlist ni dans le panier, envoie dans la wishlist
      if(!isAlreadyInWishlist && !isAlreadyInCart) {
        this.wishlistItems.push(product);
      }
      this.saveInLocalStorage();
    },

    // retire l'article de la wishlist
    removeFromWishlist(product) {
      const index = this.wishlistItems.findIndex( item => item.id === product.id);
      if (index !== -1) {
        this.wishlistItems.splice(index, 1);
      };
      this.saveInLocalStorage();
    },

    // ajoute tous les articles de la wishlist dans le panier
    addAllFromWishlistToCart() {
      this.wishlistItems.forEach(item => {
        const cartItemToAdd = { ...item, quantity: 1, initialPrice: item.price };
        this.cartItems.push(cartItemToAdd);
      });
  
      this.wishlistItems = []; // Vide la wishlist après avoir ajouté les articles au panier
      this.saveInLocalStorage();
  },

    // retire tous les articles de la wishlist
    clearWishlist() {
      this.wishlistItems = [];
      this.saveInLocalStorage();
    },

    // rebascule article du panier vers la wishlist
    toggleFromCartToWishlist(product) {
      //vérifie si l'article est déja dans la wishlist
      const isAlreadyInWishlist = this.wishlistItems.some(item => item.id === product.id);
      if(!isAlreadyInWishlist) {
        //supprimer article du panier
        const index = this.cartItems.findIndex(item => item.id === product.id);
        if(index !== -1) {
          const removedItem = this.cartItems.splice(index, 1)[0]; // retire l'article du panier
          // réinitialise la quantité et le prix
          removedItem.quantity = 1;
          removedItem.price = product.initialPrice;
          this.addToWishlist(removedItem); // ajoute article à la wishlist
          this.saveInLocalStorage();
        };
      };
    },

  },

  getters: {

    // convertit le prix des articles en number et calcule la somme des articles du panier (au format 2 décimales apres la virgule)
    totalPrice(){
      return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    }
  }

});








