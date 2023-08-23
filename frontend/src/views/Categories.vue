<template>

      <h1 class="category-title">{{ pageTitle }}</h1> 
      <div class="categories-content_wrapper">
        <div class="product-cards_container">
          <ProductCard 
            class="product-card"
            v-for="product in randomOrderProducts" 
            :key="product.model" 
            :product="product" 
            :showDescription="false" 
            :showEyeIcon="true"
          />
        </div>
      </div>

</template>
  
<script setup>

    import { useRoute } from 'vue-router'; // importe la fonction useRoute pour accéder aux informations de la route
    import { useCatalogueStore } from '@/stores/CatalogueStore'; // importe les datas du catalogue géré par le store Pinia
    import { computed } from 'vue'; // importe la fonction computed pour créer des propriétés calculées
    import ProductCard from '@/components/ProductCard.vue';
  
    const route = useRoute(); // récupère l'objet route de la route actuelle
    const catalogueStore = useCatalogueStore(); // utilise le store Pinia pour les données du catalogue
  
  // crée une propriété calculée pageTitle
  const pageTitle = computed(() => {
    const categoryFilter = route.params.category; // récupère le paramètre "category" de la route
    if (categoryFilter && categoryFilter !== 'all') { // vérifie si le paramètre existe et n'est pas "all"
      return categoryFilter; // retourne le nom de la catégorie comme titre
    } else {
      return 'All products'; // sinon attribue ce titre à la page
    }
  });
  
  const allProducts = catalogueStore.products.flatMap(category => category.products); // crée une liste de tous les produits
  
  // crée une propriété calculée filteredProducts qui filtre en parcourant les catégories et leurs produits
  const filteredProducts = computed(() => {
    const categoryFilter = route.params.category; // récupère le paramètre "category" de la route
    
    if (categoryFilter && categoryFilter !== 'all') {
        const filtered = [];
        catalogueStore.products.forEach(category => {
            const categoryProducts = category.products.filter(product => product.category === categoryFilter);
            filtered.push(...categoryProducts);
        });
        return filtered
    } else {
        return allProducts
    }
  });

  // crée une propriété calculée randomOrderproducts qui permet un présentation aléatoire des produits et reprenant le filtrage de filteredProducts
  const randomOrderProducts = computed(() => {
    const filteredProds = filteredProducts.value;
    return catalogueStore._randomizeProducts(filteredProds);
  });

</script>

  <style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .category-title {
      text-align: center;
      font-size: 4rem;
      margin: 0;
      padding: 3rem;
    }
    .categories-content_wrapper {
      display: flex;
      justify-content: center;
    }
    .product-cards_container {
      width: 1440px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap:2rem;
    }
    
  </style>