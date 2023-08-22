<template>
    <h1>
        Je suis la page product
    </h1>
    <ProductCard 
        class="product-card"
        :product="selectedProduct" 
        :showDescription="true" 
        :showEyeIcon="false"
    />

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

<style lang="scss" scoped></style>