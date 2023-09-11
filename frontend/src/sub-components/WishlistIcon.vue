<template>

    <router-link to="/wishlist" class="wishlistIcon_container">
        <Icon icon="clarity:heart-line" class="customerIcon wishlistIcon"/>
        <div class="wishlistIcon-badge" v-if="wishlistItemCount > 0">
            <p class="incrementation">{{ wishlistItemCount }}</p>
        </div>
    </router-link>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';

    // permet l'incrémentation du nombre d'article dans la wishlist
    const wishlistItemCount = computed(() => {
        return useCatalogueStore().wishlistItems.length;
    });
    
</script>


<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .wishlistIcon_container {
        position: relative;
        cursor: pointer;
        text-decoration: none;
        color: $darkColor;
        .wishlistIcon {
            font-size: $mobileIconSize1;

            @media screen and (min-width: $breakpointTablet) {
                font-size: $tabletIconSize1;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: $desktopIconSize1;
            }
        }

        .wishlistIcon-badge {
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