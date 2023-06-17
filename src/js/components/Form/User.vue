<script setup>
import { onMounted } from "vue"

// Adding Role Store
import { useRoleStore } from "@store/roles"

// Accessing the Role Store variables
const roleStore = useRoleStore()

defineProps({
    form: Object,
    type: String,
})

// Getting Information Request & Total Rows
onMounted(async () => {
    await roleStore.getRoles()
})
</script>

<template>
    <div class="FormUser">
        <b-form-group label="Nombre y Apellido" v-if="type !== 'password'">
            <b-form-input
                v-model="form.fullname"
                type="text"
                placeholder="Ingresa tu nombre"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Correo Electronico" v-if="type !== 'password'">
            <b-form-input
                v-model="form.email"
                type="email"
                placeholder="Ingresa tu correo"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Contraseña"
            v-if="type === 'add' || type === 'password'"
        >
            <b-form-input
                type="password"
                v-model="form.password"
                placeholder="Ingresa la contraseña"
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Rol" v-if="type !== 'password'">
            <b-form-select
                v-model="form.role_id"
                :options="roleStore.getRoleOptions"
                required
            ></b-form-select>
        </b-form-group>
    </div>
</template>
