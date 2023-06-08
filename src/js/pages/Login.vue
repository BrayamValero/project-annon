<script setup>
import { reactive } from "vue"
import { useAuthStore } from "@store/auth"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()

// Defining Data Format
const dataFormat = {
    email: "adminuser@gmail.com",
    password: "123456",
}

// [Cloning] => Cloning Object
const userData = reactive({ ...dataFormat })

const submitForm = () => {
    const { email, password } = userData

    const FORM_DATA = new FormData()
    FORM_DATA.append("email", email)
    FORM_DATA.append("password", password)

    authStore.login(FORM_DATA)
}
</script>

<template>
    <div class="Login">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="8">
                    <h1>Bienvenidos a Backup Los Patios</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nihil, ullam?
                    </p>
                    <b-form>
                        <b-form-group
                            label="Correo Electrónico"
                            label-for="input-email"
                            description="Ingresa el correo usado al momento del registro."
                        >
                            <b-form-input
                                id="input-email"
                                v-model="userData.email"
                                type="email"
                                placeholder="Ingresa Correo"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="Contraseña"
                            label-for="input-password"
                            description="Nunca compartiremos tu contraseña con nadie."
                        >
                            <b-form-input
                                id="input-password"
                                type="password"
                                v-model="userData.password"
                                placeholder="Ingresa Contraseña"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button
                            type="button"
                            variant="primary"
                            @click="submitForm"
                        >
                            Iniciar Sesión
                        </b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
