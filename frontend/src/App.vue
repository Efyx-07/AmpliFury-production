<template>

  <Header />
  <ShoppinCart />
  <RouterView /> <!-- affiche la vue correspondante en fonction de l'URL -->
  <Footer />
  
</template>


<script setup>

import { RouterView } from 'vue-router'; // importe le composant RouterView
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ShoppinCart from '@/components/ShoppingCart.vue';

</script>


<style scoped>
</style>
