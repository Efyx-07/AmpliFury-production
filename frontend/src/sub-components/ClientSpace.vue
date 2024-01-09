<template>
    <div class="customersIcons-container">
        <UserIconLogged v-if="userStore.isConnected"/>
        <UserIconLoggedOut v-else/>
        <WishlistIcon />
        <CartIcon />
    </div>
</template>

<script setup>

import CartIcon from '@/sub-components/CartIcon.vue';
import WishlistIcon from '@/sub-components/WishlistIcon.vue'
import UserIconLoggedOut from '@/sub-components/UserIconLoggedOut.vue';
import UserIconLogged from '@/sub-components/UserIconLogged.vue';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
    
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
}

</style>