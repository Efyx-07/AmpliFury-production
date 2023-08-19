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

    const catalogueStore = useCatalogueStore();
    const allProducts = catalogueStore.products.flatMap(category => category.products);

    const route = useRoute();
    const productId = route.params.productId;

    const selectedProduct = computed(() => {
        return allProducts.find(product => product.id === productId);
    });
</script>

<style lang="scss" scoped></style>