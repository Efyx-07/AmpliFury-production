<template>

    <section class="commitments">
        <div class="commitments-content">
            <div class="supText_container">
                <h1>{{ sectionTitle }}</h1>
                <p>{{ mainText }}</p>
            </div>
            <div class="deal-cards_container">
                <div v-for="deal in deals" :key="deal.name">
                    <div class="deal-card">
                        <div v-if="deal.icon">
                            <Icon :icon="deal.icon" :style="{ fontSize: '3rem' }"/>
                        </div>
                        <div class="deal-card_text-container">
                            <h4>{{ deal.title }}</h4>
                            <p>{{ deal.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </section>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

    //datas
    const sectionTitle = "WHAT WE DO";
    const mainText = '"At AmpliFury, we\'re passionate about music. As an e-shop specializing in musical instruments, we offer a wide range of high-quality guitars, drums, keyboards, and more. Whether you\'re a beginner or a seasoned musician, AmpliFury is your ultimate destination to express and amplify your musical passion."'

    const deals = [
        {
            title: "Free shipping",
            description: "Now you can shop for it and enjoy a good deal on AmpliFury store. Starting from 149 $.",
            icon: "la:shipping-fast"
        },
        {
            title: "30 days return",
            description: "When returning the items, we do a refund of the order. If you wish to exchange for another item.",
            icon: "icon-park-outline:calendar-thirty"
        },
        {
            title: "Best price guaranteed",
            description:"Our price match applies to the retailers that have identical product available.",
            icon: "material-symbols:social-leaderboard-outline"
        },
    ]
 

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .commitments {
        padding: 4rem 0;
        display: flex;
        justify-content: center;
        background: $greyColor;

        &-content {
            @include desktopSectionContentWidth;
            display: flex;
            flex-direction: column;
            gap: 3rem;

            .supText_container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;

                h1 {
                    margin: 0;
                    font-size: 6rem;
                    line-height: 1;
                }

                p {
                    margin: 0;
                    font-size: 1.75rem;
                    text-align: center;
                    padding: 0 5rem;
                }
            }
            .deal-cards_container {
                display: flex;
                justify-content: space-between;
                .deal-card {
                    width: 25.625rem;
                    height: 11.52575rem;
                    border-radius: 0.9375rem;
                    background: $lightColor;
                    box-shadow:$shadow;
                    display: flex;
                    gap: 1rem;
                    padding: 2rem;

                    &_text-container {
                        display: flex;
                        flex-direction: column;
                        gap: .5rem;

                        h4 {
                            margin: 0;
                            font-size: 1.5rem;
                            font-weight: 700;
                        }

                        p {
                            margin: 0;
                            font-size: 1.25rem;
                            font-weight: 400;
                            text-align: justify;
                        }


                    }
                }


            }
        }
    }   

</style>