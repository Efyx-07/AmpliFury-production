<template>

  <div class="categoryPage">

    <div class="titleAndOptionButton_container">
      <h1 class="category-title">{{ pageTitle }}</h1> 
      <div class="sortSelect-container">
        <p>Sort by:</p>
        <!-- bouton de tri des produits -->
        <select class="sortSelectButton" v-model="selectedSortOption">
          <option value="random">Random</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
          <option value="alphaAsc">Alphabet: A to Z</option>
          <option value="alphaDesc">Alphabet: Z to A</option>
        </select>
      </div>
    </div>

    <div class="categories-content_wrapper">
      <div class="product-cards_container">
        <!-- importe composant ProductCard avec image clickable -->
        <ProductCard 
          class="product-card"
          v-for="product in sortedProducts" 
          :key="product.model" 
          :product="product" 
          :showDescription="false" 
          :showEyeIcon="true"
          :showDetails="false"
        />
      </div>
    </div>

  </div>
  

</template>
  
<script setup>

  import { useRoute } from 'vue-router'; // importe la fonction useRoute pour accéder aux informations de la route
  import { useCatalogueStore } from '@/stores/CatalogueStore'; // importe les datas du catalogue géré par le store Pinia
  import { computed, watch, ref } from 'vue'; // importe la fonction computed pour créer des propriétés calculées    import ProductCard from '@/components/ProductCard.vue';
  import ProductCard from '@/components/ProductCard.vue';

  const route = useRoute(); // récupère l'objet route de la route actuelle
  const catalogueStore = useCatalogueStore(); // utilise le store Pinia pour les données du catalogue

  // crée une propriété calculée pageTitle
  const pageTitle = computed(() => {
    const categoryFilter = route.params.category; // récupère le paramètre "category" de la route
    return categoryFilter && categoryFilter !== 'all' ? categoryFilter : 'All products'; // vérifie si le paramètre existe et n'est pas "all", retourne le nom de la catégorie comme titre ou 'All products par défaut'
  });

  // crée une liste de tous les produits
  const allProducts = computed(() => catalogueStore.products.flatMap(category => category.products));

  // crée une propriété calculée filteredProducts qui filtre en parcourant les catégories et leurs produits
  const filteredProducts = computed(() => {

    const categoryFilter = route.params.category; // récupère le paramètre "category" de la route
    
    if (categoryFilter && categoryFilter !== 'all') {
      const filtered = []; // Initialise un tableau vide pour les produits filtrés
      // parcourt les categories du store
      catalogueStore.products.forEach(category => {
        const categoryProducts = category.products.filter(product => {
          const productType = product.type; // utilise propriété type pour la comparaison
          return productType === categoryFilter; // filtre les produits de la catégorie en fonction de la catégorie sélectionnée dans la route
        }); 
        filtered.push(...categoryProducts); // ajoute les produits filtrés de cette catégorie au tableau "filtered"
      });
      return filtered; // retourne la liste des produits filtrés par catégorie
    } else {
      return allProducts.value; // Utilise la liste de tous les produits sans filtre
    }

  });

  // crée une propriété réactive pour stocker l'option de tri sélectionnée
  const selectedSortOption = ref('random');

  // crée une propriété calculée sortedProducts qui retourne les produits triés en fonction de l'option de tri
  const sortedProducts = computed(() => {
    const option = selectedSortOption.value;
    if (option === 'random') {
      return catalogueStore._randomizeProducts(filteredProducts.value); // trie les produits de manière aléatoire en utilisant la méthode _randomizeProducts du store
    } else if (option === 'priceAsc') {
      return filteredProducts.value.slice().sort((a, b) => a.price - b.price);
    } else if (option === 'priceDesc') {
      return filteredProducts.value.slice().sort((a, b) => b.price - a.price);
    } else if (option === 'alphaAsc') {
      return filteredProducts.value.slice().sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (option === 'alphaDesc') {
      return filteredProducts.value.slice().sort((a, b) => b.brand.localeCompare(a.brand));
    }
  });

  // met à jour la liste triée des produits lorsque l'option de tri change
  watch(selectedSortOption, () => {
    sortedProducts.value;
  });

</script>

  <style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .categoryPage {
      padding: 2rem 1rem 4rem 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      background: $gradientBackground2;

      @media screen and (min-width: $breakpointTablet) {
        padding: 2rem 2rem 4rem 2rem;
      }

      @media screen and (min-width: $breakpointDesktop) {
        padding: 4rem 4rem 8rem 4rem;
        gap: 4rem;
      }

      .titleAndOptionButton_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        @media screen and (min-width: 1047px) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          text-align: center;
          align-items: baseline;
        }

        h1 {
          margin: 0;
          font-size: 2.5rem;

          @media screen and (min-width: $breakpointTablet) {
            font-size: 3rem;
          }

          @media screen and (min-width: 1047px) {
            grid-column: 2 / -2;
          }

          @media screen and (min-width: $breakpointDesktop) {
            font-size: clamp(4rem, 6vw, 6rem);
            white-space: nowrap;
            line-height: 1;
          }
        }
        .sortSelect-container {
          display: flex;
          align-items: center;
          gap: 1rem;

          @media screen and (min-width: 1047px) {
            grid-column: 3 / -1;
            justify-content: center;
          }

          p {
            margin: 0;

            @media screen and (min-width: $breakpointDesktop) {
              font-size: clamp(1rem, 1.5vw, 1.5rem);
            }
          }

          .sortSelectButton {
            width: 10rem;
            border: none;
            border-radius: $containerBorderRadius;
            background: $ultraLightColor;
            padding: .5rem 1rem;
            font-size: 1rem;

            @media screen and (min-width: $breakpointDesktop) {
              width: 15rem;
              font-size: clamp(1rem, 1.2vw, 1.2rem);
            }
          }

          
        }
      }

      .categories-content_wrapper {
        display: flex;
        justify-content: center;

        .product-cards_container {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap:2rem;

          @media screen and (min-width: $breakpointDesktop) {
            gap: 1rem;
          }
        }
      }
    }

  </style>