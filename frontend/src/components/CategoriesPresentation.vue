<template>

    <section class="categories-presentation">
      
        <div class="title-and-button1_container">
          <h1>{{ sectionTitle }}</h1>
          <router-link to="/categories" class="button1"> <!-- relie le bouton à la route Categories -->
            <p>{{ button1Text }}</p>
            <Icon icon="system-uicons:arrow-up" :rotate="1" class="button1-arrow"/>
          </router-link>
        </div>

        <ul class="categoryList">
          <li v-for="category in categories" :key="category.name">
            <div class="category_container">
              <router-link :to="`/categories/${category.name}`" class="toCategory-image">
                <img :src="category.categoryImage.source" :alt="category.categoryImage.alt" class="category-image"/>
                <div class="categoryMobile-overlay">
                  <p>{{ category.name }}</p>
                </div>
              </router-link>
              <div class="category-image-overlay">
                <p>{{ category.name }}</p>
                <router-link :to="`/categories/${category.name}`" class="toCategory-button">
                  <p>{{ categoryButton }}</p>
                  <Icon icon="system-uicons:arrow-up" width="20" :rotate="1" class="arrow"/>
                </router-link>
              </div>
            </div>
          </li>
        </ul>

        <router-link to="/categories" class="button1Mobile"> <!-- relie le bouton à la route Categories -->
            <p>{{ button1Text }}</p>
            <Icon icon="system-uicons:arrow-up" width="30" :rotate="1" />
        </router-link>

    </section>

  </template>
  
  <script setup>
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { Icon } from '@iconify/vue';
    
    // data
    const sectionTitle = "OUR CATEGORIES";
    const button1Text = "Explore All";
    const categoryButton = "Explore";

    // récupère les données du catalogue sur le store
    const catalogueStore = useCatalogueStore();
    const categories = catalogueStore.products;
     
  </script>
  
  <style lang="scss" scoped>

      @import '@/assets/sass/variables.scss';
      @import '@/assets/sass/mixins.scss';
      .categories-presentation {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media screen and (min-width: $breakpointTablet) {
          padding: 2rem 2rem;
        }
        .title-and-button1_container {
          display: flex;
          justify-content: center;

          @media screen and (min-width: $breakpointTablet) {
            justify-content: space-between;
            align-items: baseline;
          }

          h1 {
            margin: 0;
            line-height: 1;
            font-size: 12vw;

            @media screen and (min-width: $breakpointTablet) {
              font-size: 4rem;
            }
          }
          .button1 {
            display: none;

            @media screen and (min-width: $breakpointTablet) {
              display: flex;
              align-items: center;
              text-decoration: none;
              color: $darkColor;

              p, &-arrow {
                font-size: 1.5rem;
                margin: 0;
              }
  
            }
          }
        }
        .categoryList {
          margin: 0;
          list-style-type: none;
          padding-left: 0;
          display: flex;
          gap: 1rem;
          overflow-x: scroll;

          @media screen and (min-width: $breakpointTablet) {
            flex-wrap: wrap;
            overflow-x: hidden;
            gap: 2rem; 
          }
          .category_container {
            width: 16rem;
            height: 22rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerBorderRadius;

            @media screen and (min-width: $breakpointTablet) {
              
            }

            .category-image {
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              object-fit: cover;
              border-radius: $containerBorderRadius;
            }
            .categoryMobile-overlay {
              position: absolute;
              bottom: 0;
              background: rgba($darkColor, .8);
              width: 100%;
              height: 25%;
              display: flex;
              justify-content: center;
              align-items: center;

              p {
                font-size: 2rem;
                color: $lightColor;
              }
            }
          }
        }

        .button1Mobile {
          text-decoration: none;
          color: $darkColor;
          display: flex;
          justify-content: center;
          align-items: center;
          border: solid 1px $darkColor;

          p {
            margin: 0;
            font-size: 2rem;
            padding: .5rem;
          }

          @media screen and (min-width: $breakpointTablet) {
            display: none;
          }
        }



      }
  </style>