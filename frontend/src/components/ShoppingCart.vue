<template>

    <div class="shoppingCart_container" v-if="isCartOpen">

        <div class="shoppingCart">

            <div class="shoppingCart-header">
                <h1>{{ shoppingCartTitle }} ({{ cartItemCount }})</h1> 
                <Icon icon="carbon:close" width="40" class="closeIcon" @click="closeCart"/>
            </div>

            <div v-if ="cartItemCount === 0" class="emptyCart">
                <p>{{ emptyCartMention }}</p>
                <img :src="emptyCartImage.source" :alt="emptyCartImage.alt">
                <div class="keepBrowsing-button" @click="closeCart">
                    <p>Keep browsing</p>
                    <Icon icon="system-uicons:arrow-up" width="20" :rotate="1" />
                </div>
            </div>

            <ul class="cart-items">
                <li v-for="item in cartItems" :key="item.id" class="cart-item">
                    <div class="cart-item_image-container">
                        <img :src="item.image.source" alt="item.image.alt" class="cart-item_image">
                    </div>
                    <div class="cart-item_infos-counter_container">
                        <div class="cart-item_infos-container">
                            <p class="item-name">{{ item.brand }} {{ item.model }}</p>
                            <p class="item-price">{{ item.price }} {{ currency }}</p>
                        </div>
                        <p class="" v-if="item.available">{{ availableMention }}</p>
                        <p class="" v-else>{{ notAvailableMention }}</p>
                        <div class="quantity-counter_container">
                            <div class="decrementor_container" @click="decreaseQuantity(item)">
                                <p>{{ decreaseCounterIcon }}</p>
                            </div>
                            <div class="quantity-counter">
                                <p>{{ item.quantity }}</p>
                            </div>
                            <div class="incrementor_container" @click="increaseQuantity(item)">
                                <p>{{ increaseCounterIcon }}</p>
                            </div>
                        </div>
                    </div>
                    <Icon icon="ph:trash-light" width="25" class="removeIcon" @click="removeFromCart(item)"/>
                </li>
                <div class="clearCart-button_container">
                    <div v-if ="cartItemCount > 0" class="clearCart-button" @click="clearCart"> 
                        <p>{{ clearCartMention }}</p> 
                        <Icon icon="prime:replay" width="15"/>
                    </div>
                </div>
            </ul>

            <div v-if ="cartItemCount > 0" class="shoppingCart-footer">
                <div class="shoppingCart-footer_content">
                    <div class="totalPrice_container">
                        <p class="totalPrice-mention">{{ totalPriceMention }}</p>
                        <p class="totalPrice"> {{ totalPrice }} {{ currency }}</p>
                    </div>
                    <div class="checkout-button">
                        <p>{{ linkToCheckoutMention }}</p>
                        <Icon icon="system-uicons:arrow-up" width="20" :rotate="1" />
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

    // datas
    const shoppingCartTitle = 'Your shopping Cart';
    const currency = '$';
    const availableMention = 'in stock'; 
    const notAvailableMention = 'on demand';
    const decreaseCounterIcon = '-';
    const increaseCounterIcon = '+';
    const clearCartMention = 'Clear cart';
    const totalPriceMention = 'Subtotal';
    const linkToCheckoutMention = 'Go to checkout';
    const emptyCartMention = 'Your cart is empty';
    const emptyCartImage = {
        source: '/src/assets/decoration/monkey-in-a-cart.jpg',
        alt: 'image of an empty cart'
    }

    //obtention de l'instance du store CatalogueStore
    const catalogueStore = useCatalogueStore(); 

    // permet l'incrémentation du nombre d'article dans le panier
    const cartItemCount = computed(() => {
        return catalogueStore.cartItems.length;
    });

    // ajoute les articles dans le panier
    const cartItems = computed(() => {
        return catalogueStore.cartItems;
    });

    // retire les articles du panier 
    const removeFromCart = (item) => {
        catalogueStore.removeFromCart(item);
    };

    // retire tous les articles du panier 
    const clearCart = () => {
        catalogueStore.clearCart();
    };

    // convertit le prix des articles en number et calcule la somme des articles du panier (au format 2 décimales apres la virgule)
    const totalPrice = computed(() => {
        return catalogueStore.totalPrice;
    });

    // parametrage du compteur quantité 
    const increaseQuantity = (item) => {
        item.quantity++;
        catalogueStore.updateItemPrice(item); // met à jour le prix de l'article
    };
    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            item.quantity--;
            catalogueStore.updateItemPrice(item); // met à jour le prix de l'article
        };
    };

    // permet la fermeture de la fenetre au click sur l'icone
    const cartStore = useShoppingCartStore();
    const isCartOpen = computed(() => cartStore.isCartOpen);
    const closeCart = () => {
        cartStore.closeCart();
    };

    // récupère les données stockées dans le local storage
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
        catalogueStore.cartItems = savedCartItems;
    }

    console.log(localStorage.getItem('cartItems'));

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
            .emptyCart {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                padding: 2rem;
                position: absolute;
                top: 50%;
                transform: translateY(-60%);

                p {
                    font-size: 1.25rem;
                    font-weight: 300;
                    margin: 0;
                }

                img {
                    border-radius: 100%;
                    width: 50%;
                }
                .keepBrowsing-button {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
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
                    .cart-item_infos-counter_container {   
                        padding: 2rem 1rem;
                        display: flex;
                        flex-direction: column;
                        .cart-item_infos-container {
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
                        .quantity-counter_container {
                            margin-top: auto;
                            display: flex;
                            width: 6rem;
                            box-shadow: $shadow;
                            .decrementor_container,.quantity-counter, .incrementor_container {
                                width: 2rem;
                                height: 2rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            .decrementor_container, .incrementor_container {
                                background: $lightColor;
                                font-size: 1.5rem;
                                cursor: pointer;
                            }
                        }
                    }
                    .removeIcon {
                            position: absolute;
                            bottom: 1rem;
                            right: 1rem;
                            cursor: pointer;
                    }
                }

                .clearCart-button_container {
                    display: flex;
                    justify-content: end;
                    padding-bottom: 1rem;
                    .clearCart-button {
                        width: 6rem;
                        display: flex;
                        align-items: center;
                        gap: .3rem;
                        cursor: pointer;
                        justify-content: center;
                        background: $ultraLightColor;

                        p {
                            margin: 0;
                        }
                    }
                }
            }
            .shoppingCart-footer {
                height: 12rem;
                width: 31rem;
                background: $darkColor;
                color: $lightColor;
                position: fixed;
                bottom: 0;
                display: flex;
                align-items: flex-start;
                padding: 2rem;

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
                        font-size: 1.7rem;
                    }
                    .totalPrice {
                        font-weight: 400;
                    }
                }
                .checkout-button {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

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