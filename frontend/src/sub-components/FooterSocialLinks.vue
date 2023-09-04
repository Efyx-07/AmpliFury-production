<template>

    <div class="socialLinksPart">
        <h1>{{ socialLinksTitle }}</h1>
        <div class="socialLogos-container">
            <div v-for="socialLink in socialLinks" :key="socialLink.social">
                <a :href="socialLink.link" target="_blank" :aria-label="socialLink.ariaLabel" rel="noopener noreferrer">
                    <Icon :icon="socialLink.logo" class="socialLogos"/>
                </a>
            </div>
        </div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // datas 
    const socialLinksTitle = 'FOLLOW';
    const socialLinks = [
        {
            social: 'Youtube',
            logo: "uil:youtube",
            link: 'https://www.youtube.com/',
            ariaLabel: 'Youtube channel', 
        },
        {
            social: 'Facebook',
            logo: "ic:outline-facebook",
            link: 'https://fr-fr.facebook.com/',
            ariaLabel: 'Facebook page', 
        },
        {
            social: 'Tiktok',
            logo: "cib:tiktok",
            link: 'https://www.tiktok.com/',
            ariaLabel: 'Tiktok page', 
        },
        {
            social: 'Instagram',
            logo: "teenyicons:instagram-solid",
            link: 'https://www.instagram.com/',
            ariaLabel: 'Instagram page', 
        },
        {
            social: 'X',
            logo: "simple-icons:x",
            link: 'https://twitter.com/',
            ariaLabel: 'X page', 
        },
    ];

</script>

<style lang="scss" scoped> 

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/FooterMainPart.scss';

    .socialLogos-container {
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 1.5rem;

            @media screen and (min-width: $breakpointTablet) {
                gap: 4rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                gap: unset;
                justify-content: space-around;
                width: 70%;
            }
            .socialLogos {
                font-size: 1.5rem;
                color: $accentColor;

                @media screen and (min-width: $breakpointTablet) {
                    font-size: 2rem;
                }
            }
        }

</style>

