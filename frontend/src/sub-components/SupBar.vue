<template>

    <div class="supBar">
      <div class="supBar-content">
        <template v-for="(item, index) in repeatedItems" :key="index">
            <div class="supBar-textIcon-wrapper">
                <p class="supBar-text">{{ supBarText }}</p>
                <Icon icon="ic:sharp-star" class="supBar-icon" />
            </div>
            <div class="spacer" v-if="index !== repeatedItems.length - 1"></div>
        </template>
      </div>
    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    // datas
    const supBarText = 'EVERYTHING STARTS IN A GARAGE';

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

    .supBar {
        display: flex;
        align-items: center;
        height: 1rem;
        background: $darkColor;
        color: $lightColor;

        @media screen and (min-width: $breakpointTablet) {
            height: 2rem;
        }

        &-content {
            display: flex;
            align-items: center;
            white-space: nowrap;
            animation: scrollAnimation 360s linear infinite;
        }

        &-textIcon-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &-text {
            margin: 0;
            font-size: .7rem;
            font-weight: bold;

            @media screen and (min-width: $breakpointTablet) {
                font-size: 1rem;
            }
        }

        &-icon {
            width: .8rem;
        }
        .spacer {
            width: 10px;
        }
    }

    @keyframes scrollAnimation {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }

</style>