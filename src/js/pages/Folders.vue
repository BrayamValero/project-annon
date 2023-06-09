<script setup>
import TableFolders from "@component/Table/Folders.vue"
</script>

<template>
    <div class="Folders">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="10" class="text-center">
                    <h3 class="font-weight-bold">Carpetas</h3>
                    <p>
                        Acá podrás ver la lista de carpetas disponibles dentro
                        de la plataforma, no pueden ser eliminadas.
                    </p>
                    <!-- Roles Table -->
                    <TableFolders class="my-4" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
