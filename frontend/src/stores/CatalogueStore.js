import { defineStore } from 'pinia';

export const useCatalogueStore = defineStore('catalogue', {

  state: () => ({
    categories: [],
    products: [],
    cartItems: [], // propriété permettant de stocker les articles dans le panier
    wishlistItems: [], // propriété permettant de stocker les articles dans la wishlist
  }),

  actions: {

    // action pour récupérer les catégories depuis le backend
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/categories'); // URL du server backend + route 
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        const categories = await response.json();
        this.categories = categories; // met à jour les catégories dans le store
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
      
    },


    // action pour récupérer les produits depuis le backend
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products'); // URL du server backend + route 
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }

        const products = await response.json();
        this.products = products; // met à jour les produits dans le store
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    },

    // organise les produits par catégorie
    organizeProductsByCategory() {
      const productsByCategory = {}; // crée un objet vide qui sera utilisé pour organiser les produits en fonction de leurs catégories. ex: 1: [produit1, produit2, ...], etc 

      // parcourt les produit et les range par categorie
      this.products.forEach(product => {
        const categoryId = product.category_id; // récupère l'id de la categorie
        if(!productsByCategory[categoryId]) {
          productsByCategory[categoryId] = []; // crée un tableau vide pour la catégorie si elle n'existe pas encore
        }
        productsByCategory[categoryId].push(product); // ajoute le produit à la catégorie correspondante
      });

      this.productsByCategory = productsByCategory; // met à jour les produits organisés par catégorie
    },


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
    _randomizeProducts() {
      return this.products.slice().sort(() => Math.random() - 0.5);
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

    // récupère les produits organisés par catégorie
    productsByCategoryArray() {
      return Object.values(this.productsByCategory);
    },

    // convertit le prix des articles en number et calcule la somme des articles du panier (au format 2 décimales apres la virgule)
    totalPrice(){
      return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    }
  }

});








