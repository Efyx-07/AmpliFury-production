<template>
    <section class="categories-presentation">
      <div class="categories-presentation-section_content">
        <div class="title-and-button1_container">
          <h1>{{ sectionTitle }}</h1>
          <router-link to="/categories" class="button1"> <!-- relie le 1er bouton à la route Categories -->
            <p>{{ button1Text }}</p>
            <Icon icon="system-uicons:arrow-up" width="30" :rotate="1" />
          </router-link>
        </div>
        <ul class="categoryList">
          <li v-for="category in categories" :key="category.name">
            <div class="category_container">
              <img :src="category.categoryImage.source" :alt="category.categoryImage.alt" class="category-image"/>
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
      </div>
    </section>
  </template>
  
  <script setup>
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { Icon } from '@iconify/vue';
    
    const catalogueStore = useCatalogueStore();
    const categories = catalogueStore.products;

    const sectionTitle = "OUR CATEGORIES";
    const button1Text = "Explore All";
    const categoryButton = "Explore";
  
  </script>
  
  <style lang="scss" scoped>
      @import '@/assets/sass/variables.scss';
      @import '@/assets/sass/mixins.scss';
      .categories-presentation {
        display: flex;
        justify-content: center;

        &-section_content {
          @include desktopSectionContentWidth;
        }
        .title-and-button1_container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;

          h1 {
            margin: 0;
            font-size: 6rem;
            line-height: 1;
          }
          .button1 {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: $darkColor;

            p {
              margin: 0;
              line-height: 1;
              font-size: 2rem;
              font-weight: 300;
            }
          }
        }
        .categoryList {
          list-style-type: none;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 0;
          .category_container {
            width: 25.625rem;
            height: 25.625rem;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerBorderRadius;
            .category-image {
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              object-fit: cover;
              transition: transform .3s ease-in-out;
            }
            .category-image-overlay {
              background: rgba($darkColor, 0.8);
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: .5rem;
              opacity: 0;
              transition: opacity .3s ease-in-out;

              p {
                color: $lightColor;
                font-size: 2rem;
                margin: 0;
              }
              .toCategory-button {
                width: 8rem;
                height: 1.875rem;
                text-decoration: none;
                color: $lightColor;
                border: solid 1px $lightColor;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .2rem;

                p {
                  margin: 0;
                  line-height: 1;
                  font-weight: 300;
                  font-size: 1.25rem;
                }
                .arrow {
                  margin-top: .3rem;
                }
              }
            }
            &:hover {
              > .category-image-overlay {
                opacity: 1;
              }

              > .category-image {
                transform: scale(1.1);
              }
            }
          }
        }
      }
  </style>