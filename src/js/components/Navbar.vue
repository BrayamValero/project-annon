<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@store/auth"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
    <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand to="/">Logo</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if="user" to="/dashboard"> Dashboard </b-nav-item>
                <b-nav-item v-if="user" to="/usuarios">Usuarios</b-nav-item>
                <b-nav-item v-if="user" to="/carpetas">Carpetas</b-nav-item>
                <b-nav-item v-if="user" to="/roles">Roles</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="!user" to="/login">
                    Iniciar Sesión
                </b-nav-item>
                <template v-else>
                    <b-nav-item>
                        <div>{{ user.fullname }}</div>
                        <div>
                            {{ user.role_name }}
                        </div>
                    </b-nav-item>
                    <b-nav-item @click="authStore.logout()">
                        Cerrar Sesión
                    </b-nav-item>
                </template>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
