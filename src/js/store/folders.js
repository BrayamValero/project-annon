import { defineStore } from "pinia"
import { useAuthStore } from "@store/auth"

// Defining State
const state = () => ({
    folders: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getFolders() {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/folders", {
            headers: authStore.getHeaders,
            method: "GET",
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.folders = response
            })
    },
}

export const useFolderStore = defineStore("folder", {
    state,
    getters,
    actions,
})
