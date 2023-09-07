<template>

    <div class="pageOverlay" v-if="showOverlay"></div>

</template>

<script setup>

    import { ref, onMounted } from 'vue';

    const showOverlay = ref(false);

    onMounted(() => {
        window.addEventListener('show-overlay', () => {
            showOverlay.value = true;
        });
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .pageOverlay {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba($darkColor, .5);
        top: 0;
        z-index: 998;
    }
    
</style>