<template>
        <header>
            <SupBar />
            <div class="header-mainbar">
                <Logo class="logo"/>
                <Navbar class="navbar"/>
                <div class="seachBar_clientSpace-wrapper">
                    <SearchBar class="searchbar"/>
                    <ClientSpace class="clientSpace"/>
                </div>
            </div>
        </header>
        
</template>

<script setup>
    import SupBar from '@/sub-components/Supbar.vue';
    import Logo from '@/sub-components/Logo.vue';
    import Navbar from '@/sub-components/Navbar.vue';
    import SearchBar from '@/sub-components/SearchBar.vue';
    import ClientSpace from '@/sub-components/ClientSpace.vue';
</script>

<style scoped lang="scss">
    @import '@/assets/sass/variables.scss';

    header {
        position: sticky;
        top: 0;
        z-index: 99; 
        background: $lightColor;
        box-shadow: $shadow;   
    }
    .header-mainbar {
        width: 1440px;
        height: 96px;
        display: grid;
        grid-template-columns: 1fr 8fr 1fr;
        align-items: center;
        margin: 0 auto;
        padding: .5rem 5rem;
        position: relative;
        .navbar {
            grid-column: 2/-2;
        }
        .seachBar_clientSpace-wrapper {
            grid-column: 3/-1;
            display: flex;
            justify-content: end;
            align-items: center;
            gap: 5rem;
        }
    }
</style>