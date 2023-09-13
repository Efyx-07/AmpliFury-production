<template>
    <div class="contactPage">
        <h1>{{ contactPageTitle }}</h1>

        <form @submit="verif" class="contact-form">
            <div class="input_container">
                <input type="text" name="first_name" id="contact_firstName">
                <p>{{ inputFirstNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="last_name" id="contact_lastName">
                <p>{{ inputLastNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="email" name="email" id="contact_email">
                <p>{{ inputMailPlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="object" id="contact_object">
                <p>{{ inputLastNamePlaceholder }}</p>
            </div>
            <div class="input_container">
                <input type="text" name="message" id="contact_message">
                <p>{{ inputMessagePlaceholder }}</p>
            </div>
            <button type="submit">Envoyer</button>
        </form>

    </div>
</template>

<script setup>

    //datas
    const contactPageTitle = 'Contact';
</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    .contactPage {
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
    }
</style>