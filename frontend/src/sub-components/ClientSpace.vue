<template>
    <div class="customersIcons-container">
        <Icon icon="ph:user" class="customerIcon"/>
        <WishlistIcon />
        <CartIcon />
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import CartIcon from '@/sub-components/CartIcon.vue';
    import WishlistIcon from '@/sub-components/WishlistIcon.vue'
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    .customersIcons-container {
        display: flex;
        align-items: center;
        gap: 4rem;

        @media screen and (min-width: $breakpointDesktop) {
            gap: 2rem;
        }

        & .customerIcon {
            color: $darkColor;
            font-size: $mobileIconSize1;

            @media screen and (min-width: $breakpointTablet) {
                font-size: $tabletIconSize1;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: $desktopIconSize1;
            }
        }
    }
</style>