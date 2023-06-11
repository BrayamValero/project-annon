<script setup>
import { onBeforeMount } from "vue"
import { useAuthStore } from "@store/auth"
import { useFolderStore } from "@store/folders"
import Navbar from "@component/Navbar.vue"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()
const folderStore = useFolderStore()

// Load state from cookie before the App.vue loads
onBeforeMount(async () => {
    await authStore.loadStateFromCookie()
    await folderStore.getFolders()
})
</script>

<template>
    <div>
        <Navbar />
        <router-view></router-view>
    </div>
</template>
