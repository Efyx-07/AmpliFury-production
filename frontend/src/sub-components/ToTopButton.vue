<template>

    <router-link to="/" class="toTopButton" @click="scrollToTop">
            <p>{{ toTopButtonText }}</p>
    </router-link>
    
</template>

<script setup>

    //datas 
    const toTopButtonText = "TOP";

    //permet le retour vers le haut de page

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .toTopButton {
        background: $darkColor;
        border: solid 3px $accentColor;
        border-radius: 100%;
        text-decoration: none;
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 1rem;
        margin-bottom: 1.5rem;

        @media screen and (min-width: $breakpointTablet) {
            width: 5rem;
            height: 5rem;
            right: 2rem;
            margin-bottom: 2rem;
            border-width: 4px;
        }

        @media screen and (min-width: $breakpointDesktop) {
            right: 4rem;
        }

        p {
            margin: 0;
            color: $accentColor;
            font-size: 1.25rem;
            font-weight: 700;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 1.5rem;
            }
        }
    }
</style>