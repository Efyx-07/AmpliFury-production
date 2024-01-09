<template>

    <div class="supBar">
      <div class="content-wrapper">
        <div v-for="(item, index) in repeatedItems" :key="index" class="content">
            <div class="textIcon-wrapper">
                <p class="text">EVERYTHING STARTS IN A GARAGE</p>
                <Icon icon="ic:sharp-star" class="icon" />
            </div>
            <!-- Ajoute espace à la fin de la boucle -->
            <div class="spacer" v-if="index !== repeatedItems.length - 1"></div> 
        </div>
      </div>
    </div>
    
</template>

<script setup>

import { Icon } from '@iconify/vue';
import { computed } from 'vue';

// repete le contenu 
const repeatCount = 120; 

const repeatedItems = computed(() => {
    const items = [];
    for (let i = 0; i < repeatCount; i++) {
        items.push(i);
    }
    return items;
});

</script>

<style lang="scss" scoped>

@import '@/assets/sass/variables.scss';

// animation

@keyframes scrollAnimation {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}

//styles
.supBar {
    display: flex;
    align-items: center;
    height: 1rem;
    background: $darkColor;
    color: $lightColor;
    .content-wrapper {
        display: flex;
        align-items: center;
        white-space: nowrap;
        animation: scrollAnimation 360s linear infinite;
        .content {
            .textIcon-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
                .text {
                    margin: 0;
                    font-size: .7rem;
                    font-weight: bold;
                }
                .icon {
                    width: .8rem;
                }
            }
            .spacer {
                width: 10px;
            }
        }
    }
}

@media screen and (min-width: $breakpointTablet) {
    .supBar {
        height: 2rem;
        .content-wrapper .content .textIcon-wrapper .text {
            font-size: 1rem; 
        }
    }   
}
        


</style>