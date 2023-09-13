<template>
    <section class="banner">
        <div class="banner-text_container">
            <div class="toplinePart1">
                <h1>{{ toplinePart1Word1 }}</h1>
                <h1>{{ toplinePart1Word2 }}</h1>
            </div>
            <div class="toplinePart2">
                <h1>{{ toplinePart2Word1 }}</h1>
                <h1>{{ toplinePart2Word2 }}</h1>
            </div>
        </div>
        <div class="banner-image_container">
            <img :src="image.source" :alt="image.alt" class="banner-image">
        </div>
    </section>
</template>

<script setup>
    const image = {
        source: "/src/assets/decoration/gorilla-rocker.png",
        alt: "AmpliFury banner"
    };
    const toplinePart1Word1 = "UNLEASH";
    const toplinePart1Word2 = "YOUR";
    const toplinePart2Word1 = "MUSICAL";
    const toplinePart2Word2 = "PASSION";


</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    .banner {
        height: calc(100vh - 4rem);
        background: $gradientBackground2;
        position: relative;

        @media screen and (min-width: $breakpointTablet) {
            height: calc(100vh - 6rem);
        }

        @media screen and (min-width: $breakpointDesktop) {
            height: calc(100vh - 8rem);
        }
        .banner-text_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 2rem;
            .toplinePart1, .toplinePart2 {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;

                @media screen and (min-width: $breakpointTablet) {
                    flex-wrap: nowrap;
                    gap: 1rem;
                }

                h1 {
                    margin: 0;
                    font-size: 19vw;
                    font-weight: 800;
                    line-height: .7;

                    @media screen and (min-width: $breakpointTablet) {
                        font-size: 12vw;
                    }
                }

            }

        }

        &-image_container {
            position: absolute;
            bottom: 0;
            height: 60%;
            width: 80%;
            display: flex;
            justify-content: center;

            @media screen and (min-width: $breakpointTablet) {
                height: 80%;
                width: 100%;
            }

            @media screen and (min-width: $breakpointDesktop) {
                height: 36rem;
                width: 100%;
            }
        }
    }
    
</style>