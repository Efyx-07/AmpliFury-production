<template>
    <section class="banner">
        <div class="text_container">
            <div class="toplinePart1">
                <h1>UNLEASH</h1>
                <h1>YOUR</h1>
            </div>
            <div class="toplinePart2">
                <h1>MUSICAL</h1>
                <h1>PASSION</h1>
            </div>
        </div>
        <div class="image_container">
            <img src="/src/assets/decoration/gorilla-rocker.png" alt="AmpliFury banner" class="banner-image">
        </div>
    </section>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/variables.scss';
.banner {
    height: calc(100vh - 4rem); // calcul avec soustraction taille header + supBar
    background: $gradientBackground2;
    position: relative;
    .text_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 2rem;
        .toplinePart1, .toplinePart2 {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            h1 {
                margin: 0;
                font-size: 19vw;
                font-weight: 800;
                line-height: .7;
            }
        }
    }
    .image_container {
        position: absolute;
        bottom: 0;
        height: 60%;
        width: 80%;
        display: flex;
        justify-content: center;
    }
}

@media screen and (min-width: $breakpointTablet) {
    .banner {
        height: calc(100vh - 6rem);
        .text_container {
            .toplinePart1, .toplinePart2 {
                flex-wrap: nowrap;
                gap: 1rem;

                h1 {
                    font-size: 12vw;
                }
            }
        }
        .image_container {
            height: 80%;
            width: 100%;
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .banner {
        height: calc(100vh - 8rem);
        .image_container {
            height: 36rem;
            width: 100%;
        }
    }
}
    
</style>