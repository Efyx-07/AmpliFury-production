<template>

  <HomeBanner />
  <div class="sections-wrapper">
    <CategoriesPresentation />
    <EnvironmentCare />
  </div>
  <Commitments />

  <!-- Ajout de la view wishlist afin qu'elle soit présente dans le DOM à l'ouverture du site 
    (permet de conserver la persistance des données du nombre d'articles dans l'icone wishlist de Header chargées depuis LocalStorage)
    Masqué en CSS (display: none) -->
  <Wishlist class="wishlist"/> 
  
</template>

<script setup>
  
  import CategoriesPresentation from '@/components/CategoriesPresentation.vue';
  import EnvironmentCare from '@/components/EnvironmentCare.vue';
  import Commitments from '@/components/Commitments.vue';
  import HomeBanner from '@/components/HomeBanner.vue';
  import Wishlist from '@/views/Wishlist.vue'
  
</script>

<style lang="scss" scoped> 

  @import '@/assets/sass/variables.scss';
  .sections-wrapper {
    background: $lightColor;
  }
  .wishlist {
    display: none;
  }

</style>
