import { defineStore } from "pinia"
import { useAuthStore } from "@store/auth"

// Defining State
const state = () => ({
    roles: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getRoles() {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/roles", {
            headers: authStore.getHeaders,
            method: "GET",
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.roles = response
            })
    },
}

export const useRoleStore = defineStore("role", {
    state,
    getters,
    actions,
})
