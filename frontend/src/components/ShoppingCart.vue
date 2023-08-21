<template>
    <div class="shoppingCart_container" v-if="isCartOpen">
        <div class="shoppingCart">
            <div class="shoppingCart-header">
                <h1>{{ shoppingCartTitle }} ({{ cartItemCount }})</h1> 
                <Icon icon="carbon:close" width="40" class="closeIcon" @click="closeCart"/>
            </div>
            <p v-if ="cartItemCount === 0">{{ emptyCartMention }}</p>
            <ul class="cart-items">
                <li v-for="item in cartItems" :key="item.id" class="cart-item">
                    <div class="cart-item_image-container">
                        <img :src="item.image.source" alt="item.image.alt" class="cart-item_image">
                    </div>
                    <div class="cart-item_infos-container">
                        <p class="item-name">{{ item.brand }} {{ item.model }}</p>
                        <p class="item-price">{{ item.price }} {{ currency }}</p>
                    </div>
                    <Icon icon="ph:trash-light" width="25" class="removeIcon" @click="removeFromCart(item)"/>
                </li>
                <div v-if ="cartItemCount > 0" class="clearCart-button" @click="clearCart"> 
                    <p>Clear cart</p> 
                    <Icon icon="prime:replay" width="20"/>
                </div>
            </ul>
            <div class="shoppingCart-footer">
                <div class="shoppingCart-footer_content">
                    <div class="totalPrice_container">
                        <p class="totalPrice-mention">Subtotal</p>
                        <p class="totalPrice"> {{ totalPrice }} {{ currency }}</p>
                    </div>
                    <div class="checkout-button">
                        <p>Go to checkout</p>
                        <Icon icon="system-uicons:arrow-up" width="30" :rotate="1" />
                    </div>
                </div>
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
    const currency = '$';

    // permet l'incrémentation du nombre d'article dans le panier
    const cartItemCount = computed(() => {
        return useCatalogueStore().cartItems.length;
    });

    // ajoute les articles dans le panier
    const cartItems = computed(() => {
        return useCatalogueStore().cartItems;
    });

    // retire les articles du panier 
    const removeFromCart = (item) => {
        const store = useCatalogueStore();
        store.removeFromCart(item);
    };

    // retire tous les articles du panier 
    const clearCart = () => {
        const store = useCatalogueStore();
        store.clearCart();
    };

    // convertit le prix des articles en number et calcule la somme des articles du panier (au format 2 décimales apres la virgule )
    const totalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
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
        background: $lightColor;
        box-shadow: -3px 0px 5px #33333341; 
        
        .shoppingCart {
            position: relative;
            width: 31rem;
            height: 100vh;
            overflow-y: scroll;
            scrollbar-width: none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
                display: none;
            }

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top:0;
                z-index: 1;
                background: $lightColor;
                .closeIcon {
                    cursor: pointer;
                    transition: transform .2s ease-in-out;

                    &:hover {
                        transform: rotate(90deg);
                    }
                }

                h1 {
                    font-size: 2rem;
                    font-weight: 600;
                    margin: 0;
                    line-height: 1;
                    padding: 2rem;
                }
            }
            .cart-items {
                list-style-type: none;
                padding: 0 2rem 12rem 2rem;
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 2rem;
                .cart-item {
                    background: $ultraLightColor;
                    position: relative;
                    display: flex;
                    width: 100%;
                    height: 13rem;
                    border-radius: $containerBorderRadius;
                    box-shadow: $shadow;

                    &_image-container {
                        width: 10rem;
                        height: 100%;
                        position: relative;
                        display: inline-block;
                        overflow: hidden;
                        border-radius: 15px 0 0 15px;
                    }

                    &_image {
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: relative;
                        object-fit: cover;
                        border-radius: inherit;
                    }

                    .cart-item_infos-container {
                        padding: 2rem 1rem;
                        .item-name, .item-price {
                            margin: 0;
                        }
                        .item-name {
                            font-size: 1.4rem;
                            font-weight: 600;
                        }
                        .item-price {
                            font-size: 1.1rem;
                        }
                    }
                    .removeIcon {
                        position: absolute;
                        bottom: 1rem;
                        right: 1rem;
                        cursor: pointer;
                    }
                }
                .clearCart-button {
                    display: flex;
                    align-items: center;
                    gap: .3rem;
                    cursor: pointer;
                    justify-content: flex-end;
                }
            }
            .shoppingCart-footer {
                height: 10rem;
                width: 31rem;
                background: $darkColor;
                color: $lightColor;
                position: fixed;
                bottom: 0;
                display: flex;
                align-items: center;
                padding: 0 2rem;

                &_content {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: self-end;
                }
                .totalPrice_container {
                    display: flex;
                    flex-direction: column;
                    line-height: 1;

                    p {
                        margin: 0;
                        font-size: 2rem;
                    }
                    .totalPrice-mention {
                        font-weight: 300;
                    }
                    .totalPrice {
                        font-weight: 600;
                    }
                }
                .checkout-button {
                    display: flex;
                    align-items: center;

                    p {
                        margin: 0;
                        font-size: 1.25rem;
                        font-weight: 200;
                    }
                }
            }

        }
    }
</style>