<template>

    <div class="burgerMenu" :class="{ hidden2: !isBurgerMenuVisible }">
        <Logo :closeBurgerMenu="closeBurgerMenuAndOverlay" parentComponent="burgermenu" class="logo-burgermenu"/>
        <Icon 
            icon="carbon:close" 
            width="40" 
            class="closeIcon"
            @click="closeBurgerMenuAndOverlay"
        />
        <Navbar :closeBurgerMenu="closeBurgerMenuAndOverlay" parentComponent="burgermenu"/>
    </div>

    <Overlay 
        :showOverlay="isBurgerMenuVisible" 
        class="pageOverlay" 
        v-show="isBurgerMenuVisible" 
    >
    </Overlay>
    
</template>

<script setup>

    import Logo from '@/sub-components/Logo.vue';
    import Navbar from '@/sub-components/Navbar.vue';
    import { Icon } from '@iconify/vue';
    import { ref, onMounted } from 'vue';
    import Overlay from '@/components/Overlay.vue';

    // statut par défaut de la visibilité de burgerMenu 
    const isBurgerMenuVisible = ref(false);

    // permet la fermeture de burgerMenu au click sur l'icone 
    const closeBurgerMenu = () => {
        isBurgerMenuVisible.value = false;
    };

    const closeBurgerMenuAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay2'));
        closeBurgerMenu();
    }

    // écoute evenment personnalisé (crée sur BurgerMenuIcon) pour réafficher le burgerMenu
    onMounted(() => {
        window.addEventListener('show-burgerMenu', () => {
            isBurgerMenuVisible.value = true;
        });
    });

</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';

    .hidden2 { // nommage en hidden2 pour eviter conflit avec hidden utilisé sur ShoppingCart
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
        transition: transform .2s ease-in-out; 

        @media screen and (min-width: $breakpointTablet) {
            width: 33.33%;
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