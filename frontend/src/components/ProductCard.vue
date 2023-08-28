<template>
    
    <div class="product-card">

        <div class="product-image_container">
            <!-- image click actif/inactif selon la vue -->
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image" 
                @click="navigateToProduct"
                v-if = "showImageClickable"
                :class="{ 'clickable': showImageClickable }"
            >
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image" 
                v-else
            >
        </div>

        <div class="product-infos_container">
            <div class="product-brand-and-model_container">
                <p class="product-brand">{{ product.brand }}</p>
                <p class="product-model">{{ product.model }}</p>
            </div>
            <p class="product-description" v-if="showDescription">{{ product.description }}</p>
            <p class="product-price">{{ product.price }} {{ currency }}</p>
            <div class="product-card-line_container">
                <p class="inStock" v-if="product.available">{{ availableMention }}</p>
                <p class="onDemand" v-else>{{ notAvailableMention }}</p>
                <div class="action-icons_container">
                    <Icon 
                        icon="ph:eye-light" 
                        width="20" 
                        class="customerIcon" 
                        v-if="showEyeIcon" 
                        @click="navigateToProduct"
                    />

                    <Icon 
                        icon="cil:heart" 
                        width="20" 
                        class="customerIcon"
                        @click="addToWishlist"
                    />
            
                    <Icon 
                        icon="bi:cart" 
                        width="20" 
                        class="customerIcon" 
                        @click="addToCart"
                    />
                </div>
            </div>
        </div>
        <!-- mention ajoutée à la carte produit quand produit ajouté au panier ou à la wishlist-->
        <div v-if="addedToCart" class="addedToCart-mention">
            <Icon 
                icon="icons8:checked" 
                width="15" 
                class="validateIcon"
            />
            <p>{{ addedToCartMention }}</p>
        </div>

        <div v-if="addedToWishlist" class="addedToWishlist-mention">
            <Icon 
                icon="cil:heart" 
                width="15" 
                class="validateIcon2"
            />
            <p>{{ addedToWishlistMention }}</p>
        </div>

    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue'; // importe les icones Iconify
    import { useRouter } from 'vue-router'; // utilise useRouter pour la navigation 
    import { useRoute } from 'vue-router'; // importe la fonction useRoute pour accéder aux informations de la route
    import { useCatalogueStore } from '@/stores/CatalogueStore'; // importe les datas du catalogue géré par le store Pinia
    import { computed } from 'vue';

    // datas
    const currency = '$'; 
    const availableMention = 'in stock'; 
    const notAvailableMention = 'on demand';
    const addedToCartMention = 'Added to cart';
    const addedToWishlistMention = 'Added to wishlist';

    // déefinition des propriétés
    const props = defineProps({
        product: Object, // représente les détails du produit
        showEyeIcon: Boolean, // contrôle l'affichage de l'icone 
        showDescription: Boolean, // contrôle l'affichage de la description
    });

    // utilise useRouter pour accéder à l'instance du router
    const router = useRouter(); 

    // naviguer vers la route dynamique du produit
    const navigateToProduct = () => {
        router.push({ // methode vue-router permet de naviguer vers nouvelle route
           name: 'ProductDetail', // nom de la route vers laquelle naviguer (definie dans router)
           params: {
            productId: props.product.id // parametres de la route - transmet l'ID du produit selectionné
           } 
        });
    }

    // utilise useRoute pour accéder à l'instance du router
    const route = useRoute();

    // contrôle la visibilité de l'image clickable
    const showImageClickable = route.name === 'Categories' || route.name === 'Category'; 

    // obtention instance store CatalogueStore
    const store = useCatalogueStore(); 

    // ajout de l'article dans le panier
    const addToCart = () => {
        const itemToAdd = { ...props.product, quantity: 1, initialPrice: props.product.price }; // initialPrice est défini ici pour maj dans le panier selon la quantité
        // empeche l'affichage de l'article plus d'une fois dans le panier 
        const existingItem = store.cartItems.find(item => item.id === itemToAdd.id); // compare si l'id de l'article à ajouter existe déjà dans le panier

        if (existingItem) {
            existingItem.quantity++; // incrémente la quantité de l'article dans le panier
            store.updateItemPrice(existingItem); // utilise la méthode du store updateItemPrice
        } else {
            store.addToCart(itemToAdd); // ajoute l'article au panier avec une quantité de 1
        };

        if (addedToWishlist.value) { // retire l'article de la wishlist quand ajouté au panier
            store.removeFromWishlist(props.product);
        };
    };

    // vérifie si l'article est dans le panier et retourne un booléen 
    const addedToCart = computed(() =>{
        return store.cartItems.some(item => item.id === props.product.id);
    });

    // ajout de l'article dans la wishlist
    const addToWishlist = () => {
        store.addToWishlist(props.product);
    }

    // vérifie si l'article est dans la wishlist et retourne un booléen 
    const addedToWishlist = computed(() =>{
        return store.wishlistItems.some(item => item.id === props.product.id);
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .product-card {
        width: 296px;
        height: 384px;
        background: $ultraLightColor;
        border-radius: $containerBorderRadius;
        box-shadow: $shadow;
        position: relative;
        .product-image_container {
            width: 100%;
            height: 288px;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerBorderRadius $containerBorderRadius 0 0;
        }
        .product-image {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            object-fit: cover;
            border-radius: inherit;

            &.clickable {
                cursor: pointer;
                transition: transform .3s ease-in-out;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
        .product-infos_container {
            padding: 0 1rem;
            .product-brand-and-model_container {
                display: flex;
                gap: .2rem;
            }
            .product-brand, .product-model {
                font-size: 1.25rem;
                margin: 0;
            }
            .product-price {
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
        }
        .product-card-line_container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: .25rem;
            .inStock {
                margin: 0;
                color: #45AA43;
            }
            .onDemand {
                margin: 0;
                color: #CA0B0B;
            }
            .action-icons_container {
                display: flex;
                gap: 10px;
                .customerIcon {
                    cursor: pointer;
                }
            }
        }
        .addedToCart-mention, .addedToWishlist-mention {
            display: flex;
            align-items: center;
            gap: .3rem;
            background: rgba($darkColor, .5);
            color: $lightColor;
            border-radius: 5px;
            position: absolute;
            top: .5rem;
            left: .5rem;
            padding: .3rem;

            p {
                font-size: .8rem;
                margin: 0;
                font-weight: 400;
            }
            .validateIcon {
                color: #45AA43;
            }
            .validateIcon2 {
                color: #CA0B0B;
            }
        }
    }

</style>