<template>
    <nav>
        <ul :class="navbarClasses">
            <li>
                <router-link to="/categories" class="navButton_container" :class="navButtonContainerClasses" @click="handleNavButtonClick"> <!-- relie le 1er bouton à la route Categories -->
                    <div class="potentiometer-icon" :class="potentiometerIconClasses">
                        <div class="potentiometer-icon-bar" :class="potentiometerIconBarClasses"></div>
                    </div>
                    <p :class="navButtonNameClasses">{{ defaultButtonName }}</p>
                </router-link>
            </li>
            <li v-for="category in categories" :key="category.name">
                <router-link v-if="categories.length > 0" :to="`/categories/${category.name}`" class="navButton_container" :class="navButtonContainerClasses" @click="handleNavButtonClick"> <!-- relie les autres boutons à leur route dynamique respective (categorie filtrée) -->
                    <div class="potentiometer-icon" :class="potentiometerIconClasses">
                        <div class="potentiometer-icon-bar" :class="potentiometerIconBarClasses"></div>
                    </div>
                    <p :class="navButtonNameClasses">{{ category.name }}</p> <!-- donne le nom des categories respectives aux boutons -->
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

    // importe les datas du catalogue géré par le store Pinia
    import { useCatalogueStore } from '@/stores/CatalogueStore';
    import { computed } from 'vue';
    
    const catalogueStore = useCatalogueStore();
    const categories = catalogueStore.categories;
    console.log(categories.length)

    // datas
    const defaultButtonName = "All products";

    // recupération des props définies dans les composants parents
    const props = defineProps({
        parentComponent: String,
        closeBurgerMenu: Function
    });

    // gestion des classes conditionnelles
    const navbarClasses = computed(() => ({
        'navbar-header': props.parentComponent === 'header',
        'navbar-burgermenu': props.parentComponent === 'burgermenu'
    }));

    const navButtonContainerClasses = computed(() => ({
        'navButtonContainer-header': props.parentComponent === 'header',
        'navButtonContainer-burgermenu': props.parentComponent === 'burgermenu'
    }));

    const potentiometerIconClasses = computed(() => ({
        'potentiometerIcon-header': props.parentComponent === 'header',
        'potentiometerIcon-burgermenu': props.parentComponent === 'burgermenu'
    }));

    const potentiometerIconBarClasses = computed(() => ({
        'potentiometerIconBar-header': props.parentComponent === 'header',
        'potentiometerIconBar-burgermenu': props.parentComponent === 'burgermenu'
    }));

    const navButtonNameClasses = computed(() => ({
        'navButtonName-header': props.parentComponent === 'header',
        'navButtonName-burgermenu': props.parentComponent === 'burgermenu'
    }));

    // récupération via props de la fonction closeBurgerMenu definie dans composant parent BurgerMenu
    const handleNavButtonClick = () => {
        if(props.parentComponent === 'burgermenu') { // n'active la fonction que quand le composant parent est BurgerMenu
            props.closeBurgerMenu();
        };
    };
  
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    .navbar-header {
        list-style-type: none;
        display: flex;
        justify-content: center;
        gap: 3rem;

        li {
            .navButtonContainer-header {
                text-decoration: none;
                display: flex;
                flex-direction: column;
                gap:.3rem;
                align-items: center;
                cursor: pointer;

                .potentiometerIcon-header {
                    width: 30px;
                    height: 30px;
                    background: $darkColor;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    transition: all .3s ease-in-out;
                    .potentiometerIconBar-header {
                        width: 3px;
                        height: 15px;
                        background: $lightColor;
                    }
                }
                .navButtonName-header {
                    margin: 0;
                    font-weight: 400;
                    color: $darkColor;
                }
                &:hover > .potentiometerIcon-header {
                    transform: rotate(120deg);
                }
            }
        }
    }
    .navbar-burgermenu {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3rem;

        li {
            .navButtonContainer-burgermenu {
                text-decoration: none;
                display: flex;
                gap:1rem;
                align-items: center;
                cursor: pointer;

                .potentiometerIcon-burgermenu {
                    width: 30px;
                    height: 30px;
                    background: $darkColor;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    transition: all .3s ease-in-out;
                    .potentiometerIconBar-burgermenu {
                        width: 3px;
                        height: 15px;
                        background: $lightColor;
                    }
                }
                .navButtonName-burgermenu {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: $darkColor;
                }
                &:hover > .potentiometerIcon-burgermenu {
                    transform: rotate(120deg);
                }
            }
        }
    }
</style>