<template>

    <Icon icon="iconamoon:menu-burger-horizontal" class="burgerMenuIcon" @click="toggleBurgerMenuVisibility"/>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // ouvre fenetre 'BurgerMenu' au clic de l'icone
    const toggleBurgerMenuVisibility = () => {
        // crée un nouvel element personnalisé
        const showBurgerMenuEvent = new Event('show-burgerMenu');
        // déclenche l'évènement 'show-burgerMenu' sur l'objet window
        window.dispatchEvent(showBurgerMenuEvent);
        const showOverlayEvent = new Event('show-overlay')
        // déclenche l'événement 'show-overlay' sur l'objet window
        window.dispatchEvent(showOverlayEvent);
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .burgerMenuIcon {
        font-size: $mobileIconSize1;
        cursor: pointer;

        @media screen and (min-width: $breakpointTablet) {
            font-size: $tabletIconSize1;
        }

        @media screen and (min-width: $breakpointDesktop) {
            font-size: $desktopIconSize1;
        }
    }

</style>