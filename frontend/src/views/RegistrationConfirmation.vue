<template >

    <div class="registration-confirmation">

        <h1>Registration Successfull !!!</h1>
        <Icon icon="ooui:success" class="successIcon"/>
        <!-- ouvre la modale UserLogin -->
        <div class="loginButton_container" @click="toggleUserLoginVisibility">
            <p>{{ loginButtonMention }} {{ loginButtonMentionPart2 }}</p>
            <Icon 
                icon="system-uicons:arrow-up"
                :rotate="1" 
                class="arrow"
            />
        </div>
        
    </div>

</template>

<script setup>

    import { Icon } from '@iconify/vue';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';

    const {loginButtonMention} = useGlobalDataStore();
    const loginButtonMentionPart2 = 'to your account';

    // récupère l'évènement personnalisé créé dans UserIcon et permet l'ouverture de la modale UserLogin
    const toggleUserLoginVisibility = () => {
        const showUserLoginEvent = new Event('show-userLogin');
        window.dispatchEvent(showUserLoginEvent);

        const showOverlayEvent = new Event('show-overlay');
        window.dispatchEvent(showOverlayEvent);
    };

</script>

<style lang="scss" scoped>
    
    @import '@/assets/sass/variables.scss';

    .registration-confirmation {
      padding: 2rem 1rem 3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background: $gradientBackground2;
      position: relative;
      min-height: 75vh;

      @media screen and (min-width: $breakpointTablet) {
        padding: 2rem 2rem 4rem 2rem;
        min-height: 80vh;
      }

      @media screen and (min-width: $breakpointDesktop) {
        padding: 4rem 4rem 8rem 4rem;
        gap: 4rem;
        height: unset;
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
      .successIcon {
        color: $greenColor;
        font-size: 2.5rem;

        @media screen and (min-width: $breakpointTablet) {
            font-size: 3.5rem;
        }

        @media screen and (min-width: $breakpointDesktop) {
            font-size: 4rem;
        }
      }
      .loginButton_container {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            text-decoration: none;
            color: $darkColor;
            p, .arrow {
                font-size: 1.25rem;

                @media screen and (min-width: $breakpointTablet) {
                    font-size: 2rem;
                }
            }
        }
    }

</style>