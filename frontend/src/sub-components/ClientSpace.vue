<template>
    <div class="customersIcons-container">
        <Icon icon="ph:user" width="25" class="customerIcon"/>
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
        gap: 20px;

        & .customerIcon {
            color: $darkColor;
        }
    }
</style>