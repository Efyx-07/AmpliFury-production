<template>
    <nav>
        <ul>
            <li>
                <router-link to="/categories" class="navButton_container"> <!-- relie le 1er bouton à la route Categories -->
                    <div class="potentiometer-icon">
                        <div class="potentiometer-icon-bar"></div>
                    </div>
                    <p>{{ defaultButtonName }}</p>
                </router-link>
            </li>
            <li v-for="category in categories" :key="category.name">
                <router-link :to="`/categories/${category.name}`" class="navButton_container"> <!-- relie les autres boutons à leur route dynamique respective (categorie filtrée) -->
                    <div class="potentiometer-icon">
                        <div class="potentiometer-icon-bar"></div>
                    </div>
                    <p>{{ category.name }}</p> <!-- donne le nom des categories respectives aux boutons -->
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

// importe les datas du catalogue géré par le store Pinia

  import { useCatalogueStore } from '@/stores/CatalogueStore';
  
  const catalogueStore = useCatalogueStore();
  const categories = catalogueStore.products;

  const defaultButtonName = "All products";

//---------------------------------------------------------
  
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';

    ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        gap: 3rem;

        li {
            .navButton_container {
                text-decoration: none;
                display: flex;
                flex-direction: column;
                gap:.3rem;
                align-items: center;
                cursor: pointer;

                .potentiometer-icon {
                    width: 30px;
                    height: 30px;
                    background: $darkColor;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    transition: all .3s ease-in-out;

                    &-bar {
                        width: 3px;
                        height: 15px;
                        background: $lightColor;
                    }
                }

                p {
                    margin: 0;
                    font-weight: 400;
                    color: $darkColor;
                }
                &:hover > .potentiometer-icon {
                    transform: rotate(120deg);
                }
            }
        }
    }
</style>