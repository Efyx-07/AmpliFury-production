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

    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    // datas
    const image = {
        source: "/src/assets/decoration/monkey-nobg.png",
        alt: "musician-monkey in forest"
    };
    const { storeName } = useGlobalDataStore();
    const textTitle = "ENVIRONMENT CARE";
    const text = `${ storeName } ` + "is deeply committed to environmental care. Partnering exclusively with brands that share this ethos, " + `${ storeName } ` + "ensures its products resonate with sustainability. Understanding the significance of wood in instrument crafting, the company also takes a bold step by planting a tree for every instrument sold, contributing to the fight against deforestation.";

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    
    .environmentCare {
        padding: 1rem 1rem 3rem 1rem;

        @media screen and (min-width: $breakpointTablet) {
            padding: 2.5rem 2.5rem 4rem 2.5rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            padding: 4rem 4rem 8rem 4rem;
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

                    @media screen and (min-width: $breakpointDesktop) {
                        padding: 4rem;
                    }

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

                        @media screen and (min-width: $breakpointDesktop) {
                            height: 61vh;
                        }

                        @media screen and (min-width: 1280px) {
                            height: 65vh; 
                        }

                        @media screen and (min-width: 1350px) {
                            height: 70vh; 
                        }

                        @media screen and (min-width: 1480px) {
                            height: 75vh; 
                        }

                        @media screen and (min-width: 1750px) {
                            height: 80vh; 
                        }

                        @media screen and (min-width: 1900px) {
                            height: 53rem; 
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