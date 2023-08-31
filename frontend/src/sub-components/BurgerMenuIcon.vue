<template>

    <Icon icon="iconamoon:menu-burger-horizontal" class="burgerMenuIcon"/>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .burgerMenuIcon {
        font-size: $mobileIconSize1;

        @media screen and (min-width: $breakpointTablet) {
            font-size: $tabletIconSize1;
        }

        @media screen and (min-width: $breakpointDesktop) {
            font-size: $desktopIconSize1;
        }
    }

</style>