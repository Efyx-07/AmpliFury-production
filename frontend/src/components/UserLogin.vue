<template>
    
    <div class="userLogin_container" :class="{ hiddenUserLogin: !isUserLoginVisible }">

        <div class="userLogin">
            <div class="userLogin-header">
                <h1>{{ userLoginTitle }}</h1> 
                <Icon 
                    icon="carbon:close" 
                    width="40" 
                    class="closeIcon" 
                    @click="closeUserLoginAndOverlay"
                />
            </div>
            <form action="" class="userLogin-form" @submit.prevent="handleLogin">
                <div class="input_container">
                    <input type="email" name="email" id="userLogin_email" v-model="email">
                    <p>{{ inputMailPlaceholder }}</p>
                </div>
                <div class="input_container">
                    <input type="password" name="password" id="userLogin_password" v-model="password">
                    <p>{{ inputPasswordPlaceholder }}</p>
                </div>
                <div class="form-checkbox_container">
                    <input type="checkbox"> 
                    <p>{{ checkboxMention }}</p>
                </div>
                <button class="login-button_container" type="submit">
                    <p>{{ loginButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up" 
                        :rotate="1" 
                        class="arrow"
                    />
                </button>
            </form>

            <div class="separator"></div>

            <div class="toRegister_container">
                <p>{{ toRegisterMention }}</p>
                <router-link to="/register" class="toRegister-button_container" @click="closeUserLoginAndOverlay">
                    <p>{{ registerButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up" 
                        :rotate="1" 
                        class="arrow"
                    />
                </router-link>
            </div>
        </div>
        
    </div>

    <Overlay 
        :showOverlay="isUserLoginVisible" 
        class="pageOverlay" 
        v-show="isUserLoginVisible" 
    >
    </Overlay>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import Overlay from '@/components/Overlay.vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/UserStore';

    // datas
    const userLoginTitle = "Customer center login";
    const {inputMailPlaceholder} = useGlobalDataStore();
    const {inputPasswordPlaceholder} = useGlobalDataStore();
    const checkboxMention = "Keep me logged in";
    const {loginButtonMention} = useGlobalDataStore();
    const toRegisterMention = "Are you new here?";
    const {registerButtonMention}= useGlobalDataStore();

    // statut par défaut de la visibilité de la fenetre
    const isUserLoginVisible = ref(false);
    
    // permet la fermeture de la fenetre au click sur l'icone
    const closeUserLogin = () => {
        isUserLoginVisible.value = false;
    };

    // déclenche evenement personnalisé 'hide-overlay3' et ferme fenetre userLogin
    const closeUserLoginAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay3'));
        closeUserLogin();
    };
 
    // ecoute l'événement personnalisé (créé sur 'UserIconLoggedOut') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-userLogin', () => {
            isUserLoginVisible.value = true;
        });
        window.addEventListener('hide-overlay3', () => {
            isUserLoginVisible.value = true; 
        });
    });

    // propriétés du formulaire
    const email = ref('');
    const password = ref('');

    const router = useRouter();
    const userStore = useUserStore();

    // valide le formulaire
    const handleLogin = async () => {
        // extrait les valeurs des objets ref
        const emailValue = email.value;
        const passwordValue = password.value;

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            if (response.ok) {
                // connexion réussie, redirection vers une page de confirmation
                router.push('/'); 

                // récupère les données de l'utilisateur depuis la reponse du serveur et affiche le message de connexion reussie
                const data = await response.json();
                console.log(data.message); 
                userStore.setUserData(data.user);

                // si connexion réussie, obtient le token du server et le stocke dans le localStorage
                const token = data.token;
                localStorage.setItem('token', token);

                // stocke également le token dans le store Pinia
                userStore.setToken(token);
                userStore.isConnected = true; // l'utilisateur est connecté
                
            } else {
                console.error('Erreur lors de la connexion :', response.statusText);
            }
        } catch (error) { 
            console.error('Erreur lors de la connexion: ', error);
        }
    };

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .hiddenUserLogin { // nommage unique pour eviter conflit avec classe des composants similaires
        transform: $hiddenModalTransform;
    }
    .userLogin_container {
        @include modalSettings;
        display: flex;
        justify-content: end;
        .userLogin {
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
        .userLogin-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            .input_container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding: 0 2rem;

                input {
                    width: 100%;
                    height: 3rem;
                    background: $ultraLightColor;
                    border: none;
                }

                p {
                    position: absolute;
                    margin: 0;
                    font-size: .7rem;
                    top: -.3rem;
                    left: 2rem;
                    background: $ultraLightColor;
                    padding: 0 1rem;
                    border-radius: 0 0 $containerBorderRadius 0;
                    box-shadow: $shadow;
                }
            }
            .form-checkbox_container {
                display: flex;
                gap: .5rem;

                p {
                    margin: 0;
                }
            }
            .login-button_container {
                display: flex;
                align-items: center;
                background: none;
                border: none;
                cursor: pointer;
                p, .arrow {
                    margin: 0;
                    font-size: 1.5rem;
                }
            }
        }
        .separator {
            height: 1px;
            width: 75%;
            background: $darkColor;
        }
        .toRegister_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            p {
                margin: 0;
                font-size: 1.2rem;
            }
            .toRegister-button_container {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: $darkColor;
                p, .arrow {
                    margin: 0;
                    font-size: 1.5rem;
                }
            }
        }
    }
    
</style>
