<template>
    <h1>Je suis wishlist</h1>
    <!-- liste articles ajoutés à la wishlist -->
    <ul class="wishlist-items">
        <li v-for="item in wishlistItems " :key="item.id">
            <img :src="item.image.source" :alt="item.image.alt">
            <Icon icon="ph:trash-light" width="25" class="removeIcon" @click="removeFromWishlist(item)"/>
        </li>
    </ul>
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

     // retire les articles du panier 
     const removeFromWishlist = (item) => {
        catalogueStore.removeFromWishlist(item);
    };

    // récupère les données stockées dans le local storage
    const savedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
    if (savedWishlistItems) {
        catalogueStore.wishlistItems = savedWishlistItems;
    };
</script>

<style lang="scss" scoped> 
    .wishlist-items {
        display: flex;
        list-style-type: none;
    }

    li img {
        width: 300px;
    }
    .removeIcon {
        cursor: pointer;
    }
</style>