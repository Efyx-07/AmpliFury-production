<template>

    <div class="addNotificationModal_container" v-if="showModal">
        <div class="addNotificationModal">

            <div class="addNotificationModal-content">
                <p class="notif-mention">{{ props.product.brand }} {{ props.product.model }} {{notifMentionWishlist}}</p>
            </div>

            <Icon 
                icon="carbon:close" 
                class="closeIcon"
                @click="closeModal"
            />

        </div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    //datas 
    const notifMentionWishlist = 'is now (nbre de fois) in your shopping cart.';

    const props = defineProps ({
        product: Object,
    });

    const showModal = ref(true);

    const closeModal = () => {
    showModal.value = false;
   };

    if(showModal) {
        setTimeout(() => {
            closeModal()
        }, 3000);
    };
    
</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .addNotificationModal_container {
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: 1rem 2rem;
        z-index: 899;
        display: block;
        .addNotificationModal {
            width: 100%;
            height: 100%;
            background: $accentColor;
            border-radius: $containerBorderRadius;
            box-shadow: $shadow;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5rem;
            position: relative;

            &-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p {
                    margin: 0;
                }
                .button {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: $lightColor;
                }
            }
            .closeIcon {
                position: absolute;
                top: .3rem;
                right: .3rem;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }
    }
    
</style>