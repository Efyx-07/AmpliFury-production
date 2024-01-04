<template>

    <div class="contactPart">
        <h1>{{ contactTitle }}</h1>
        <router-link to="/" class="toContactButton">
            <p>{{ toContactButtonMention }}</p>
            <Icon icon="system-uicons:arrow-up" :rotate="1" class="arrow"/>
        </router-link>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // datas 
    const contactTitle = 'CONTACT';
    const toContactButtonMention = 'Contact us';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/FooterMainPart.scss';

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
                font-size: 1.5rem;
                font-weight: 300;

                @media screen and (min-width: $breakpointTablet) {
                    font-size: 1.5rem;
                }
            }
        }

</style>