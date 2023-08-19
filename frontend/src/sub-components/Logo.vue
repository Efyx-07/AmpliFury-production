<template>
    <router-link to="/">
        <div class="storeLogo-container">
        <img :src="storeLogo.image.source" alt="storeLogo.image.alt" class="storeLogo">
    </div>
    </router-link>
    
</template>

<script setup>
    const storeLogo = {
        image: {
            source: 'src/assets/logo/AmpliFury.png',
            alt: 'AmpliFury logo'
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    .storeLogo-container {
        background: $ultraLightColor;
        box-shadow: $shadow;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.875rem;
        min-width: 6.875rem;
        height: 6.875rem;
        min-height: 6.875rem;
        border-radius: 100%;
        cursor: pointer;
    }
    .storeLogo {
    width: 100%;
    height: auto;
    }
</style>