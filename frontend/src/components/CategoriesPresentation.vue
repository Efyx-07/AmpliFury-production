<template>

    <section class="categories-presentation">
      
        <div class="title-and-button1_container">
          <h1>{{ sectionTitle }}</h1>
          <router-link to="/categories" class="button1"> <!-- relie le bouton à la route Categories version tablet et desktop -->
            <p>{{ button1Text }}</p>
            <Icon icon="system-uicons:arrow-up" :rotate="1" class="button1-arrow"/>
          </router-link>
        </div>

        <ul class="categoryList">
          <li v-for="category in categories" :key="category.name">
            <div class="category_container">
              <img :src="category.categoryImage.source" :alt="category.categoryImage.alt" class="category-image"/> <!-- image pour version tablet et desktop -->
              <router-link :to="`/categories/${category.name}`" class="toCategory-image"> <!-- image routée pour version mobile -->
                <img :src="category.categoryImage.source" :alt="category.categoryImage.alt" class="category-image_mobile"/>
                <div class="categoryMobile-overlay"> <!-- overlay pour version mobile -->
                  <p>{{ category.name }}</p>
                </div>
              </router-link>
              <div class="category-image-overlay"> <!-- overlay pour version tablet et desktop -->
                <p class="categoryName">{{ category.name }}</p>
                <router-link :to="`/categories/${category.name}`" class="toCategory-button">
                  <p>{{ categoryButton }}</p>
                  <Icon icon="system-uicons:arrow-up" :rotate="1" class="arrow"/>
                </router-link>
              </div>
            </div>
          </li>
        </ul>

        <router-link to="/categories" class="button1Mobile"> <!-- relie le bouton à la route Categories version mobile -->
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
      .categories-presentation {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media screen and (min-width: $breakpointTablet) {
          padding: 2rem 2rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
          padding: 3rem 4rem 4rem 4rem;
          gap: 3rem;
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

            @media screen and (min-width: $breakpointDesktop) {
              font-size: 8vw;
            }
          }
          .button1 {
            display: none;

            @media screen and (min-width: $breakpointTablet) {
              display: flex;
              align-items: center;
              text-decoration: none;
              color: $darkColor;

              &:hover {
                color: $accentColor;
              }

              p, &-arrow {
                font-size: 1.5rem;
                margin: 0;
                font-weight: 300;

                @media screen and (min-width: $breakpointDesktop) {
                  font-size: 2.5rem;
                }
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
            justify-content: center;
            flex-wrap: wrap;
            overflow-x: hidden;
            gap: 2rem; 
          }

          @media screen and (min-width: $breakpointDesktop) {
            gap: 1rem;
          }
          .category_container {
            width: 16rem;
            height: 22rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerBorderRadius;

            &:hover {
              >.category-image {
                transform: scale(1.07);
              }
            }

            .category-image {
              display: none;

              @media screen and (min-width: $breakpointTablet) {
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                object-fit: cover;
                border-radius: $containerBorderRadius;
                transition: transform 0.5s ease-in-out;
              }
            }

            @media screen and (min-width: $breakpointTablet) {
              width: calc(50vw - 4rem);
              height: calc(50vw - 4rem);
            }

            @media screen and (min-width: $breakpointDesktop) {
              width: calc(33.33vw - 4rem);
              height: calc(33.33vw - 4rem);
            }
            .category-image_mobile {
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              object-fit: cover;
              border-radius: $containerBorderRadius; 

              @media screen and (min-width: $breakpointTablet) {
                display: none;
              }
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

              @media screen and (min-width: $breakpointDesktop) {
                display: none;
              }

            }
            .category-image-overlay {
              display: none;
              opacity: 0;

              @media screen and (min-width: $breakpointDesktop) {
                position: absolute;
                bottom: 0;
                background: rgba($darkColor, .8);
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: .5rem;
                color: $lightColor;
              }

              &:hover {
                opacity: 1;
              }
              .categoryName {
                margin: 0;
                font-size: 3rem;
                font-weight: 600;
              }
              .toCategory-button {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: $lightColor;
                border: solid 1px $lightColor;
                padding: .3rem 1rem;

                &:hover {
                  background: $accentColor;
                  border-color: $accentColor;
                }
                p, .arrow {
                  margin: 0;
                  font-size: 1.5rem;
                  font-weight: 300;
                }
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

          &:hover {
            color: $accentColor;
            border-color: $accentColor;
          }

          p {
            margin: 0;
            font-size: 2rem;
            font-weight: 300;
            padding: .5rem;
          }

          @media screen and (min-width: $breakpointTablet) {
            display: none;
          }
        }
        
      }
  </style>