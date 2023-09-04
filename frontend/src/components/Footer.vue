<template>
    <div class="footer">
        <div class="highPart">

        </div>
        <Copyright />
        
    </div>
    
</template>

<script setup>
    import Copyright from '@/sub-components/Copyright.vue';
    
    

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
        .lowpart {
            background: $lightColor;
            height: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                margin: 0;
                font-size: 1.5rem;
            }
        }
    }
</style>