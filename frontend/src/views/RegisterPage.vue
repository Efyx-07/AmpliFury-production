<template>

    <div class="registerPage">

        <h1>{{ registerPageTitle }}</h1>

        <form class="registration-form" @submit.prevent="validate">

            <div class="input_container">
                <input type="text" name="first_name" required id="registration_firstName" v-model="firstName" @input="validateFirstName">
                <p>{{ inputFirstNamePlaceholder }}</p>
                <p v-if="!firstNameValid && firstName !== ''">Please enter a valid {{ inputFirstNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="last_name" required id="registration_lastName" v-model="lastName" @input="validateLastName">
                <p>{{ inputLastNamePlaceholder }}</p>
                <p v-if="!lastNameValid && lastName !== ''">Please enter a valid {{ inputLastNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="address" id="registration_address" v-model="address" @input="validateAddress">
                <p>{{ inputAddressPlaceholder }}</p>
                <p v-if="!addressValid && address !== ''">Please enter a valid {{ inputAddressPlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="number" name="postal_code" id="registration_postalCode" v-model="postalCode" @input="validatePostalCode">
                <p>{{ inputPostalCodePlaceholder }}</p>
                <p v-if="!postalCodeValid && postalCode !== ''">Please enter a valid {{ inputPostalCodePlaceholder }} numeric format </p>
            </div>
            <div class="input_container">
                <input type="text" name="city" id="registration_city" v-model="city" @input="validateCity">
                <p>{{ inputCityPlaceholder }}</p>
                <p v-if="!cityValid && city !== ''">Please enter a valid {{ inputCityPlaceholder }} </p>
            </div>
            <div class="input_container">
                <input name="country" id="registration_country" v-model="country" @input="validateCountry">
                <p>{{ inputCountryPlaceholder }}</p>
                <p v-if="!countryValid && country !== ''">Please enter a valid {{ inputCountryPlaceholder }} </p>
            </div> 
            <div class="input_container">
                <input type="email" name="email" required id="registration_email" v-model="email" @input="validateEmail">
                <p>{{ inputMailPlaceholder }}</p>
                <p v-if="!emailValid && email !== ''">Please enter a valid {{ inputMailPlaceholder }} </p>
            </div>
            <div class="input_container">
                <input type="password" name="password" required id="registration_password" v-model="password" @input="validatePassword"
                placeholder="Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long">
                <p>{{ inputPasswordPlaceholder }}</p>
                <p v-if="!passwordValid && password !== ''">Please enter a good format {{ inputPasswordPlaceholder }} </p>
            </div>
            <div class="input_container">
                <input type="password" name="confirm_password" required v-model="confirmPassword" @input="validateConfirmPassword">
                <p>{{ inputConfirmPasswordPlaceholder }}</p>
                <p v-if="!confirmPasswordValid && confirmPassword !== ''">Not identical to your password </p>
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
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    // datas
    const registerPageTitle = "Register";
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


    // propriétés du formulaire
    const firstName = ref('');
    const lastName = ref('');
    const address = ref('');
    const postalCode = ref('');
    const city = ref('');
    const country = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const router = useRouter();

    // états de validation
    const firstNameValid = ref(true);
    const lastNameValid = ref(true);
    const addressValid = ref(true);
    const postalCodeValid = ref(true);
    const cityValid = ref(true);
    const countryValid = ref(true);
    const emailValid = ref (true);
    const passwordValid = ref (true);
    const confirmPasswordValid = ref (true);

    // RegExp
    const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
    const alphanumericRegex = /^[A-Za-z0-9, \-'’]+$/;
    const numericRegex = /^[0-9]*$/;
    const emailRegex = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;

    // Fonctions de validation pour chaque champ

    const validateFirstName = () => {
        firstNameValid.value = nameTypeRegex.test(firstName.value);
    };

    const validateLastName = () => {
        lastNameValid.value = nameTypeRegex.test(lastName.value);
    };

    const validateAddress = () => {
        addressValid.value = alphanumericRegex.test(address.value);
    };

    const validatePostalCode = () => {
        postalCodeValid.value = numericRegex.test(postalCode.value);
    };

    const validateCity = () => {
        cityValid.value = nameTypeRegex.test(city.value);
    };

    const validateCountry = () => {
        countryValid.value = nameTypeRegex.test(country.value);
    };

    const validateEmail = () => {
        emailValid.value = emailRegex.test(email.value);
    };

    
    const validatePassword = () => {
        // regex pour vérifier les critères
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;

        // vérifie la longueur du mot de passe
        const minLength = 8;

        // valide si tous les critères sont respectés
        const isValid =
            password.value.length >= minLength &&
            uppercaseRegex.test(password.value) &&
            lowercaseRegex.test(password.value) &&
            digitRegex.test(password.value);

        passwordValid.value = isValid;
    };

    const validateConfirmPassword = () => {
        confirmPasswordValid.value = password.value === confirmPassword.value;
    };

    
    // valide le formulaire 
    const validate = async () => {

        // Valide chaque champ individuellement
        validateFirstName();
        validateLastName();
        validateAddress();
        validatePostalCode();
        validateCity();
        validateCountry(); 
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        // extrait les valeurs des objets ref
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const addressValue = address.value;
        const postalCodeValue = postalCode.value;
        const cityValue = city.value;
        const countryValue = country.value;
        const emailValue = email.value;
        const passwordValue = password.value;

        // détermine les champs requis pour soumettre le formulaire
        const requiredFieldsValid =
            firstNameValid.value &&
            lastNameValid.value &&
            addressValid.value &&
            postalCode.value &&
            cityValid.value &&
            countryValid.value &&
            emailValid.value &&
            passwordValid.value &&
            confirmPasswordValid.value;

        // soumet le formulaire avec au moins les champs requis
        if (requiredFieldsValid) {

            try {        
                const response = await fetch('http://localhost:3000/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstNameValue,
                        lastName: lastNameValue,
                        address: addressValue,
                        postalCode: postalCodeValue,
                        city: cityValue,
                        country: countryValue,
                        email: emailValue,
                        password: passwordValue,
                    }),
                });

                if (response.ok) {
                    // inscription réussie, redirection vers une page de confirmation
                    router.push('/registration-confirmation'); 

                    // affiche le message d'inscription réussie ici
                    const data = await response.json();
                    console.log(data.message); // affiche le message dans la console
                } else {
                    // affiche un message d'erreur à l'utilisateur.
                    console.error('Erreur lors de l\'inscription :', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de l\inscription: ', error);
            }

        } else {
            // Affiche un message d'erreur à l'utilisateur si le formulaire n'est pas valide
            console.error('Veuillez corriger les erreurs dans le formulaire.');
        }
    };

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
