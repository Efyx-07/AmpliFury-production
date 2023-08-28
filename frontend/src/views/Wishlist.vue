<template>

    <div class="wishlist">
        <h1 class="wishlistTitle">Your wishlist ( {{ wishlistItemCount }})</h1>

        <!-- mention visible quand wishlist est vide -->
        <div class="emptyWishlist" v-if="wishlistItemCount === 0">
            <p>Your wishlist is empty</p>
        </div>

        <!-- liste articles ajoutés à la wishlist -->
        <ul class="wishlist-items">
            <li v-for="item in wishlistItems " :key="item.id">
                <img :src="item.image.source" :alt="item.image.alt">
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
            </li>
        </ul>

        <!-- contient les boutons permettant de vider la wishlist soit en ajoutant tout au panier soit en supprimant tout de la wishlist -->
        <div class="wishlist-buttons_container" v-if="wishlistItemCount > 0">
            <div class="addAllToCart-button" @click="addAllFromWishlistToCart">
                <p>Add all to cart</p>
            </div>
            <div class="clearWishlist-button" @click="clearWishlist">
                <p>Clear wishlist</p>
            </div>
        </div>


    </div>
    
</template>
<script setup>
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';
    import { Icon } from '@iconify/vue';


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

    li img {
        width: 300px;
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