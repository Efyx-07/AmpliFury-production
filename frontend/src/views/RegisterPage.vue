<template>
    <h1>Registration</h1>

    <form action="" class="registration-form">
        <div class="input_container">
            <input type="text" name="first_name" id="registration_firstName">
            <p>First name</p>
        </div>
        <div class="input_container">
            <input type="text" name="last_name" id="registration_lastName">
            <p>Last name</p>
        </div>
        <div class="input_container">
            <input type="text" name="address" id="registration_address">
            <p>Address</p>
        </div>
        <div class="input_container">
            <input type="number" name="postal_code" id="registration_postalCode">
            <p>Postal code</p>
        </div>
        <div class="input_container">
            <input type="text" name="city" id="registration_city">
            <p>City</p>
        </div>
        <div class="input_container">
            <input type="text" name="country" id="registration_country">
            <p>Country</p>
        </div>
        <div class="input_container">
            <input type="email" name="email" id="registration_email">
            <p>{{ inputMailPlaceholder }}</p>
        </div>
        <div class="input_container">
            <input type="password" name="password" id="registration_password">
            <p>{{ inputPasswordPlaceholder }}</p>
        </div>
        <div class="input_container">
            <input type="password" name="confirm_password">
            <p>Confirm password</p>
        </div>
        
    </form>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>
    
</style>
