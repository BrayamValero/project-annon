<script setup>
import TableRoles from "@component/Table/Roles.vue"
</script>

<template>
    <div class="Roles">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="10" class="text-center">
                    <h3 class="font-weight-bold">Roles</h3>
                    <p class="text-muted">
                        Acá podrás ver la lista de roles disponibles dentro de
                        la plataforma, no pueden ser eliminados.
                    </p>
                    <!-- Roles Table -->
                    <TableRoles class="my-4" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
