<template>

    <div class="registerPage">

        <h1>{{ registerPageTitle }}</h1>

        <form action="" class="registration-form" @submit.prevent="validate">

            <div class="input_container">
                <input type="text" name="first_name" id="registration_firstName" v-model="firstName">
                <p>{{ inputFirstNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="last_name" id="registration_lastName" v-model="lastName">
                <p>{{ inputLastNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="email" name="email" id="registration_email" v-model="email">
                <p>{{ inputMailPlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="password" name="password" id="registration_password" v-model="password">
                <p>{{ inputPasswordPlaceholder }}</p>
            </div>

            <button class="login-button_container" type="submit">
                <p>{{ registerButtonMention }}</p>
                <Icon 
                    icon="system-uicons:arrow-up" 
                    :rotate="1" 
                    class="arrow"
                />
            </button>
            
        </form>

    </div>
    
</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    // datas
    const registerPageTitle = "Register";
    const {inputFirstNamePlaceholder} = useGlobalDataStore();
    const {inputLastNamePlaceholder} = useGlobalDataStore();
    const {inputMailPlaceholder} = useGlobalDataStore();
    const {inputPasswordPlaceholder} = useGlobalDataStore();
    const {registerButtonMention}= useGlobalDataStore();


    
</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .registerPage {
      padding: 2rem 1rem 3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      background: $accentColor;

      @media screen and (min-width: $breakpointTablet) {
        padding: 2rem 2rem 4rem 2rem;
      }

      @media screen and (min-width: $breakpointDesktop) {
        padding: 4rem 4rem 8rem 4rem;
        gap: 4rem;
      }

      h1 {
          margin: 0;
          font-size: 2.5rem;

          @media screen and (min-width: $breakpointTablet) {
            font-size: 3rem;
          }

          @media screen and (min-width: $breakpointDesktop) {
            font-size: clamp(4rem, 6vw, 6rem);
            line-height: 1;
          }

      }
      .registration-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        .input_container {
            width: 100%;
            max-width: 55rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            input {
                width: 100%;
                height: 3rem;
                background: $lightColor;
                border: none;

                @media screen and (min-width: $breakpointDesktop) {
                    height: 3.5rem;
                }
            }

            p {
                position: absolute;
                margin: 0;
                font-size: .7rem;
                top: -.3rem;
                left: 0;
                background: $ultraLightColor;
                padding: 0 1rem;
                border-radius: 0 0 $containerBorderRadius 0;
                box-shadow: $shadow;

                @media screen and (min-width: $breakpointDesktop) {
                    font-size: .8rem;
                }
            }
        }
        .login-button_container {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: $darkColor;
            padding-top: 1rem;
            cursor: pointer;
            p, .arrow {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 300;

                @media screen and (min-width: $breakpointDesktop) {
                    font-size: 2rem;
                }
            }
        }
      }

    }
    
</style>
