<script setup>
defineProps({
    form: Object,
})
</script>

<template>
    <div class="FormUser">
        <b-form-group label="Nombre y Apellido">
            <b-form-input
                v-model="form.fullname"
                type="email"
                placeholder="Ingresa tu nombre"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Correo Electronico">
            <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Ingresa tu correo"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Contraseña">
            <b-form-input
                v-model="form.password"
                placeholder="Ingresa la contraseña"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Rol">
            <b-form-select
                v-model="form.role_id"
                :options="[
                    { value: null, text: 'Selecciona' },
                    { value: 1, text: 'Admin' },
                    { value: 2, text: 'Moderator' },
                ]"
                required
            ></b-form-select>
        </b-form-group>
    </div>
</template>
