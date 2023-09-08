<template>

    <Icon icon="iconamoon:menu-burger-horizontal" class="burgerMenuIcon" @click="toggleBurgerMenuVisibility"/>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    const toggleBurgerMenuVisibility = () => {
        const showBurgerMenuEvent = new Event('show-burgerMenu');
        window.dispatchEvent(showBurgerMenuEvent)
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