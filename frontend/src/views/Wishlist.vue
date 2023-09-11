<template>

    <div class="wishlist">
        <h1 class="wishlistTitle">{{ wishlistPageTitle }}({{ wishlistItemCount }})</h1>

        <!-- mention visible quand wishlist est vide -->
        <div class="emptyWishlist" v-if="wishlistItemCount === 0">
            <p>{{ emptyWishlistMention }}</p>
        </div>

        <!-- liste articles ajoutés à la wishlist -->
        <ul class="wishlist-items">
            <li v-for="(item, index) in wishlistItems " :key="item.id">
                <h1>0{{ index + 1 }}</h1>
                <img 
                    :src="item.image.source" 
                    :alt="item.image.alt"
                    class="product-image"
                    @click="navigateToProduct(item)"
                >
                <div class="product-brand-and-model_container">
                    <p class="product-brand">{{ item.brand }}</p>
                    <p class="product-model">{{ item.model }}</p>
                </div>
                <p class="product-price">{{ item.price }} {{ currency }}</p>

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
            </li>
        </ul>

        <!-- à lier au composant login quand il sera créé -->
        <div class="loginButton_container">
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
    const emptyWishlistMention = "Your wishlist is empty";
    const addAllToCartButtonMention = "Add all to cart";
    const clearWishlistButtonMention = "Clear wishlist";
    const { currency } = useGlobalDataStore(); // récupère la devise utilisée par la boutique à partir du store


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