<template>
    <router-link to="/" @click="handleNavButtonClick">
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

    // recupération des props définies dans les composants parents
    const props = defineProps({
        parentComponent: String,
        closeBurgerMenu: Function
    });

    // gestion des classes conditionnelles
    const logoClasses = computed(() => ({
        'logo-header': props.parentComponent === 'header',
        'logo-burgermenu': props.parentComponent === 'burgermenu'
    }));

    // récupération via props de la fonction closeBurgerMenu definie dans composant parent BurgerMenu
    const handleNavButtonClick = () => {
        props.closeBurgerMenu();
    };

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