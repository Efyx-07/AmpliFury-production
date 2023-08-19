<template>
    <div class="cartIcon_container">
        <Icon icon="bi:cart" width="27" class="customerIcon cartIcon"/>
        <div class="cartIcon-badge" v-if="cartItemCount > 0">
            <p class="incrementation">{{ cartItemCount }}</p>
        </div>
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue';
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';

    const cartItemCount = computed(() => {
        console.log("Computing cartItemCount");
        return useCatalogueStore().cartItems.length;
    });
</script>


<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .cartIcon_container {
        position: relative;

        .cartIcon-badge {
            width: 1.1rem;
            height: 1.1rem;
            background: $darkColor;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0;
            right: 0;
            .incrementation {
                margin: 0;
                font-size: .8rem;
                color: $ultraLightColor;
                font-weight: bold;
            }
        }
    }
</style>