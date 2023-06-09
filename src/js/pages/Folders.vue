<script setup>
import TableFolders from "@component/Table/Folders.vue"
</script>

<template>
    <div class="Folders">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="10">
                    <h1>Vista de Carpetas</h1>
                    <!-- Roles Table -->
                    <TableFolders />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
