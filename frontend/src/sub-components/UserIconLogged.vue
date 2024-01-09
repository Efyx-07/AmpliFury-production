<template>
    <div class="userIcon_container" @click="toggleUserAccountVisibility">
        <Icon icon="icon-park-outline:right-user" class="userIcon"/>
        <div class="userIcon-badge"></div>
    </div>
</template>

<script setup>

import { Icon } from '@iconify/vue';

// ouvre la fenetre 'UserAccount' au clic de l'icone
const toggleUserAccountVisibility = () => {
    // crée un nouvel evenement personnalisé 
    const showUserAccountEvent = new Event('show-userAccount');
    // déclenche l'événement 'show-cart' sur l'objet window
    window.dispatchEvent(showUserAccountEvent);
    const showOverlayEvent = new Event('show-overlay');
    // déclenche l'événement 'show-overlay' sur l'objet window
    window.dispatchEvent(showOverlayEvent);
}

</script>

<style lang="scss" scoped>

@import '@/assets/sass/variables.scss';
.userIcon_container {
    position: relative;
    cursor: pointer;
    .userIcon {
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