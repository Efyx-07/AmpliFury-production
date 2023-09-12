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
            <form action="" class="userLogin-form">
                <div class="mail-input_container">
                    <input type="mail">
                    <p>{{ inputMailPlaceholder }}</p>
                </div>
                <div class="password-input_container">
                    <input type="password">
                    <p>{{ inputPasswordPlaceholder }}</p>
                </div>
                <div class="form-checkbox_container">
                    <input type="checkbox"> <p>{{ checkboxMention }}</p>
                </div>
                <div class="login-button_container">
                    <p>{{ loginButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up" 
                        :rotate="1" 
                        class="arrow"
                    />
                </div>
            </form>

            <div class="separator"></div>

            <div class="toRegister_container">
                <p>{{ toRegisterMention }}</p>
                <div class="toRegister-button_container">
                    <p>{{ toRegisterButtonMention }}</p>
                    <Icon 
                        icon="system-uicons:arrow-up" 
                        :rotate="1" 
                        class="arrow"
                    />
                </div>
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

    // datas
    const userLoginTitle = "Customer center login";
    const {inputMailPlaceholder} = useGlobalDataStore();
    const {inputPasswordPlaceholder} = useGlobalDataStore();
    const checkboxMention = "Keep me logged in";
    const loginButtonMention = "Login";
    const toRegisterMention = "Are you new here?";
    const toRegisterButtonMention = "Register"

    // statut par défaut de la visibilité de la fenetre
    const isUserLoginVisible = ref(false);
    
    // permet la fermeture de la fenetre au click sur l'icone
    const closeUserLogin = () => {
        isUserLoginVisible.value = false;
    };

    const closeUserLoginAndOverlay = () => {
        window.dispatchEvent(new Event('hide-overlay2'));
        closeUserLogin();
    };
 
    // ecoute l'événement personnalisé (créé sur 'UserIcon') pour réafficher la fenetre
    onMounted(() => {
        window.addEventListener('show-userLogin', () => {
            isUserLoginVisible.value = true;
        });
        window.addEventListener('hide-overlay2', () => {
            isUserLoginVisible.value = true; 
        });
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

    .hiddenUserLogin {
        transform: translateX(100%);
    }
    .userLogin_container {
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        display: flex;
        justify-content: end;
        box-shadow: -3px 0px 5px #33333341; 
        transition: transform .3s ease-in-out;
        .userLogin {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: $lightColor;

            @media screen and (min-width: $breakpointTablet) {
                width: 31rem;
            }

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top:0;
                z-index: 1;
                background: $lightColor;

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
