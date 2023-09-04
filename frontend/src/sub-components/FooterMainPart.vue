<template>
    <div class="footer-wrapper">
        <div class="footerMainPart">
        <FooterContact />
        <FooterNewsletter />
        <FooterSocialLinks />    
    </div>
    </div>

</template>

<script setup>

    import FooterContact from '@/sub-components/FooterContact.vue';
    import FooterNewsletter from '@/sub-components/FooterNewsletter.vue';
    import FooterSocialLinks from '@/sub-components/FooterSocialLinks.vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .footer-wrapper {
        background: $accentColor;
    }
    
    .footerMainPart {
        border-radius: 100px 100px 0px 0px;
        background: $darkColor;
        color: $accentColor;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        padding: 4rem 1rem;

        @media screen and (min-width: $breakpointTablet) {
            padding: 4rem 2rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            padding: 6rem 4rem;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: start;
        }
        
    }

</style>