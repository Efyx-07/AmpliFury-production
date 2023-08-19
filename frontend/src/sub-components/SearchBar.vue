<template>
    <div class="searchBar-container">
        <Icon icon="carbon:search" width="20" class="searchBar-icon"/>
        <input type="search" placeholder= "Search">
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue';
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    .searchBar-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 40px;
        background: $ultraLightColor;
        border-radius: 15px;
        padding: 0 0 0 1rem;

        & .searchBar-icon {
            color: $darkColor;
        }

        & input {
            width: 100%;
            height: 100%;
            border-radius: 15px;
            border: none;
            background: transparent;

            &::placeholder {
                text-align: center;
                font-size: 1rem;
                margin-left: 20px;
            }
        }
    }
</style>