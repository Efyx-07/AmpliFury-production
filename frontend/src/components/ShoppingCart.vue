<template>

    <div class="shoppingCart_container" :class="{ hidden: !isCartVisible }">

        <div class="shoppingCart">

            <div class="shoppingCart-header">
                <h1>{{ shoppingCartTitle }} ({{ cartItemCount }})</h1> 
                <Icon 
                    icon="carbon:close" 
                    width="40" 
                    class="closeIcon" 
                    @click="closeCartAndOverlay"
                />
            </div>

            <!-- mention visible quand panier est vide, contient bouton retour navigation -->
            <div v-if ="cartItemCount === 0" class="emptyCart"> 
                <p>{{ emptyCart.mention }}</p>
                <img :src="emptyCart.image.source" :alt="emptyCart.image.alt">
                <div class="keepBrowsing-button" @click="closeCart">
                    <p>{{ emptyCart.buttonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up" 
                        width="20" 
                        :rotate="1" 
                    />
                </div>
            </div>

            <!-- liste articles ajoutés au panier -->
            <ul class="cart-items">
                <li v-for="item in cartItems" :key="item.id" class="cart-item">

                    <div class="cart-item_image-container">
                        <img :src="item.image.source" :alt="item.image.alt" class="cart-item_image">
                    </div>
                    <div class="cart-item_infos-counter_container">
                        <div class="cart-item_infos-container">
                            <p class="item-name">{{ item.brand }} {{ item.model }}</p>
                            <p class="item-price">{{ item.price }} {{ currency }}</p>
                        </div>
                        <p class="" v-if="item.available">{{ availableMention }}</p>
                        <p class="" v-else>{{ notAvailableMention }}</p>

                        <!-- compteur quantité article -->
                        <div class="quantity-counter_container">
                            <div class="decrementor_container" @click="decreaseQuantity(item)">
                                <p>{{ counter.decreaseIcon }}</p>
                            </div>
                            <div class="quantity-counter">
                                <p>{{ item.quantity }}</p>
                            </div>
                            <div class="incrementor_container" @click="increaseQuantity(item)">
                                <p>{{ counter.increaseIcon  }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- conteneur des boutons remove de la carte article -->
                    <div class="remove-buttons_container">
                        <Icon 
                            icon="cil:heart" 
                            width="23" 
                            class="removeIcon"
                            @click="toggleFromCartToWishlist(item)"
                        />
                        <Icon 
                            icon="ph:trash-light" 
                            width="25" 
                            class="removeIcon" 
                            @click="removeFromCart(item)"
                        />
                    </div>
                </li>

                <!-- bouton qui vide le panier, visible à partir de 2 articles ajoutés -->
                <div class="clearCart-button_container">
                    <div v-if ="cartItemCount > 1" class="clearCart-button" @click="clearCart"> 
                        <p>{{ clearCartButtonMention }}</p> 
                        <Icon 
                            icon="prime:replay" 
                            width="15"
                        />
                    </div>
                </div>
            </ul>

            <!-- contient sous-total et bouton vers caisse, visible quand au moins 1 produit ajouté -->
            <div v-if ="cartItemCount > 0" class="shoppingCart-footer">
                <div class="shoppingCart-footer_content">
                    <div class="totalPrice_container">
                        <p class="totalPrice-mention">{{ totalPriceMention }}</p>
                        <p class="totalPrice"> {{ totalPrice }} {{ currency }}</p>
                    </div>
                    <router-link to="/checkout" class="checkout-button" @click="closeCartAndOverlay"> <!-- relie le bouton à la route checkout -->       
                        <p>{{ linkToCheckout }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            width="20" 
                            :rotate="1" 
                        />
                    </router-link>
                </div>
            </div>

        </div>
    </div>

    <Overlay 
        :showOverlay="isCartVisible" 
        class="pageOverlay" 
        v-show="isCartVisible" 
        :class="{ hidden: !isCartVisible }"
    >
    </Overlay>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { ref, onMounted, computed } from 'vue';
    import Overlay from '@/components/Overlay.vue';

    // datas
    
    const shoppingCartTitle = 'Your shopping Cart';
    const currency = '$';
    const emptyCart = {
            mention: 'Your cart is empty',
            buttonMention: 'Keep browsing',
            image: {
                source: '/src/assets/decoration/monkey-in-a-cart.jpg',
                alt: 'image of an empty cart'
            }
        };
    const counter = {
            decreaseIcon: '-',
            increaseIcon: '+'
        };
    const availableMention = 'in stock';
    const notAvailableMention = 'in demand'; 
    const clearCartButtonMention = 'Clear cart';
    const totalPriceMention = 'Subtotal';
    const linkToCheckout = 'Go to checkout';
   
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

    // déplace article vers la wishlist
    const toggleFromCartToWishlist = (item) => {
        catalogueStore.toggleFromCartToWishlist(item);
    }

    // statut par défaut de la visibilité de la fenetre
    const isCartVisible = ref(false);
    
    // permet la fermeture de la fenetre au click sur l'icone
    const closeCart = () => {
        isCartVisible.value = false;
    };

    const closeCartAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay'));
        closeCart();
    }
 
    // ecoute l'événement personnalisé (créé sur 'CartIcon') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-cart', () => {
            isCartVisible.value = true;
        });
        window.addEventListener('hide-overlay', () => {
            isCartVisible.value = true; 
        });
    });



    // récupère les données stockées dans le local storage
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
        catalogueStore.cartItems = savedCartItems;
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
        .hidden {
            transform: translateX(100%);
            opacity: 0;
        }
        .shoppingCart_container {
            position: fixed;
            width: 100%;
            z-index: 999;
            top: 0;
            right: 0;
            display: flex;
            justify-content: end;
            box-shadow: -3px 0px 5px #33333341; 
            transition: all .2s ease-in-out;  
            .shoppingCart {
                position: relative;
                width: 100vw;
                height: 100vh;
                background: $lightColor;
                overflow-y: scroll;
                scrollbar-width: none;
                -ms-overflow-style: none;

                @media screen and (min-width: $breakpointTablet) {
                    width: 31rem;
                }

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

                    h1 {
                        font-size: 2rem;
                        font-weight: 600;
                        margin: 0;
                        line-height: 1;
                        padding: 2rem;
                    }
                    .closeIcon {
                        cursor: pointer;
                        transition: transform .2s ease-in-out;

                        &:hover {
                            transform: rotate(90deg);
                        }
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
                        .remove-buttons_container {
                                position: absolute;
                                bottom: 1rem;
                                right: 1rem;
                                display: flex;
                                gap: .5rem;
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
                    text-decoration: none;
                    color: $lightColor;
                    cursor: pointer;

                    p {
                        margin: 0;
                        font-size: 1.25rem;
                        font-weight: 200;
                    }

                }

            }

        }
        .pageOverlay {
            position: fixed;
            z-index: -1;
            right: 0;
        }

    }
    
</style>