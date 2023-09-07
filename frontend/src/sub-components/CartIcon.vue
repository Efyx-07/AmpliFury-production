<template>
    <div class="cartIcon_container" @click="toggleCartVisibility">
        <Icon icon="bi:cart" class="customerIcon cartIcon"/>
        <div class="cartIcon-badge" v-if="cartItemCount > 0">
            <p class="incrementation">{{ cartItemCount }}</p>
        </div>
    </div>
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';

    // permet l'incrémentation du nombre d'article dans le panier
    const cartItemCount = computed(() => {
        return useCatalogueStore().cartItems.length;
    });

    // ouvre la fentetre 'ShoppingCart' au clic de l'icone
    const toggleCartVisibility = () => {
        // crée un nouvel evenement personnalisé 
        const showCartEvent = new Event('show-cart');
        // déclenche l'événement 'show-cart' sur l'objet window
        window.dispatchEvent(showCartEvent);
        // crée un nouvel evenement personnalisé 
        const showOverlayEvent = new Event('show-overlay')
        // déclenche l'événement 'show-overlay' sur l'objet window
        window.dispatchEvent(showOverlayEvent)
    };
   
</script>


<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .cartIcon_container {
        position: relative;
        cursor: pointer;
        .cartIcon {
            font-size: $mobileIconSize1;

            @media screen and (min-width: $breakpointTablet) {
                font-size: $tabletIconSize1;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: $desktopIconSize1;
            }
        }
        .cartIcon-badge {
            width: .9rem;
            height: .9rem;
            background: $darkColor;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0;
            right: 0;
            .incrementation {
                margin: 0;
                font-size: .8rem;
                color: $ultraLightColor;
                font-weight: bold;
            }
        }
    }
</style>