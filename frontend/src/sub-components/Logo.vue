<template>
    <router-link to="/">
        <img :src="storeLogo.image.source" alt="storeLogo.image.alt" class="storeLogo">
    </router-link>
    
</template>

<script setup>
    const storeLogo = {
        image: {
            source: '/src/assets/logo/AmpliFury.png',
            alt: 'AmpliFury logo'
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    
    .storeLogo {
        width: 2.5rem;

        @media screen and (min-width: $breakpointTablet) {
            width: 4.5rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            width: 6rem;
        }
    }
</style>