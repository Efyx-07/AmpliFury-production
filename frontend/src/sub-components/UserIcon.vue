<template>

    <div class="userIcon_container" @click="toggleUserLoginVisibility">
        <Icon icon="ph:user" class="customerIcon userIcon"/>
        <div class="userIcon-badge"></div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // ouvre la fenetre 'UserLogin' au clic de l'icone
    const toggleUserLoginVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showUserLoginEvent = new Event('show-userLogin');
        // déclenche l'événement 'show-cart' sur l'objet window
        window.dispatchEvent(showUserLoginEvent);
        // crée un nouvel evenement personnalisé 
        const showOverlayEvent = new Event('show-overlay')
        // déclenche l'événement 'show-overlay' sur l'objet window
        window.dispatchEvent(showOverlayEvent);
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .userIcon_container {
        position: relative;
        cursor: pointer;
        .userIcon {
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
