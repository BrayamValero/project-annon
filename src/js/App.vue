<script setup>
import { onBeforeMount } from "vue"
import { useAuthStore } from "@store/auth"
import Navbar from "@component/Navbar.vue"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()

// Load state from cookie before the App.vue loads
onBeforeMount(() => authStore.setToken())
</script>

<template>
    <div>
        <Navbar />
        <router-view></router-view>
    </div>
</template>
