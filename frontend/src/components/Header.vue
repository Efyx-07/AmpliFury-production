<template>
        <header> 
            <!-- Ajout classe conditionnelle 'parentComponent'définie dans les composants -->
            <Logo class="logo" parentComponent="header"/>
            <Navbar class="navbar" parentComponent="header"/>
            <ClientSpace class="clientSpace"/> 
            <BurgerMenuIcon class="burgerMenuIcon"/>                   
        </header>      
</template>

<script setup>

    import Logo from '@/sub-components/Logo.vue';
    import Navbar from '@/sub-components/Navbar.vue';
    import ClientSpace from '@/sub-components/ClientSpace.vue';
    import BurgerMenuIcon from '@/sub-components/BurgerMenuIcon.vue';

</script>

<style scoped lang="scss">

    @import '@/assets/sass/variables.scss';

    header {
        position: sticky;
        top: 0;
        z-index: 99; 
        background: $accentColor;
        backdrop-filter: blur(5px);
        box-shadow: $shadow;
        width: 100%;
        height: 3rem;
        padding: .5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navbar {
            display: none;
        }
    }

    @media screen and (min-width: $breakpointTablet) {

        header {
            height: 5rem;
            padding: .5rem 2rem;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        header {
            height: 6rem;
            padding: 1rem 4rem;
            .navbar {
                display: block;
            }
            .burgerMenuIcon {
                display: none;
            }
        }
    }

</style>