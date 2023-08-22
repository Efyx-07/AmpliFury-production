<template>
    <section class="banner">
        <div class="banner-section_content">
            <div class="banner-container">
                <img :src="image.source" :alt="image.alt" class="banner-image">
                <div class="banner-overlay"></div>
                <div class="banner-text_container">
                    <h1 class="banner-topline">{{ toplinePart1 }} <br> {{ toplinePart2 }}</h1>
                    <h3 class="banner-hashtag">{{ hashtag }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const image = {
        source: "/src/assets/decoration/monkey band.jpg",
        alt: "AmpliFury banner"
    };
    const toplinePart1 = "UNLEASH YOUR";
    const toplinePart2 = "MUSICAL PASSION";
    const hashtag = "#EverythingStartsInAGarage";

</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';
    .banner {
        padding: 3rem 0rem;
        display: flex;
        justify-content: center;

        &-section_content {
            @include desktopSectionContentWidth;
        }

        &-container {
            width: 100%;
            height: 38rem;
            display: inline-block;
            position: relative;
        }

        &-image {
            width: 100%;
            height: 100%;
            border-radius: $containerBorderRadius;
            display: block;
            object-fit: cover;
            position: absolute;
        }

        &-overlay {
            background: #1a1a1a;
            opacity: .5;
            width: 100%;
            height: 100%;
            border-radius: $containerBorderRadius;
            position: absolute;
        }

        &-text_container {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            color: $lightColor;
        }

        &-topline {
            color: $ultraLightColor;
            font-size: 6rem;
            font-weight: 800;
            text-align: center;
            line-height: 1;
            margin: 0;
        }

        &-hashtag {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 400;
        }
    }
</style>