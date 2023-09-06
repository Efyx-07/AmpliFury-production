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
                        <div>
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
    ];
 

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .commitments {
        padding: 2rem 1rem;
        background: $accentColor;

        @media screen and (min-width: $breakpointTablet) {
            padding: 3rem 2rem
        }

        @media screen and (min-width: $breakpointDesktop) {
            padding: 6rem 4rem;
        }

        &-content {
            display: flex;
            flex-direction: column;
            gap: 3rem;

            @media screen and (min-width: $breakpointDesktop) {
                gap: 6rem;
            }
            .supText_container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;

                @media screen and (min-width: $breakpointDesktop) {
                    padding: 0 5rem;
                    gap: 2rem;
                }

                @media screen and (min-width: 1380px) {
                    padding: 0 12rem;
                    gap: 3rem;
                }

                h1 {
                    margin: 0;
                    line-height: 1;
                    font-size: 12vw;

                    @media screen and (min-width: $breakpointTablet) {
                        font-size: 4rem;
                    }

                    @media screen and (min-width: $breakpointDesktop) {
                        font-size: 8vw;
                        line-height: .8;
                    }
                }

                p {
                    margin: 0;
                    font-size: clamp(1rem ,3.5vw, 3.5vw);
                    text-align: center;

                    @media screen and (min-width: $breakpointTablet) {
                        font-size: 1.5rem;
                    }

                    @media screen and (min-width: $breakpointDesktop) {
                        font-size: 2vw;
                        font-weight: 300;
                    }
                }
            }
            .deal-cards_container {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                @media screen and (min-width: $breakpointTablet) {
                    flex-direction: row;
                    justify-content: space-between;
                }

                @media screen and (min-width: $breakpointDesktop) {
                    justify-content: unset;
                    gap: 2rem;
                }
                .deal-card {
                    background: rgba($lightColor, .8);
                    border-radius: $containerBorderRadius;
                    box-shadow: $shadow;
                    min-height: 8.125rem;
                    padding: 1.5rem 3rem 1.5rem 1rem;
                    display: flex;
                    gap: 1rem;

                    @media screen and (min-width: $breakpointTablet) {
                        flex-direction: column;
                        align-items: center;
                        gap: .5rem;
                        padding: 1rem 2rem;
                        min-height: unset;
                        height: 12rem;
                    }

                    @media screen and (min-width: $breakpointDesktop) {
                        flex-direction: row;
                        align-items: unset;
                        gap: 1.5rem;
                        padding: 2rem 3rem;
                        min-height: 20rem;
                        height: unset;
                    }

                    @media screen and (min-width: 1270px) {
                        min-height: 16rem;
                    }
                    .icon {
                        font-size: 2.5rem;

                        @media screen and (min-width: $breakpointTablet) {
                            font-size: 1.8125rem;
                        }

                        @media screen and (min-width: $breakpointDesktop) {
                            font-size: clamp(2.5rem, 3vw, 3vw);
                        }
                    }

                    &_text-container {
                        display: flex;
                        flex-direction: column;
                        gap: .6rem;
                        margin-top: .5rem;

                        @media screen and (min-width: $breakpointTablet) {
                            margin-top: 0;
                            text-align: center;
                        }

                        @media screen and (min-width: $breakpointDesktop) {
                            margin-top: .5rem;
                            text-align: unset;
                        }

                        h4, p {
                            margin: 0;
                        }

                        h4 {
                            font-size: clamp(1.3rem ,3vw, 3vw);

                            @media screen and (min-width: $breakpointTablet) {
                                white-space: nowrap;
                                font-size: clamp(1.1rem ,2vw, 2.2vw);
                            }

                            @media screen and (min-width: $breakpointDesktop) {
                                
                                font-size: clamp(1.5rem ,1.5vw, 1.5vw);
                            }
                        }

                        p {
                            font-size: clamp(1rem ,2.5vw, 2.5vw);
                            text-align: justify;

                            @media screen and (min-width: $breakpointTablet) {
                                font-size: 1rem;
                                text-align: unset;
                            }

                            @media screen and (min-width: $breakpointDesktop) {
                                font-size: clamp(1.3rem, 1.3vw, 1.3vw);
                                text-align: justify;
                            }
                        }
                    }
                }
            }
        }
    }


</style>