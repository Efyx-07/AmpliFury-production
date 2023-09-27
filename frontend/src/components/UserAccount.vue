<template>
    <div class="userAccount_container" :class="{ hiddenUserAccount: !isUserAccountVisible }">
        <div class="userAccount">
            <div class="userAccount-header">
                <h1>{{ userAccountTitle }}</h1> 
                <Icon 
                    icon="carbon:close" 
                    width="40" 
                    class="closeIcon" 
                    @click="closeUserAccountAndOverlay"
                />
            </div>
            can:<br>
            <router-link to="/account-settings"> Modify account </router-link>
            <br>
            <router-link to="/account-settings"> Remove account </router-link>
            <br>
            <button class="signOut-button_container" type="submit" @click="handleSignOut">
                <p>{{ signOutButtonMention }}</p>
                <Icon 
                    icon="system-uicons:arrow-up" 
                    :rotate="1" 
                    class="arrow"
                />
            </button>

            <div class="user-infos_container">
                <p v-if="userData">{{ userData.firstName }} {{ userData.lastName }}</p>
            </div>
        </div>
        
    </div>

    <Overlay 
        :showOverlay="isUserAccountVisible" 
        class="pageOverlay" 
        v-show="isUserAccountVisible" 
    >
    </Overlay>
</template>
<script setup>

    import { Icon } from '@iconify/vue';
    import Overlay from '@/components/Overlay.vue';
    import { ref, onMounted, watch } from 'vue';
    import { useUserStore } from '@/stores/UserStore';

    //datas
    const userAccountTitle = 'Your account';
    const signOutButtonMention = 'Sign out';

    // statut par défaut de la visibilité de la fenetre
    const isUserAccountVisible = ref(false);

    // permet la fermeture de la fenetre au click sur l'icone
    const closeUserAccount = () => {
        isUserAccountVisible.value = false;
    };

    // déclenche evenement personnalisé 'hide-overlay4' et ferme fenetre userLogin
    const closeUserAccountAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay4'));
        closeUserAccount();
    };

    // ecoute l'événement personnalisé (créé sur 'UserIconLogged') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-userAccount', () => {
            isUserAccountVisible.value = true;
        });
        window.addEventListener('hide-overlay4', () => {
            isUserAccountVisible.value = true; 
        });
    });

    const userStore = useUserStore();

    // gère le bouton de deconnexion
    const handleSignOut = () => {
        localStorage.removeItem('token') // supprime le token du localStorage
        localStorage.removeItem('userData');// supprime les données utilisateur du localStorage
        userStore.clearToken(); // reinitialise le store 
        userStore.isConnected = false; // l'utilisateur est connecté
        closeUserAccountAndOverlay(); // ferme fenetre et overlay
    };

    // ref par défaut des données de l'utilisateur connecté
    const userData = ref(null);

    // charge userData depuis le localStorage avant de rendre le composant avec méthode du store
    onMounted(async() => {
        await userStore.loadUserDataFromLocalStorage();
    });

    // surveille les changements de userData dans le store et met à jour userData
    watch(() => userStore.userData, (newUserData) => {
        userData.value = newUserData;
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .hiddenUserAccount { // nommage unique pour eviter conflit avec classe des composants similaires
        transform: $hiddenModalTransform;
    }
    .userAccount_container {
        @include modalSettings;
        display: flex;
        justify-content: end;
        .userAccount {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: $lightColor;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5rem;
            background: $accentColor;

            @media screen and (min-width: $breakpointTablet) {
                width: 31rem;
            }

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

                h1 {
                    font-size: 2rem;
                    font-weight: 600;
                    margin: 0;
                    line-height: 1;
                    padding: 2rem;
                }
                .closeIcon {
                    cursor: pointer;
                    transition: transform .2s ease-in-out;

                    &:hover {
                        transform: rotate(90deg);
                    }
                }

            }
        }
    }


    
</style>