<template>

        <div class="newsletterPart">
            <h1>{{ newsletterTitle }}</h1>
            <form action="" class="newsletterForm">
                <input type="mail" id="email-input" name="email" :placeholder= "newsletterInputPlaceholder">
                <div class="button-container">
                    <button type="submit">{{ newsletterButtonLabel }}</button>
                    <Icon icon="system-uicons:arrow-up" :rotate="1" class="arrow"/>
                </div>
            </form>
        </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    // datas
    const newsletterTitle = 'NEWSLETTER';
    const newsletterInputPlaceholder = 'Your mail address';
    const newsletterButtonLabel = 'Subscribe';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/FooterMainPart.scss';

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
</style>