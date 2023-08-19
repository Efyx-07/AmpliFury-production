<template>
    
    <div class="product-card">
        <div class="product-image_container">
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image" 
                @click="navigateToProduct"
                v-if = "showImageClickable"
                :class="{ 'clickable': showImageClickable }"
            >
            <img 
                :src="product.image.source" 
                :alt="product.image.alt" 
                class="product-image" 
                v-else
            >
        </div>
        <div class="product-infos_container">
            <div class="product-brand-and-model_container">
                <p class="product-brand">{{ product.brand }}</p>
                <p class="product-model">{{ product.model }}</p>
            </div>
            <p class="product-description" v-if="showDescription">{{ product.description }}</p>
            <p class="product-price">{{ product.price }} {{ currency }}</p>
            <div class="product-card-line_container">
                <p class="inStock" v-if="product.available">{{ availableMention }}</p>
                <p class="onDemand" v-else>{{ notAvailableMention }}</p>
                <div class="action-icons_container">
                    <Icon 
                        icon="ph:eye-light" 
                        width="20" 
                        class="customerIcon" 
                        v-if="showEyeIcon" 
                        @click="navigateToProduct"
                    />
                    <Icon icon="cil:heart" width="20" class="customerIcon"/>
                    <Icon icon="bi:cart" width="20" class="customerIcon"/>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue'; // importe les icones Iconify
    import { useRouter } from 'vue-router'; // utilise useRouter pour la navigation 
    import { useRoute } from 'vue-router'; // importe la fonction useRoute pour accéder aux informations de la route

    const currency = '$'; // devise qui sera accollée au prix
    const availableMention = 'in stock'; 
    const notAvailableMention = 'on demand';

    const props = defineProps({
        product: Object, // propriété reçue pour représenter les détails du produit
        showEyeIcon: Boolean, // prop pour contrôler l'affichage de l'icone eye
        showDescription: Boolean, // prop pour contrôler l'affichage de la description
    });

    const router = useRouter(); //utilise useRouter pour accéder à l'instance du router

    const navigateToProduct = () => {
        router.push({ // methode vue-router permet de naviguer vers nouvelle route
           name: 'ProductDetail', // nom de la route vers laquelle naviguer (definie dans router)
           params: {
            productId: props.product.id // parametres de la route - transmet l'ID du produit selectionné
           } 
        });
    }

    const route = useRoute();

    const showImageClickable = route.name === 'Categories' || route.name === 'Category'; // contrôle la visibilité de l'image clickable

    console.log('showImageClickable:', showImageClickable);

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .product-card {
        width: 296px;
        height: 384px;
        background: $ultraLightColor;
        border-radius: $containerBorderRadius;
        box-shadow: $shadow;
        .product-image_container {
            width: 100%;
            height: 288px;
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: $containerBorderRadius $containerBorderRadius 0 0;
        }
        .product-image {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            object-fit: cover;
            border-radius: inherit;

            &.clickable {
                cursor: pointer;
                transition: transform .3s ease-in-out;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
        .product-infos_container {
            padding: 0 1rem;
            .product-brand-and-model_container {
                display: flex;
                gap: .2rem;
            }

            .product-brand, .product-model {
                font-size: 1.25rem;
                margin: 0;
            }
            .product-price {
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
        }
        .product-card-line_container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: .25rem;
            .inStock {
                margin: 0;
                color: #45AA43;
            }
            .onDemand {
                margin: 0;
                color: #CA0B0B;
            }
            .action-icons_container {
                display: flex;
                gap: 10px;
                .customerIcon {
                    cursor: pointer;
                }
            }
        }
    }

</style>