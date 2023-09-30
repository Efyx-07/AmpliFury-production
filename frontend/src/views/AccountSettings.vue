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
                </div>
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
                </div>
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
                </div>
            </div>

            <div class="item_container">
                <p class="item-name">{{ inputPostalCodePlaceholder }}</p>
                <div class="input-container">
                    <input 
                        type="text" 
                        name="postalCode" 
                        required 
                        id="edit_postalCode" 
                        v-model="newPostalCode"
                        @input="validateNewPostalCode"
                    >
                </div>
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
                </div>
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
                </div>
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
    import { useRouter } from 'vue-router';

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
     /* inputMailPlaceholder,
        inputPasswordPlaceholder,
        inputConfirmPasswordPlaceholder, */
    } = useGlobalDataStore();


    const router = useRouter();
    const userStore = useUserStore();

    // ref par défaut des données de l'utilisateur connecté
    const userData = ref(null);
    const currentPassword = ref('');
    const newFirstName = ref('');
    const newLastName = ref('');
    const newAddress = ref('');
    const newPostalCode = ref('');
    const newCity = ref('');
    const newCountry = ref('');

    // états de validation
    const newFirstNameValid = ref(true);
    const newLastNameValid = ref(true);
    const newAddressValid = ref(true);
    const newPostalCodeValid = ref(true);
    const newCityValid = ref(true);
    const newCountryValid = ref(true);
    const currentPasswordValid = ref(true);

    // RegExp
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const alphanumericRegex = /^[A-Za-z0-9, \-'’]+$/;
    const numericRegex = /^[0-9]*$/;

    // Fonctions de validation pour chaque champ

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

    // valide le formulaire changement nom et adresse

    const updateProfile = async () => {

        // valide chaque champ individuellement
        validateNewFirstName();
        validateNewLastName();
        validateNewAddress();
        validateNewPostalCode();
        validateNewCity();
        validateNewCountry();

        // extrait les valeurs des objets ref
        const newFirstNameValue = newFirstName.value;
        const newLastNameValue = newLastName.value;
        const newAddressValue = newAddress.value;
        const newPostalCodeValue = newPostalCode.value;
        const newCityValue = newCity.value;
        const newCountryValue = newCountry.value;
        const currentPasswordValue = currentPassword.value;

        // détermine les champs requis pour soumettre le formulaire
        const requiredFieldsValid =
            newFirstNameValid.value &&
            newLastNameValid.value &&
            newAddressValid.value &&
            newPostalCode.value &&
            newCityValid.value &&
            newCountryValid.value &&
            currentPasswordValid.value

        // soumet le formulaire avec les champs requis
        if (requiredFieldsValid) {

            const token = localStorage.getItem('token');
            console.log('Token avant la requete coté frontend:', token)

        try {        
            const response = await fetch('http://localhost:3000/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: newFirstNameValue,
                    lastName: newLastNameValue,
                    address: newAddressValue,
                    postalCode: newPostalCodeValue,
                    city: newCityValue,
                    country: newCountryValue,
                    password: currentPasswordValue,
                }),
            });

            if (response.ok) {
                // redirection vers une page de confirmation
                router.push('/registration-confirmation'); 

                // affiche le message d'inscription réussie ici
                const data = await response.json();
                console.log(data.message); // affiche le message dans la console
            } else {
                // affiche un message d'erreur à l'utilisateur.
                console.error('Erreur lors de la mise à jour:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour: ', error);
        }

        } else {
        // Affiche un message d'erreur à l'utilisateur si le formulaire n'est pas valide
        console.error('Veuillez corriger les erreurs dans le formulaire.');
        }
    };


    // charge userData depuis le localStorage avant de rendre le composant avec méthode du store
    onMounted(async() => {
        await userStore.loadUserDataFromLocalStorage();

        if(userStore.userData) {
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