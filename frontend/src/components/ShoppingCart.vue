<template>
    <div class="shoppingCart_container" v-if="isCartOpen" :style="cartContainerStyle">
        <div class="closeIcon" @click="closeCart">
            <div class="closeIcon-bars_container">
                <div class="closeIcon-bar1"></div>
                <div class="closeIcon-bar2"></div>
            </div>
        </div>
        <h1>{{ shoppingCartTitle }} ({{ cartItemCount }})</h1> 
        <p v-if ="cartItemCount === 0">{{ emptyCartMention }}</p>
        <ul class="cart-items">
            <!-- liste des articles dans le panier -->
        </ul>
        <div class="shoppingCart-footer">
            <div class="totalPrice_container">
                <p>Subtotal</p>
                <p class="totalPrice"> <!-- Prix total des articles --></p>
            </div>
            <div class="checkout-button">
                <p>Go to checkout</p>
                <Icon icon="system-uicons:arrow-up" width="30" :rotate="1" />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { useShoppingCartStore } from '@/stores/ShoppingCartStore';
    import { computed } from 'vue';

    const shoppingCartTitle = 'Your shopping Cart';
    const emptyCartMention = 'Your cart is empty';

    // permet l'incrémentation du nombre d'article dans le panier
    const cartItemCount = computed(() => {
        return useCatalogueStore().cartItems.length;
    });

    // permet la fermeture de la fenetre au click sur l'icone
    const cartStore = useShoppingCartStore();
    const isCartOpen = computed(() => cartStore.isCartOpen);
    const closeCart = () => {
        cartStore.closeCart();
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .shoppingCart_container {
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        width: 31rem;
        height: 100vh;
        background: $lightColor;
        box-shadow: -3px 0px 5px #33333341;  
        .closeIcon {
            position: absolute;
            top: 50px;
            right: 50px;
            cursor: pointer;

            &-bars_container {
                position: relative;
            }

            &-bar1, &-bar2 {
                width: 3px;
                height: 30px;
                background: $darkColor;
                position: absolute;
                top: 0;
            }

            &-bar1 {
                transform: rotate(45deg);
            }

            &-bar2 {
                transform: rotate(-45deg);
            }
        }
    }
</style>