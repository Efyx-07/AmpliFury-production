<template>

    <section class="environmentCare"> 

        <!-- structure version mobile -->
        <div class="environmentCare_mobile-container">
            <h1>{{ textTitle }}</h1>
            <div class="environmentCare_mobile_content">
                <img :src="image.source" :alt="image.alt">
                <p> {{ text }}</p>
            </div>
        </div>

        <!-- structure version tablet et desktop -->
        <div class="environmentCare-tabDesk_container">
            <img :src="image.source" :alt="image.alt">
            <div class="environmentCare-text_container">
                <h1>{{ textTitle }}</h1>
                <p> {{ text }}</p>
            </div>
        </div>

    </section>

</template>

<script setup>

    const image = {
        source: "/src/assets/decoration/monkey-nobg.png",
        alt: "musician-monkey in forest"
    };
    const textTitle = "ENVIRONMENT CARE";
    const text = "AmpliFury is deeply committed to environmental care. Partnering exclusively with brands that share this ethos, AmpliFury ensures its products resonate with sustainability. Understanding the significance of wood in instrument crafting, the company also takes a bold step by planting a tree for every instrument sold, contributing to the fight against deforestation.";

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    
    .environmentCare {
        padding: 1rem;

        @media screen and (min-width: $breakpointTablet) {
            padding: 2.5rem;
        }

        &-tabDesk_container {
            display: none;
        }

        &_mobile-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: solid 1px $darkColor;
            border-radius: $containerBorderRadius;
            padding: 1rem;

            h1 {
                margin: 0;
                font-size: 9vw;
            }
            .environmentCare_mobile_content {
                display: flex;
                align-items: center;

                img {
                    height: 20rem;
                }

                p {
                    font-size: clamp(1rem ,3.5vw, 3.5vw);
                    font-weight: 300;
                }
            }

            @media screen and (min-width: $breakpointTablet) {
                display: none;
            }
        }

        @media screen and (min-width: $breakpointTablet) {
            .environmentCare {

                &-tabDesk_container {
                    display: grid;
                    position: relative;
                    grid-template-columns: 1fr 2fr;
                    border: solid 1px $darkColor;
                    border-radius: $containerBorderRadius;
                    padding: 2rem;

                    img {
                        position: absolute;
                        bottom: 1rem;
                        width: auto;
                        height: 40vh;

                        @media screen and (min-width: 800px) {
                            height: 43vh;
                        }

                        @media screen and (min-width: 900px) {
                            height: 50vh;
                        }

                        @media screen and (min-width: 1050px) {
                            height: 55vh;
                        }
                    }

                    .environmentCare-text_container {
                        grid-column: 2 / -1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 1rem;
                        padding-right: 2rem;

                        h1 {
                            margin: 0;
                            font-size: clamp(2rem, 6vw, 6vw);
                            white-space: nowrap;
                        }

                        p {
                            margin: 0;
                            font-size: clamp(1rem, 2.7vw, 3.5rem);
                            font-weight: 300;
                            text-align: justify;
                        }
                    }
                }         
            }
        }
    }

    
</style>