<template>

    <div class="toTopButton" @click="scrollToTop">
            <p>{{ toTopButtonText }}</p>
    </div>
    
</template>

<script setup>

    //datas 
    const toTopButtonText = "TOP";

    //permet le retour vers le haut de page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
        cursor: pointer;

        @media screen and (min-width: $breakpointTablet) {
            width: 5rem;
            height: 5rem;
            border-width: 4px;
        }

        @media screen and (min-width: $breakpointDesktop) {
            width: 6rem;
            height: 6rem;
        }

        p {
            margin: 0;
            color: $accentColor;
            font-size: 1.25rem;
            font-weight: 700;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 1.5rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: 2rem;
            }
        }
    }
</style>