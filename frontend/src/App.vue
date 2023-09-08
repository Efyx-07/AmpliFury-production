<template>
  
  <Header />
  <RouterView /> <!-- affiche la vue correspondante en fonction de l'URL -->
  <Footer />
  <ShoppingCart />
  <BurgerMenu />
  
</template>


<script setup>

import { RouterView } from 'vue-router'; // importe le composant RouterView
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import BurgerMenu from '@/components/BurgerMenu.vue';

</script>



