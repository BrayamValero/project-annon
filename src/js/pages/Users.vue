<script setup>
import TableUsers from "@component/Table/Users.vue"
</script>

<template>
    <div class="Users">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="10">
                    <h1>Vista de Usuario</h1>
                    <!-- Users Table -->
                    <TableUsers />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
