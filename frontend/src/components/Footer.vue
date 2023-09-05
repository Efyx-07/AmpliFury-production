<template>
    <div class="footer">
        <FooterMainPart :route="route"/>
        <Copyright />
        <ToTopButton class="toTopButton"/>   
    </div>
    
</template>

<script setup>

    import FooterMainPart from '@/sub-components/FooterMainPart.vue';
    import Copyright from '@/sub-components/Copyright.vue';
    import ToTopButton from '@/sub-components/ToTopButton.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    console.log(route.name)

</script>

<style lang="scss" >

    @import '@/assets/sass/variables.scss';

    .footer{
        position: relative;

        .toTopButton {
            position: absolute;
            right: 1rem;
            bottom: 1.5rem;

            @media screen and (min-width: $breakpointTablet) {
                right: 2rem;
                bottom: 2rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                right: 4rem;
            }
        }
    }
    
</style>