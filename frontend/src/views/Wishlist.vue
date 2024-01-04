<template>

    <div class="wishlist">
        <h1 class="wishlistTitle">{{ wishlistPageTitle }} <span>({{ wishlistItemCount }})</span></h1>

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
                <div class="index-container">
                    <h1>
                        <span v-if="index <= 8">0</span>{{ index + 1 }}
                    </h1>
                </div>
                <div class="wishlistItem-card">
                    <div class="wishlistItem-card_image-container">
                        <img 
                            :src="item.image_source" 
                            :alt="item.image_alt"
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
                                    class="watchIcon icon" 
                                    @click="navigateToProduct(item)"
                                />
                                <Icon 
                                    icon="bi:cart"
                                    class="cartIcon icon" 
                                    @click="addToCartFromWishlist(item)"
                                />
                                <Icon 
                                    icon="ph:trash-light"
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

    // permet le retour vers le haut de page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // retire les articles du panier 
    const removeFromWishlist = (item) => {
        catalogueStore.removeFromWishlist(item);
    };

    // ajoute article au panier et le retire de la wishlist
    const addToCartFromWishlist = (item) => {
        catalogueStore.addToCart(item);
        catalogueStore.removeFromWishlist(item)
    };

    // ajoute tous les articles de la wishlist au panier et renvoie en haut de la page
    const addAllFromWishlistToCart = () => {
        catalogueStore.addAllFromWishlistToCart();
        scrollToTop();
    };

    // supprime tous les articles de la wishlist et renvoie en haut de la page
    const clearWishlist = () => {
        catalogueStore.clearWishlist();
        scrollToTop();
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
    };

    // récupère les données stockées dans le local storage
    const savedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
    if (savedWishlistItems) {
        catalogueStore.wishlistItems = savedWishlistItems;
    };

</script>

<style lang="scss" scoped> 

    @import '@/assets/sass/variables.scss';

    .wishlist {
      padding: 2rem 1rem 3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      background: $gradientBackground2;
      position: relative;
      min-height: 75vh;

      @media screen and (min-width: $breakpointTablet) {
        padding: 2rem 2rem 4rem 2rem;
        min-height: 80vh;
      }

      @media screen and (min-width: $breakpointDesktop) {
        padding: 4rem 4rem 8rem 4rem;
        gap: 4rem;
        height: unset;
      }

      h1 {
          margin: 0;
          font-size: 2.5rem;
          span {
            font-weight: 400;
          }

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
                min-width: 20rem;
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
        gap: 1rem;
        list-style-type: none;
        width: 100%;
        padding-left: 0;

        @media screen and (min-width: $breakpointTablet) {
            gap: 2rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            max-width: 79rem;
        }

        li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;

            @media screen and (min-width: 375px) {
                flex-wrap: nowrap;
            }

            @media screen and (min-width: $breakpointTablet) {
                gap: 2rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                gap: 3rem;
            }
            .index-container {
                display: flex;
                justify-content: center;
                width: 2rem;

                span {
                    font-weight: 700;
                }

                @media screen and (min-width: $breakpointDesktop) {
                    width: 8rem;
                }
            }
            .wishlistItem-card {
                display: flex;
                background: $ultraLightColor;
                border-radius: $containerBorderRadius;
                box-shadow: $shadow;
                height: 7rem;
                width: 100%;

                @media screen and (min-width: $breakpointTablet) {
                    height: 10rem;
                }

                @media screen and (min-width: $breakpointDesktop) {
                    height: 17rem;
                }

                &_image-container {
                    width: 7rem;
                    height: 100%;
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    border-radius: $containerBorderRadius 0 0 $containerBorderRadius;

                    @media screen and (min-width: $breakpointTablet) {
                        width: 15rem;
                    }

                    @media screen and (min-width: $breakpointDesktop) {
                        width: 20rem;
                    }

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

                    @media screen and (min-width: $breakpointTablet) {
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr;
                        grid-template-columns: 1fr;
                        padding: 1rem 2rem;
                    }

                    p {
                        margin: 0;
                    }
                    .product-nameAndPrice_container {
                        display: flex;
                        flex-direction: column;

                        @media screen and (min-width: $breakpointTablet) {
                            align-items: center;
                            grid-row: 2 / -2;
                        }
                        .product-brand-and-model_container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: .3rem;

                            p {
                                font-size: clamp(1rem, 1.2rem, 1.5rem);
                                white-space: nowrap;

                                @media screen and (min-width: $breakpointDesktop) {
                                    font-size: 2rem;
                                }
                            }

                        }
                        .product-price {
                            font-size: 1.3rem;
                            font-weight: 600;

                            @media screen and (min-width: $breakpointDesktop) {
                                font-size: 2.5rem;
                            }
                        }
                    }
                    .wishlistItem-card_line-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        @media screen and (min-width: $breakpointTablet) {
                            grid-row: 3 /-1;
                            align-items: flex-end;
                        }

                        p {
                            @media screen and (min-width: $breakpointDesktop) {
                                font-size: 1.2rem;
                            }
                        }
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
                                font-size: 1.25rem;
                                cursor: pointer;

                                @media screen and (min-width: $breakpointDesktop) {
                                    font-size: 1.7rem;
                                }
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
        align-items: center;
        gap: 1rem;
        width: 100%;

        @media screen and (min-width: $breakpointDesktop) {
            max-width: 69rem;
            gap: 4rem;
        }
        .loginButton_container {
            width: 100%;
            padding: .5rem 1rem;
            cursor: pointer;
            background: rgba($ultraLightColor, .5);
            border-radius: $containerBorderRadius;

            @media screen and (min-width: $breakpointDesktop) {
                max-width: 50rem;
            }

            p {
                margin: 0;
                text-align: center;
                display: flex;
                flex-direction: column;
                gap: .5rem;
                font-size: .8rem;

                @media screen and (min-width: $breakpointDesktop) {
                    flex-direction: row;
                    flex-wrap: wrap;
                    font-size: 1.5rem;
                    font-weight: 300;
                    justify-content: center;
                }

                span {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }

            }
        }
        .action-buttons_container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;

            @media screen and (min-width: $breakpointTablet) {
                flex-wrap: nowrap;
            }

            @media screen and (min-width: $breakpointDesktop) {
                gap: 0rem;
                flex-wrap: unset;
                width: 50%;
                justify-self: center;
            }
            .button {
                @extend .loginButton_container;
                border: 1px solid $darkColor;
                border-radius: unset;
                display: flex;
                align-items: center;
                justify-content: center;
                background: unset;

                @media screen and (min-width: $breakpointDesktop) {
                    border: none;
                }

                p, .arrow {
                    font-size: 1.5rem;

                    @media screen and (min-width: $breakpointDesktop) {
                        font-size: 2rem;
                    }
                }
            }
        }
      }

    }
    
</style>