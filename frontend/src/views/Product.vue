<template>

    <div class="productPage">

        <!-- importe composant ProductCard avec image non clickable-->
    <ProductCard 
        class="product-card"
        :product="selectedProduct" 
        :showDescription="true" 
        :showEyeIcon="false"
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
        return allProducts.find(product => product.id === productId);
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .productPage {
        padding: 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $gradientBackground;
        height: calc(100vh - 4rem);


        @media screen and (min-width: $breakpointTablet) {
            padding: 0 2rem;
            height: calc(100vh - 6rem);
        }

        @media screen and (min-width: $breakpointDesktop) {
            padding: 0 4rem;
            height: calc(100vh - 8rem);
        }
    }
</style>