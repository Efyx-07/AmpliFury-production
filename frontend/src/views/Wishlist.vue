<template>

    <div class="wishlist">
        <h1 class="wishlistTitle">{{ wishlistPageTitle }}({{ wishlistItemCount }})</h1>

        <!-- mention visible quand wishlist est vide -->
        <div class="emptyWishlist" v-if="wishlistItemCount === 0">
            <p>{{ emptyWishlist.mention }}</p>
            <img :src="emptyWishlist.image.source" :alt="emptyWishlist.image.alt">
            <router-link to="/categories" class="emptyWishlist-button">
                <p>{{ emptyWishlist.buttonMention }}</p>
                <Icon 
                    icon="system-uicons:arrow-up" 
                    width="20" 
                    :rotate="1" 
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
                        <div class="product-brand-and-model_container">
                            <p class="product-brand">{{ item.brand }}</p>
                            <p class="product-model">{{ item.model }}</p>
                        </div>
                        <p class="product-price">{{ item.price }} {{ currency }}</p>
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

        <!-- à lier au composant login quand il sera créé -->
        <div class="loginButton_container" v-if="wishlistItemCount > 0">
            <p>Log in to your account to save your wishlist and access from all your devices. </p>
        </div>

        <!-- contient les boutons permettant de vider la wishlist soit en ajoutant tout au panier soit en supprimant tout de la wishlist -->
        <div class="wishlist-buttons_container" v-if="wishlistItemCount > 0">
            <div class="addAllToCart-button" @click="addAllFromWishlistToCart">
                <p>{{ addAllToCartButtonMention }}</p>
            </div>
            <div class="clearWishlist-button" @click="clearWishlist">
                <p>{{ clearWishlistButtonMention }}</p>
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
        min-height: 50vh;
    }
    .wishlist-items {
        display: flex;
        list-style-type: none;
    }
    .product-image {
        width: 300px;
        cursor: pointer;
    }
    .icon {
        cursor: pointer;
    }

    .wishlist-buttons_container {
        display: flex;
        justify-content: center;
        gap: 5rem;
    }
    .addAllToCart-button, .clearWishlist-button {
        border: solid 1px $darkColor;
        cursor: pointer;
        padding: .5rem 1rem;

        p {
            margin: 0;
        }
    }
</style>