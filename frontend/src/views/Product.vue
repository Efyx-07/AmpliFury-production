<template>

    <div class="productPage">

        <!-- importe composant ProductCard avec image non clickable-->
    <ProductCard 
        class="product-card"
        :product="selectedProduct" 
        :showDescription="true" 
        :showEyeIcon="false"
        :showDetails="true"
    />

    </div>

</template>

<script setup>

    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import ProductCard from '@/components/ProductCard.vue';

    // obtention instance store CatlogueStore
    const catalogueStore = useCatalogueStore();

    // itère à travers le tableau products et crée la liste produits présents
    const allProducts = catalogueStore.products.flatMap(category => category.products);

    // utilise useRoute pour accéder à l'instance du router
    const route = useRoute();

    // extrait le parametre productId de la route
    const productId = route.params.productId;
    
    // recherche et retourne le produit correspondant dans la liste en comparant les Id
    const selectedProduct = computed(() => {
        const product = allProducts.find(product => product.id.toString() === productId); // conversion product.id en string pour comparaison de même type
        return product;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .productPage {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: $gradientBackground2;


        @media screen and (min-width: $breakpointTablet) {
            padding: 4rem 2rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            padding: 8rem;
        }
    }
</style>