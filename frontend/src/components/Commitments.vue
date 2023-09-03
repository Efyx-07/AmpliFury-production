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
                            <Icon :icon="deal.icon" class="icon" />
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

    .commitments {
        padding: 3rem 1rem;
        margin-top: 3rem;
        background: $accentColor;

        &-content {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            .supText_container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;

                h1{
                    margin: 0;
                    line-height: 1;
                    font-size: 12vw;
                }

                p {
                    margin: 0;
                    font-size: clamp(1rem ,3.5vw, 3.5vw);
                    text-align: center;
                }
            }
            .deal-cards_container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .deal-card {
                    background: rgba($lightColor, .8);
                    border-radius: $containerBorderRadius;
                    min-height: 8.125rem;
                    padding: 1.5rem 3rem 1.5rem 1rem;
                    display: flex;
                    gap: 1rem;
                    .icon {
                        font-size: 2.5rem;
                    }

                    &_text-container {
                        display: flex;
                        flex-direction: column;
                        gap: .6rem;
                        margin-top: .5rem;

                        h4, p {
                            margin: 0;
                        }

                        h4 {
                            font-size: clamp(1.3rem ,3vw, 3vw);
                        }

                        p {
                            font-size: clamp(1rem ,2.5vw, 2.5vw);
                            text-align: justify;
                        }
                    }
                }
            }
        }
    }


</style>