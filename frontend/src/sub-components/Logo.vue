<template>
    <router-link to="/">
        <img :src="storeLogo.image.source" :alt="storeLogo.image.alt" :class="logoClasses">
    </router-link>
    
</template>

<script setup>

    import { computed } from 'vue';

    // datas
    const storeLogo = {
        image: {
            source: '/src/assets/logo/AmpliFury.png',
            alt: 'AmpliFury logo'
        }
    }

    // recupération des props définies dans les composants parents (permet de styliser différement selon le composant)
    const props = defineProps({
        parentComponent: String
    });

    // gestion des classes conditionnelles
    const logoClasses = computed(() => ({
        'logo-header': props.parentComponent === 'header',
        'logo-burgermenu': props.parentComponent === 'burgermenu'
    }));


</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss'; 
    .logo-header {
        width: 2.5rem;

        @media screen and (min-width: $breakpointTablet) {
            width: 4.5rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            width: 6rem;
        }
    }

    .logo-burgermenu {
        width: 5rem;
    }
</style>