<template>

    <div class="copyright-container">
        <p class="copyright">{{copyrightLogo}} {{ currentYear }} <span>{{ storeName }}</span></p>
    </div>

</template>

<script setup>
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    //datas
    const { storeName } = useGlobalDataStore(); // récupère le nom de la boutique à partir du store
    const copyrightLogo = '©'
    const currenDate = new Date();    
    const currentYear = currenDate.getFullYear();

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .copyright-container {
        background: $accentColor;
        text-align: center;
        .copyright {
            margin: 0;
            padding: 1rem;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 1.2rem;
                padding: 1.5rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: 1.5rem;
            }

            span {
                font-weight: 700;
            }

        }
    }

</style>