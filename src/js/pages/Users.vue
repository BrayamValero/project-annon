<script setup>
import TableUsers from "@component/Table/Users.vue"
</script>

<template>
    <div class="Users">
        <b-container class="py-5">
            <b-row class="justify-content-center">
                <b-col cols="10" class="text-center">
                    <h3 class="font-weight-bold">Usuarios</h3>
                    <p class="text-muted">
                        Acá podrás ver la lista de usuarios registrados en la
                        plataforma, pueden ser editados y eliminados.
                    </p>
                    <!-- Users Table -->
                    <TableUsers class="my-4" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
