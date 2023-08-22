<template>
    <section class="environmentCare">
        <div class="environmentCare-content">
            <div class="environmentCare-content_container">
                <img :src="image.source" :alt="image.alt" class="environmentCare-image">
                <div class="environmentCare-text_container">
                    <h1>{{ textTitle }}</h1>
                    <p> {{ text }}</p>
                </div>
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
    @import '@/assets/sass/mixins.scss';
    .environmentCare {
        padding: 5rem 0rem;
        display: flex;
        justify-content: center;

        &-content {
            @include desktopSectionContentWidth;

            &_container {
                width: 100%;
                height: 38rem;
                display: grid;
                grid-template-columns: 1fr 2fr;
                position: relative;
                border: solid 2px $darkColor;
                border-radius: $containerBorderRadius;
                .environmentCare-image {
                    position: absolute;
                    bottom: 2rem;
                    width: auto;
                    height: 44rem;
                }
                .environmentCare-text_container {
                    grid-column: 2 / -1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 2rem;
                    padding-right: 2rem;

                    h1 {
                        margin: 0;
                        font-size: 6rem;
                        white-space: nowrap;
                    }

                    p {
                        margin: 0;
                        font-size: 2rem;
                        font-weight: 300;
                        text-align: justify;
                    }
                }
            }
        }
    }
</style>