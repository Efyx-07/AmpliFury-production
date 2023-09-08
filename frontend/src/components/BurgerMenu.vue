<template>

    <div class="burgerMenu" :class="{ hidden: !isBurgerMenuVisible }">
        <Logo parentComponent="burgermenu" class="logo-burgermenu"/>
        <Icon 
            icon="carbon:close" 
            width="40" 
            class="closeIcon"
            @click="closeBurgerMenu"
        />
        <Navbar parentComponent="burgermenu"/>
    </div>
    
</template>

<script setup>

    import Logo from '@/sub-components/Logo.vue';
    import Navbar from '@/sub-components/Navbar.vue';
    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';

    // statut par défaut de la visibilité de burgerMenu 
    const isBurgerMenuVisible = ref(false);

    // permet la fermeture de burgerMenu au click sur l'icone 
    const closeBurgerMenu = () => {
        isBurgerMenuVisible.value = false;
    };

    onMounted(() => {
        window.addEventListener('show-burgerMenu', () => {
            isBurgerMenuVisible.value = true;
        });
    });

</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';

    .hidden {
        transform: translateX(100%);
    }
    .burgerMenu {
        background: $accentColor;
        box-shadow: -3px 0px 5px #33333341; 
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform .3s ease-in-out; 

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