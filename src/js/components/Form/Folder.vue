<script setup>
defineProps({
    form: Object,
})
</script>

<template>
    <div class="FormFolder">
        <b-form-group label="Nombre de Carpeta">
            <b-form-input
                v-model="form.name"
                type="text"
                placeholder="Ingresa el nombre de la carpeta"
                required
            ></b-form-input>
        </b-form-group>
    </div>
</template>
