<template>

    <div class="footerMainPart">
        <div class="contactPart">
            <h1>{{ title.contact }}</h1>
            <router-link to="/contact" class="toContactButton">
                <p>{{ toContactButtonMention }}</p>
                <Icon icon="system-uicons:arrow-up" :rotate="1" class="arrow"/>
            </router-link>
        </div>
        <div class="newsletterPart">
            <h1>{{ title.newsletter }}</h1>
            <form action="" class="newsletterForm">
                <input type="mail" id="email-input" name="email" :placeholder= "newsletterInputPlaceholder">
                <div class="button-container">
                    <button type="submit">{{ newsletterButtonLabel }}</button>
                    <Icon icon="system-uicons:arrow-up" :rotate="1" class="arrow"/>
                </div>
            </form>
        </div>
        <div class="socialLinksPart">
            <h1>{{ title.socialLinks }}</h1>
            <div class="socialLogos-container">
                <div v-for="socialLink in socialLinks" :key="socialLink.social">
                    <a :href="socialLink.link" target="_blank" :aria-label="socialLink.ariaLabel" rel="noopener noreferrer">
                        <Icon :icon="socialLink.logo" class="socialLogos"/>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    //datas
    const title = {
        contact: 'CONTACT',
        newsletter: 'NEWSLETTER',
        socialLinks: 'FOLLOW'
    }

    const toContactButtonMention = 'Contact us';
    
    const newsletterInputPlaceholder = 'Your mail address';
    const newsletterButtonLabel = 'Subscribe';

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
    .footerMainPart {
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

        h1 {
            margin: 0;
            font-size: 2.5rem;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 3rem;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: 4rem;
            }
        }
        .contactPart, .newsletterPart, .socialLinksPart {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            width: 100%;
        }
        
        .toContactButton {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .5rem;
            text-decoration: none;
            color: $accentColor;
            border: solid 1px $accentColor;
            width: 100%;

            @media screen and (min-width: $breakpointTablet) {
                width: 18rem;
            }

            p, .arrow {
                margin: 0;
                font-size: 2rem;
                font-weight: 300;

                @media screen and (min-width: $breakpointTablet) {
                    font-size: 1.5rem;
                }
            }
        }
        .newsletterForm {
            display: flex;
            flex-direction: column;
            width: 100%;

            input {
                background: transparent;
                border: none;
                border-bottom: solid 1px $accentColor;
                height: 2rem;

                @media screen and (min-width: $breakpointTablet) {
                    height: 3rem;
                }

                &::placeholder {
                    font-size: 1.5rem;
                    color: $accentColor;
                }
            }

            .button-container {
                border-bottom: solid 1px $accentColor;
                display: flex;
                align-items: center;
                justify-content: end;
                height: 2rem;
                cursor: pointer;

                @media screen and (min-width: $breakpointTablet) {
                    height: 3rem;
                }

                button, .arrow {
                    font-size: 1.5rem;
                    color: $accentColor;
                    cursor: pointer;
                }

                button {
                    background: transparent;
                    border: none;
                }
            }
        } 
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
    }

</style>