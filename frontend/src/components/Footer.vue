<template>
    <div class="footer">
        <div class="highPart">

        </div>
        <Copyright />
        <ToTopButton />
        
    </div>
    
</template>

<script setup>
    import Copyright from '@/sub-components/Copyright.vue';
    import ToTopButton from '@/sub-components/ToTopButton.vue';

    
    

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .footer {
        width: 100%;
        height: 22rem;
        background: $darkColor;
        display: flex;
        flex-direction: column-reverse;
        .highpart {
            height: 17rem;
        }

    }
</style>