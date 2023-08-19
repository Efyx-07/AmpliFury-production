<template>
    <div class="cartIcon_container" @click="openCart">
        <Icon icon="bi:cart" width="25" class="customerIcon cartIcon"/>
        <div class="cartIcon-badge" v-if="cartItemCount > 0">
            <p class="incrementation">{{ cartItemCount }}</p>
        </div>
    </div>
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';
    import { useShoppingCartStore } from '@/stores/ShoppingCartStore';

    const cartItemCount = computed(() => {
        return useCatalogueStore().cartItems.length;
    });

    const cartStore = useShoppingCartStore();
    const openCart = () => {
        cartStore.openCart();
    };
    
</script>


<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .cartIcon_container {
        position: relative;
        cursor: pointer;

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