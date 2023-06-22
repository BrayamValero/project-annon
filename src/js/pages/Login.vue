<script setup>
import { reactive } from "vue"
import { useAuthStore } from "@store/auth"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()

// Defining Data Format
const dataFormat = {
    email: null,
    password: null,
}

// [Cloning] => Cloning Object
const userData = reactive({ ...dataFormat })

const submitForm = () => {
    authStore.login(userData)
}
</script>

<template>
    <div class="Login Index-content">
        <b-container class="h-100">
            <b-row class="h-100 justify-content-center align-items-center">
                <b-col cols="6">
                    <div class="card">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <h3 class="font-weight-bold">Bienvenido</h3>
                                <p>
                                    Por favor ingrese sus credenciales para
                                    acceder al sistema
                                </p>
                            </div>
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
                                    class="w-100"
                                >
                                    Iniciar Sesión
                                </b-button>
                            </b-form>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
