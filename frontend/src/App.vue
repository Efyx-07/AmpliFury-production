<template>
  
  <Header />
  <RouterView /> <!-- affiche la vue correspondante en fonction de l'URL -->
  <Footer />
  <ShoppingCart />
  <BurgerMenu />
  <UserLogin />
  <UserAccount />


  <!-- Ajout de la view wishlist afin qu'elle soit présente dans le DOM à l'ouverture du site et au rafraichissement de toutes les pages
    (permet de conserver la persistance des données du nombre d'articles dans l'icone wishlist de Header chargées depuis LocalStorage)
    Masqué avec classe condtionnelle en CSS (display: none) -->
  <Wishlist :class="{ 'hidden': hideWishlist }" /> 

</template>


<script setup>

  import { RouterView } from 'vue-router'; // importe le composant RouterView
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import ShoppingCart from '@/components/ShoppingCart.vue';
  import BurgerMenu from '@/components/BurgerMenu.vue';
  import UserLogin from '@/components/UserLogin.vue';
  import UserAccount from '@/components/UserAccount.vue';
  import Wishlist from '@/views/Wishlist.vue';

  import { ref } from 'vue';

  // variable réactive hideWishlist à true pour le masquer initialement
  const hideWishlist = ref(true);

</script>

<style lang="scss" scoped>
  .hidden {
    display: none;
  }

</style>



