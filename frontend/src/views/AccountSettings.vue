<template>

    <div class="accountSettings">

        <h1>{{ accountSettingsTitle }}</h1>

        <form class="edit-form" @submit.prevent="updateProfile">

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputFirstNamePlaceholder }}: <span>{{ userData.firstName }}</span></p>
                <div class="input-container">
                    <input type="text" name="first_name" required id="edit_firstName" v-model="newFirstName">
                    <button type="button" @click="editFirstName">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputLastNamePlaceholder }}: <span>{{ userData.lastName }}</span></p>
                <div class="input-container">
                    <input type="text" name="last_name" required id="edit_firstName" v-model="newLastName">
                    <button type="button" @click="editLastName">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>
            
            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputAddressPlaceholder }}: <span>{{ userData.address }}</span></p>
                <div class="input-container">
                    <input type="text" name="address" required id="edit_address" v-model="newAddress">
                    <button type="button" @click="editAddress">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputPostalCodePlaceholder }}: <span>{{ userData.postalCode }}</span></p>
                <div class="input-container">
                    <input type="text" name="postalCode" required id="edit_postalCode" v-model="newPostalCode">
                    <button type="button" @click="editPostalCode">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputCityPlaceholder }}: <span>{{ userData.city }}</span></p>
                <div class="input-container">
                    <input type="text" name="city" required id="edit_city" v-model="newCity">
                    <button type="button" @click="editCity">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputCountryPlaceholder }}: <span>{{ userData.country }}</span></p>
                <div class="input-container">
                    <input type="text" name="country" required id="edit_country" v-model="newCountry">
                    <button type="button" @click="editCountry">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p v-if="userData" class="item-name">{{ inputMailPlaceholder }}: <span>{{ userData.email }}</span></p>
                <div class="input-container">
                    <input type="text" name="email" required id="edit_email" v-model="newEmail">
                    <button type="button" @click="editEmail">
                        <p>{{ editButtonMention }}</p>
                        <Icon 
                            icon="system-uicons:arrow-up" 
                            :rotate="1" 
                            class="arrow"
                        />
                    </button>
                </div>
            </div>

            <div class="item_container">
                <p class="item-name">Current Password:</p>
                <div class="input-container">
                    <input type="password" name="currentPassword" required id="currentPassword" v-model="currentPassword">
                </div>
            </div>

            <div class="item_container">
                <p class="item-name">New Password:</p>
                <div class="input-container">
                    <input type="password" name="newPassword" required id="newPassword" v-model="newPassword">
                </div>
            </div>

            <div class="item_container">
                <p class="item-name">Confirm New Password:</p>
                <div class="input-container">
                    <input type="password" name="confirmNewPassword" required id="confirmNewPassword" v-model="confirmNewPassword">
                </div>
            </div>

            <button class="editForm-button_container" type="submit">
                <p>{{ editFormButtonMention }}</p>
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

    import { useUserStore } from '@/stores/UserStore';
    import { useGlobalDataStore } from '@/stores/GlobalDataStore';
    import { ref, onMounted, watch } from 'vue';
    import { Icon } from '@iconify/vue';

    // datas
    const accountSettingsTitle = 'Account settings';
    const editButtonMention = 'Modify';
    const editFormButtonMention = 'Submit';

    const {
        inputFirstNamePlaceholder,
        inputLastNamePlaceholder,
        inputAddressPlaceholder,
        inputPostalCodePlaceholder,
        inputCityPlaceholder,
        inputCountryPlaceholder,
        inputMailPlaceholder,
        inputPasswordPlaceholder,
        inputConfirmPasswordPlaceholder,
        registerButtonMention,
    } = useGlobalDataStore();

    const userStore = useUserStore();

    // ref par défaut des données de l'utilisateur connecté
    const userData = ref(null);

    // charge userData depuis le localStorage avant de rendre le composant avec méthode du store
    onMounted(async() => {
        await userStore.loadUserDataFromLocalStorage();
    });

    // surveille les changements de userData dans le store et met à jour userData
    watch(() => userStore.userData, (newUserData) => {
        userData.value = newUserData;
        console.log(userData)
    });

</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .accountSettings {
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
      .edit-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        .item_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 55rem;
            gap: .5rem;

            .item-name {
                margin: 0;
                align-self: self-start;

                @media screen and (min-width: $breakpointDesktop) {
                    font-size: 1.2rem;
                }

                span {
                    font-weight: 600;
                }
            }
            .input-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                gap: .5rem;

                input {
                    width: 100%;
                    height: 3rem;
                    background: $lightColor;
                    border: none;

                    @media screen and (min-width: $breakpointDesktop) {
                        height: 3.5rem;
                    }
                }

                button {
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: 50%;
                    right: 1rem;
                    transform: translateY(-50%);
                    background: $accentColor;
                    color: $darkColor;
                    border: none;
                    padding: .5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    p, .arrow {
                        margin: 0;
                        font-weight: 600;
                    }
                }
            }
        }

        .editForm-button_container {
            display: flex;
            align-items: center;
            text-decoration: none;
            background: none;
            border: none;
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