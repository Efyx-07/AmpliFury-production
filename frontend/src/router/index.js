import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Categories from '@/views/Categories.vue'; 
import Product from '@/views/Product.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/categories/:category', // création d'une route dynamique à partir de Categories pour la catégorie filtrée (URL format: http://serveraddress/categories/categoryName)
      name: 'Category', 
      component: Categories 
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/product/:productId', // création d'une route dynamique pour afficher un produit individuellement
      name: 'ProductDetail',
      component: Product
    },

  ]
});

//permet qu'à chaque changement de route la nouvelle page est affichée à partir du haut
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
