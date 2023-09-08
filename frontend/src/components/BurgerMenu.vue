<template>

    <div class="burgerMenu">
        <Logo parentComponent="burgermenu" class="logo-burgermenu"/>
        <Icon 
            icon="carbon:close" 
            width="40" 
            class="closeIcon"
        />
        <Navbar parentComponent="burgermenu"/>
    </div>
    
</template>

<script setup>

    import Logo from '@/sub-components/Logo.vue';
    import Navbar from '@/sub-components/Navbar.vue';
    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';

    .burgerMenu {
        background: $accentColor;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-width: $breakpointTablet) {
            width: 33.33vh;
        }
        
        @media screen and (min-width: $breakpointDesktop) {
            display: none;
        }

        .logo-burgermenu {
            position: absolute;
            top: .5rem;
            left: 2rem;

            @media screen and (min-width: $breakpointTablet) {
                display: none;
            }
        }
        .closeIcon {
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
            transition: transform .2s ease-in-out;

            &:hover {
                transform: rotate(90deg);
            }
        }
    }

</style>