<script setup>
import TableRoles from "@component/Table/Roles.vue"
</script>

<template>
    <div class="Roles">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="10">
                    <h1>Vista de Roles</h1>
                    <!-- Roles Table -->
                    <TableRoles />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
