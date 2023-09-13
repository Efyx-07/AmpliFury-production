<template>

    <div class="userIcon_container">
        <Icon icon="icon-park-outline:right-user" class="customerIcon userIcon"/>
        <div class="userIcon-badge"></div>
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .userIcon_container {
        position: relative;
        cursor: pointer;
        .userIcon {
            color: $darkColor;
            font-size: $mobileIconSize1;

            @media screen and (min-width: $breakpointTablet) {
                font-size: $tabletIconSize1;
            }

            @media screen and (min-width: $breakpointDesktop) {
                font-size: $desktopIconSize1;
            }
        }
    }
    
</style>