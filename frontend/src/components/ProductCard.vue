<template>
    
    <div class="product-card" :class="productCardClass">

        <div class="product-image_container" :class="productImageContainerClass">
            <!-- image click actif/inactif selon la vue -->
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image" 
                @click="navigateToProduct"
                v-if = "showImageClickable"
                :class="[productImageClass, { 'clickable': showImageClickable }]"
            >
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image"
                v-else
            >
        </div>

        <div class="product-infos_container" :class="productInfoContainerClass">
            <div class="product-brand-and-model_container" :class="productBrandAndModelContainerClass">
                <p class="product-brand" :class="productBrandClass">{{ product.brand }}</p>
                <p class="product-model" :class="productModelClass">{{ product.model }}</p>
            </div>
            <p class="product-description" v-if="showDescription">"{{ product.description }}"</p>
            <p class="product-price" :class="productPriceClass">{{ product.price }} {{ currency }}</p>
            <div class="product-card-line_container" :class="productCardLineContainerClass">
                <p class="inStock" :class="inStockClass" v-if="product.available">{{ availableMention }}</p>
                <p class="onDemand" :class="onDemandClass" v-else>{{ notAvailableMention }}</p>
                <div class="action-icons_container" :class="actionIconsContainerClass">
                    <Icon 
                        icon="ph:eye-light"
                        class="customerIcon"
                        :class="customerIconClass" 
                        v-if="showEyeIcon" 
                        @click="navigateToProduct"
                    />

                    <Icon 
                        icon="clarity:heart-line" 
                        class="customerIcon"
                        :class="customerIconClass" 
                        v-if="!addedToWishlist"
                        @click="addToWishlist"
                    />

                    <Icon 
                        icon="clarity:heart-solid" 
                        class="customerIcon heart-solid"
                        :class="customerIconClass" 
                        v-else
                        @click="addToWishlist"
                    />
            
                    <Icon 
                        icon="bi:cart"
                        class="customerIcon" 
                        :class="customerIconClass" 
                        @click="addToCart"
                    />
                </div>
            </div>
        </div>

        <!-- mention ajoutée à la carte produit quand produit ajouté au panier ou à la wishlist-->
        <div v-if="addedToCart" class="addedToCart-mention" :class="addedToCartMentionClass">
            <Icon 
                icon="icons8:checked" 
                width="15" 
                class="validateIcon"
                :class="validateIconClass"
            />
            <p class="addedToCart-mention_text" :class="addedToCartMentionTextClass">{{ addedToCartMention }}</p>
        </div>
        <div v-if="addedToWishlist" class="addedToWishlist-mention" :class="addedToWishlistMentionClass">
            <Icon 
                icon="cil:heart" 
                width="15" 
                class="validateIcon2"
                :class="validateIcon2Class"
            />
            <p class="addedToCart-mention_text" :class="addedToCartMentionTextClass">{{ addedToWishlistMention }}</p>
        </div>

    </div>

    <div class="product-details_container" v-if="showDetails">
        <hr>
        <div class="detail-container">
            <p>Item id:</p>
            <p class="detail-info">{{ product.id }}</p>
        </div>
        <hr>
        <div class="detail-container">
            <p>Category:</p>
            <p class="detail-info">{{ product.type }}</p>
        </div>
        <hr>
        <div class="detail-container">
            <p>Added to catalogue since:</p>
            <p class="detail-info">{{ product.referenceDate.month }} {{ product.referenceDate.year }}</p>
        </div>
        <hr>
        <div class="detail-container">
            <p>Color:</p>
            <p class="detail-info">{{ product.color }}</p>
        </div>
        <hr>
        <div class="detail-container">
            <p>Warranty:</p>
            <p class="detail-info">1 year {{ product.brand }} / 3 years {{ storeName }}</p>
        </div>
        <hr>
    </div>
   
</template>

<script setup>

    import { Icon } from '@iconify/vue'; // importe les icones Iconify
    import { useRouter } from 'vue-router'; // utilise useRouter pour la navigation 
    import { useRoute } from 'vue-router'; // importe la fonction useRoute pour accéder aux informations de la route
    import { useCatalogueStore } from '@/stores/CatalogueStore'; // importe les datas du catalogue géré par le store Pinia
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { computed } from 'vue';

    // datas 
    const { availableMention } = useGlobalDataStore(); // récupère le mention produit disponible à partir du store
    const { notAvailableMention } = useGlobalDataStore(); // récupère le mention produit non-disponible à partir du store
    const { storeName } = useGlobalDataStore(); // récupère le nom de la boutique à partir du store
    const { currency } = useGlobalDataStore(); // récupère la devise utilisée par la boutique à partir du store
    const addedToCartMention = 'Added to cart';
    const addedToWishlistMention = 'Added to wishlist';

    // déefinition des propriétés
    const props = defineProps({
        product: Object, // représente les détails du produit
        showEyeIcon: Boolean, // contrôle l'affichage de l'icone 
        showDescription: Boolean, // contrôle l'affichage de la description
        showDetails: Boolean, // contrôle l'affichage des détails
        class: String, // défini une prop pour les classes conditionnelles
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

        isAddingToCart.value = true;
    };

    // vérifie si l'article est dans le panier et retourne un booléen 
    const addedToCart = computed(() =>{
        return store.cartItems.some(item => item.id === props.product.id);
    });

    // ajout de l'article dans la wishlist
    const addToWishlist = () => {
        store.addToWishlist(props.product);
    };

    // vérifie si l'article est dans la wishlist et retourne un booléen 
    const addedToWishlist = computed(() =>{
        return store.wishlistItems.some(item => item.id === props.product.id);
    });

    // création d'une fonction pour générer des classes conditionnelles qui conditionne l'import du style selon la route
    const generateConditionClass = (baseClass, additionalClass) => {
        return computed(() => {
            return route.name === 'Categories' || route.name === 'Category'
                ? `${baseClass} ${additionalClass}`
                : baseClass;
        });
    };

    // attibution des classes conditionnelles 
    const productCardClass = generateConditionClass('product-card', 'productCardCategories');
    const productImageContainerClass = generateConditionClass('product-image_container', 'productImageContainerCategories');
    const productImageClass = generateConditionClass('product-image', 'productImageCategories');
    const productInfoContainerClass = generateConditionClass('product-infos_container', 'productInfoContainerCategories');
    const productBrandAndModelContainerClass = generateConditionClass('product-brand-and-model_container', 'productBrandAndModelContainerCategories');
    const productBrandClass = generateConditionClass('product-brand', 'productBrandCategories');
    const productModelClass = generateConditionClass('product-model', 'productModelCategories');
    const productPriceClass = generateConditionClass('product-price', 'productPriceCategories');
    const productCardLineContainerClass = generateConditionClass('product-card-line_container', 'productCardLineContainerCategories');
    const inStockClass = generateConditionClass('inStock', 'inStockCategories');
    const onDemandClass = generateConditionClass('onDemand', 'onDemandCategories');
    const actionIconsContainerClass = generateConditionClass('action-icons_container', 'actionIconsContainerCategories');
    const customerIconClass = generateConditionClass('customerIcon', 'customerIconCategories');
    const addedToCartMentionClass = generateConditionClass('addedToCart-mention', 'addedToCartMentionCategories');
    const addedToWishlistMentionClass = generateConditionClass('addedToWishlist-mention', 'addedToWishlistMentionCategories');
    const validateIconClass = generateConditionClass('validateIcon', 'validateIconCategories');
    const validateIcon2Class = generateConditionClass('validateIcon2', 'validateIcon2Categories');
    const addedToCartMentionTextClass = generateConditionClass('addedToCart-mention_text', 'addedToCartMentionTextCategories');

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/ProductCard-Product.scss';
    @import '@/assets/sass/ProductCard-Categories.scss';

</style>