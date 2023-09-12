<template>

    <div class="wishlist">
        <h1 class="wishlistTitle">{{ wishlistPageTitle }} ({{ wishlistItemCount }})</h1>

        <!-- mention visible quand wishlist est vide -->
        <div class="emptyWishlist" v-if="wishlistItemCount === 0">
            <p>{{ emptyWishlist.mention }}</p>
            <img :src="emptyWishlist.image.source" :alt="emptyWishlist.image.alt">
            <router-link to="/categories" class="keepBrowsing-button">
                <p>{{ emptyWishlist.buttonMention }}</p>
                <Icon 
                    icon="system-uicons:arrow-up"
                    :rotate="1" 
                    class="arrow"
                />
            </router-link>
        </div>

        <!-- liste articles ajoutés à la wishlist -->
        <ul class="wishlist-items">
            <li v-for="(item, index) in wishlistItems " :key="item.id">
                <h1>0{{ index + 1 }}</h1>
                <div class="wishlistItem-card">
                    <div class="wishlistItem-card_image-container">
                        <img 
                            :src="item.image.source" 
                            :alt="item.image.alt"
                            class="product-image"
                            @click="navigateToProduct(item)"
                        >
                    </div>
                    <div class="wishlistItem-card_infos-container">
                        <div class="product-nameAndPrice_container">
                            <div class="product-brand-and-model_container">
                                <p class="product-brand">{{ item.brand }}</p>
                                <p class="product-model">{{ item.model }}</p>
                            </div>
                            <p class="product-price">{{ item.price }} {{ currency }}</p>
                        </div>
                        <div class="wishlistItem-card_line-container">
                            <p class="inStock" v-if="item.available">{{ availableMention }}</p>
                            <p class="onDemand" v-else>{{ notAvailableMention }}</p>
                            <div class="icons-container">
                                <Icon 
                                    icon="ph:eye-light" 
                                    width="20" 
                                    class="watchIcon icon" 
                                    @click="navigateToProduct(item)"
                                />
                                <Icon 
                                    icon="bi:cart" 
                                    width="20" 
                                    class="cartIcon icon" 
                                    @click="addToCartFromWishlist(item)"
                                />
                                <Icon 
                                    icon="ph:trash-light" 
                                    width="25" 
                                    class="removeIcon icon" 
                                    @click="removeFromWishlist(item)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <div class="wishlist-buttons_container">
            <!-- à lier au composant login quand il sera créé -->
            <div class="loginButton_container" v-if="wishlistItemCount > 0">
                <p>Log in to your account to save your wishlist and access from all your devices. </p>
            </div>

            <!-- contient les boutons permettant de vider la wishlist soit en ajoutant tout au panier soit en supprimant tout de la wishlist -->
            <div class="action-buttons_container" v-if="wishlistItemCount > 0">
                <div class="addAllToCart-button button" @click="addAllFromWishlistToCart">
                    <p>{{ addAllToCartButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up"
                        :rotate="1" 
                        class="arrow"
                    />
                </div>
                <div class="clearWishlist-button button" @click="clearWishlist">
                    <p>{{ clearWishlistButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up"
                        :rotate="1" 
                        class="arrow"
                    />
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script setup>

    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { computed } from 'vue';
    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router'; // utilise useRouter pour la navigation 

    //datas
    const wishlistPageTitle = "Your wishlist";
    const emptyWishlist = {
            mention: 'Your wishlist is empty',
            buttonMention: 'Keep browsing',
            image: {
                source: '/src/assets/decoration/monkey-astonished.jpg',
                alt: 'image of an empty wishlist'
            }
        };
    const addAllToCartButtonMention = "Add all to cart";
    const clearWishlistButtonMention = "Clear wishlist";
    const { currency } = useGlobalDataStore(); // récupère la devise utilisée par la boutique à partir du store
    const { availableMention } = useGlobalDataStore(); // récupère le mention produit disponible à partir du store
    const { notAvailableMention } = useGlobalDataStore(); // récupère le mention produit non-disponible à partir du store


    //obtention de l'instance du store CatalogueStore
    const catalogueStore = useCatalogueStore(); 

    // ajoute les articles dans la wishlist
    const wishlistItems = computed(() => {
        return catalogueStore.wishlistItems;
    });

    // permet de vérifier le nombre d'article dans la wishlist
    const wishlistItemCount = computed(() => {
        return useCatalogueStore().wishlistItems.length;
    });

     // retire les articles du panier 
     const removeFromWishlist = (item) => {
        catalogueStore.removeFromWishlist(item);
    };

    // ajoute article au panier et le retire de la wishlist
    const addToCartFromWishlist = (item) => {
        catalogueStore.addToCart(item);
        catalogueStore.removeFromWishlist(item)
    };

    // ajoute tous les articles de la wishlist au panier
    const addAllFromWishlistToCart = () => {
        catalogueStore.addAllFromWishlistToCart();
    };

    // supprime tous les articles de la wishlist 
    const clearWishlist = () => {
        catalogueStore.clearWishlist();
    };

    // utilise useRouter pour accéder à l'instance du router
    const router = useRouter(); 

    // naviguer vers la route dynamique du produit
    const navigateToProduct = (item) => {
        router.push({ // methode vue-router permet de naviguer vers nouvelle route
           name: 'ProductDetail', // nom de la route vers laquelle naviguer (definie dans router)
           params: {
            productId: item.id // parametres de la route - transmet l'ID du produit selectionné
           } 
        });
    }

    // récupère les données stockées dans le local storage
    const savedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
    if (savedWishlistItems) {
        catalogueStore.wishlistItems = savedWishlistItems;
    };

</script>

<style lang="scss" scoped> 

    @import '@/assets/sass/variables.scss';

    .wishlist {
      padding: 2rem 1rem 4rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      background: $gradientBackground;
      position: relative;
      min-height: 80vh;

      @media screen and (min-width: $breakpointTablet) {
        padding: 2rem 2rem 4rem 2rem;
      }

      @media screen and (min-width: $breakpointDesktop) {
        padding: 4rem 4rem 8rem 4rem;
        gap: 4rem;
        height: unset;
      }

      h1 {
          margin: 0;
          font-size: 2.5rem;

          @media screen and (min-width: $breakpointTablet) {
            font-size: 3rem;
          }

          @media screen and (min-width: $breakpointDesktop) {
            font-size: clamp(4rem, 6vw, 6rem);
            line-height: 1;
          }
      }
      .emptyWishlist {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        padding: 2rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        @media screen and (min-width: $breakpointDesktop) {
            position: unset;
            top: unset;
            transform: unset;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: unset;
        }

        p {
            font-size: 1.25rem;
            font-weight: 300;
            margin: 0;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 2rem;
                text-align: center;
            }
        }

        img {
            border-radius: 100%;
            width: 50%;

            @media screen and (min-width: $breakpointDesktop) {
                width: 60%;
                justify-self: center;
            }
        }
        .keepBrowsing-button {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            text-decoration: none;
            color: $darkColor;
            p, .arrow {
                font-size: 1.25rem;

                @media screen and (min-width: $breakpointTablet) {
                    font-size: 2rem;
                }
            }
        }

      }
      .wishlist-items {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        list-style-type: none;
        width: 100%;
        padding-left: 0;

        li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;

            @media screen and (min-width: 375px) {
                flex-wrap: nowrap;
            }
            .wishlistItem-card {
                display: flex;
                background: $ultraLightColor;
                border-radius: $containerBorderRadius;
                box-shadow: $shadow;
                height: 7rem;
                width: 100%;

                &_image-container {
                    width: 7rem;
                    height: 7rem;
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    border-radius: $containerBorderRadius 0 0 $containerBorderRadius;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: relative;
                        object-fit: cover;
                    }
                }

                &_infos-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    padding:.5rem 1rem;

                    p {
                        margin: 0;
                    }
                    .product-nameAndPrice_container {
                        display: flex;
                        flex-direction: column;
                        .product-brand-and-model_container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: .3rem;

                            p {
                                font-size: clamp(1rem, 1.2rem, 1.5rem);
                                white-space: nowrap;
                            }

                        }
                        .product-price {
                            font-size: 1.3rem;
                            font-weight: 600;
                        }
                    }
                    .wishlistItem-card_line-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .inStock {
                            color: #45AA43;
                        }
                        .onDemand {
                            color: #CA0B0B;
                        }
                        .icons-container {
                            display: flex;
                            align-items: center;
                            gap: .5rem;
                            .icon {
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
      }

      &-buttons_container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .loginButton_container {
            width: 100%;
            border: 1px solid $darkColor;
            padding: 1rem;
            cursor: pointer;

            p {
                margin: 0;
                text-align: center;
            }
        }
        .action-buttons_container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;

            .button {
                @extend .loginButton_container;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
      }

    }
    
</style>