<template>

    <div class="accountSettings">

        <h1>{{ accountSettingsTitle }}</h1>

        <form class="edit-form" @submit.prevent="updateProfile">

            <div class="item_container">
                <p class="item-name">{{ inputFirstNamePlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="first_name" 
                        required 
                        id="edit_firstName" 
                        v-model="newFirstName"
                        @input="validateNewFirstName"
                    >
                    <Icon 
                        v-if="newFirstNameValid"
                        :icon="validateIconName"
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newFirstNameValid && newFirstName !== ''">
                    {{errorFieldMessageMention}} {{ inputFirstNamePlaceholder.toLowerCase() }}
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputLastNamePlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="last_name" 
                        required 
                        id="edit_lastName" 
                        v-model="newLastName"
                        @input="validateNewLastName"
                    >
                    <Icon 
                        v-if="newLastNameValid"
                        :icon="validateIconName"  
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newLastNameValid && newLastName !== ''">
                    {{errorFieldMessageMention}} {{ inputLastNamePlaceholder.toLowerCase() }}
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputAddressPlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="address" 
                        required 
                        id="edit_address" 
                        v-model="newAddress"
                        @input="validateNewAddress"
                    >
                    <Icon 
                        v-if="newAddressValid"
                        :icon="validateIconName"  
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newAddressValid && newAddress !== ''">
                    {{errorFieldMessageMention}} {{ inputAddressPlaceholder.toLowerCase() }}
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputPostalCodePlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="number" 
                        name="postalCode" 
                        required 
                        id="edit_postalCode" 
                        v-model="newPostalCode"
                        @input="validateNewPostalCode"
                    >
                    <Icon 
                        v-if="newPostalCodeValid"
                        :icon="validateIconName"  
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newPostalCodeValid && newPostalCode !== ''">
                    {{errorFieldMessageMention}} {{ inputPostalCodePlaceholder.toLowerCase() }}
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputCityPlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="city" 
                        required 
                        id="edit_city" 
                        v-model="newCity"
                        @input="validateNewCity"
                    >
                    <Icon 
                        v-if="newCityValid"
                        :icon="validateIconName" 
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newCityValid && newCity !== ''">
                    {{errorFieldMessageMention}} {{ inputCityPlaceholder.toLowerCase() }} 
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputCountryPlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="country" 
                        required 
                        id="edit_country" 
                        v-model="newCountry"
                        @input="validateNewCountry"
                    >
                    <Icon 
                        v-if="newCountryValid"
                        :icon="validateIconName"  
                        class="validateIcon"
                    />
                </div>
                <p class="error-alert" v-if="!newCountryValid && newCountry !== ''">
                    {{errorFieldMessageMention}} {{ inputCountryPlaceholder.toLowerCase() }} 
                </p>
            </div>

            <div class="item_container">
                <p class="item-name">Current password</p>
                <div class="input-container">
                    <input 
                        type="password" 
                        name="currentPassword" 
                        required 
                        id="currentPassword" 
                        v-model="currentPassword"
                    >
                </div>
                <p class="error-alert" v-if="invalidPassword">
                    {{errorFieldMessageMention}} {{ inputPasswordPlaceholder.toLowerCase() }} 
                </p>
            </div>

            <div class="success-alert" v-if="profileUpdated">
                <p>Profile updated!</p>
                <Icon 
                    v-if="newCountryValid"
                    :icon="validateIconName"  
                    class="validateIcon"
                />
            </div>

            <button class="editForm-button_container" type="submit" v-else>
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
    const editFormButtonMention = 'Save changes';

    const {
        inputFirstNamePlaceholder,
        inputLastNamePlaceholder,
        inputAddressPlaceholder,
        inputPostalCodePlaceholder,
        inputCityPlaceholder,
        inputCountryPlaceholder,
        inputPasswordPlaceholder,
        errorFieldMessageMention,
        validateIconName,
    } = useGlobalDataStore();

    const userStore = useUserStore();

    // ref par défaut des données de l'utilisateur connecté
    const userData = ref(userStore.userData);
    const currentPassword = ref('');
    const newFirstName = ref(userStore.firstName); 
    const newLastName = ref(userStore.lastName);
    const newAddress = ref(userStore.address);
    const newPostalCode = ref(userStore.postalCode);
    const newCity = ref(userStore.city);
    const newCountry = ref(userStore.country);

    // états de validation
    const newFirstNameValid = ref(true);
    const newLastNameValid = ref(true);
    const newAddressValid = ref(true);
    const newPostalCodeValid = ref(true);
    const newCityValid = ref(true);
    const newCountryValid = ref(true);

    // RegExp
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const alphanumericRegex = /^[A-Za-z0-9, \-'’]+$/;
    const numericRegex = /^[0-9]*$/;

    // fonctions de validation pour chaque champ
    const validateNewFirstName = () => {
        newFirstNameValid.value = nameTypeRegex.test(newFirstName.value);
    };
    const validateNewLastName = () => {
        newLastNameValid.value = nameTypeRegex.test(newLastName.value);
    };
    const validateNewAddress = () => {
        newAddressValid.value = alphanumericRegex.test(newAddress.value);
    };
    const validateNewPostalCode = () => {
        newPostalCodeValid.value = numericRegex.test(newPostalCode.value);
    };
    const validateNewCity = () => {
        newCityValid.value = nameTypeRegex.test(newCity.value);
    };
    const validateNewCountry = () => {
        newCountryValid.value = nameTypeRegex.test(newCountry.value);
    };

    // définition variable pour gérer message erreur du password
    const invalidPassword = ref(false);

    // définition variable pour gérer message succés mise à jour profil
    const profileUpdated = ref(false);

    // gére la durée d'affichage du message de succés validation formulaire
    const successMessageDuration = 500; 

    // valide le formulaire changement nom et adresse
    const updateProfile = async () => {

        const currentPasswordValue = currentPassword.value

        // valide chaque champ individuellement
        validateNewFirstName();
        validateNewLastName();
        validateNewAddress();
        validateNewPostalCode();
        validateNewCity();
        validateNewCountry();

        // détermine les champs valides pour soumettre le formulaire

        const validFields = 
            newFirstNameValid.value &&
            newLastNameValid.value &&
            newAddressValid.value &&
            newPostalCodeValid.value &&
            newCityValid.value &&
            newCountryValid.value;

        if (validFields) {

            try {
                // récupère le token du local storage
                const token = localStorage.getItem('token'); 

                if (!token) {
                    console.error('Token is not defined'); // affiche un message d'erreur si le token n'est pas défini
                    return;
                }

                const response = await fetch('http://localhost:3000/users/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // utilise le token dans l'en-tête de la requête
                    },
                    body: JSON.stringify({
                        firstName: newFirstName.value,
                        lastName: newLastName.value,
                        address: newAddress.value,
                        postalCode: newPostalCode.value,
                        city: newCity.value,
                        country: newCountry.value,
                        password: currentPasswordValue,
                    }),
                });

                if (response.ok) {

                    // met à jour les nouvelles données  dans le store
                    userStore.setUserData({ 
                        ...userStore.userData, 
                        firstName: newFirstName.value, 
                        lastName: newLastName.value,
                        address: newAddress.value,
                        postalCode: newPostalCode.value,
                        city: newCity.value,
                        country: newCountry.value,
                    });

                    // affiche le message d'inscription réussie ici
                    const data = await response.json();

                    // message de succés si le formulaire est validé
                    console.log(data.message); // affiche le message dans la console
                    profileUpdated.value = true;

                    setTimeout(() => {
                        profileUpdated.value = false;
                    }, successMessageDuration);

                } else {
                    if (response.status === 401) {
                        // message d'erreur si la vérification du password échoue
                        console.error('Invalid password');
                        invalidPassword.value = true;
                    } else {
                        // affiche un message d'erreur à l'utilisateur.
                        console.error('Erreur lors de la mise à jour:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour: ', error);
            }
        }
    };

    // charge userData depuis le localStorage avant de rendre le composant avec méthode du store
    onMounted(async() => {

        await userStore.loadUserDataFromLocalStorage();

        if(userStore.userData) {
            userData.value = userStore.userData;
            newFirstName.value = userStore.userData.firstName;
            newLastName.value = userStore.userData.lastName;
            newAddress.value = userStore.userData.address;
            newPostalCode.value = userStore.userData.postalCode;
            newCity.value = userStore.userData.city;
            newCountry.value = userStore.userData.country;
        };
    });

    // surveille les changements de userData dans le store et met à jour userData
    watch(() => userStore.userData, (newUserData) => {
        userData.value = newUserData;
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
                    font-size: 1rem;

                    @media screen and (min-width: $breakpointDesktop) {
                        height: 3.5rem;
                    }
                }
                .validateIcon{
                    font-size: 1rem;
                    position: absolute;
                    top: 50%;
                    right: 1rem;
                    transform: translateY(-50%);
                    color: $greenColor;
                }
            }
            .error-alert {
                margin: 0;
                color: $redColor;
                align-self: self-end;
            }
        }
        .success-alert {
           display: flex; 
           align-items: center;
           gap: 1rem;
           background: rgba($lightColor,.5);
           padding: 0 1rem;
           border-radius: $containerBorderRadius + 15px;
           margin-top: 1rem;
           
           p {
            margin: 0;
           }
           .validateIcon {
            color: $greenColor;
           }
           p, .validateIcon {
            font-size: 1.5rem;

            @media screen and (min-width: $breakpointDesktop) {
                font-size: 2rem;
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
            margin-top: 1rem;
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