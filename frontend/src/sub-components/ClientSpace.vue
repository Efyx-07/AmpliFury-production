<template>
    <div class="customersIcons-container">
        <Icon icon="ph:user" width="25" class="customerIcon"/>
        <Icon icon="cil:heart" width="25" class="customerIcon"/>
        <CartIcon />
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import CartIcon from '@/sub-components/CartIcon.vue';
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