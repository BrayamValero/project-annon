<script setup>
import { onBeforeMount, onMounted } from "vue"
import { useAuthStore } from "@store/auth"
import { useFileStore } from "@store/files"
import Navbar from "@component/Navbar.vue"

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore()
const fileStore = useFileStore()

// Load state from cookie before the App.vue loads
onBeforeMount(() => authStore.setToken())

onMounted(
    () => setInterval(fileStore.scheduleDownload, 60000) // 60 SECS
)
</script>

<template>
    <div class="Main">
        <Navbar />
        <router-view class="Content"></router-view>
    </div>
</template>

<style lang="scss">
.Content {
    background: url("/img/hero-banner.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: 100% 100%;
    min-height: calc(100vh - 76.4375px);
}
</style>
