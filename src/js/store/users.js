import { defineStore } from "pinia"
import { useAuthStore } from "@store/auth"

// Defining State
const state = () => ({
    users: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getUsers() {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/users", {
            headers: authStore.getHeaders,
            method: "GET",
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.users = response
            })
    },
    async addUser(user) {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/users", {
            headers: authStore.getHeaders,
            method: "POST",
            body: user,
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.user.push(response)
            })
    },
}

export const useUserStore = defineStore("user", {
    state,
    getters,
    actions,
})
