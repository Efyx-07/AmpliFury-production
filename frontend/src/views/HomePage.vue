<template>

  <HomeBanner />
  <div class="sections-wrapper">
    <CategoriesPresentation />
    <EnvironmentCare />
  </div>
  <Commitments />
  
</template>

<script setup>
  
  import CategoriesPresentation from '@/components/CategoriesPresentation.vue';
  import EnvironmentCare from '@/components/EnvironmentCare.vue';
  import Commitments from '@/components/Commitments.vue';
  import HomeBanner from '@/components/HomeBanner.vue';
  
</script>

<style lang="scss" scoped> 

  @import '@/assets/sass/variables.scss';
  .sections-wrapper {
    background: $lightColor;
  }

</style>
