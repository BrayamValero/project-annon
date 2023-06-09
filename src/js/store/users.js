import { defineStore } from "pinia"
import { useAuthStore } from "@store/auth"
import { set } from "vue"

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
                console.log("response", response)
                this.users.push(response)
            })
    },
    async editUser(user) {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/users/edit", {
            headers: authStore.getHeaders,
            method: "POST",
            body: user,
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("response", response)
                const index = this.users.findIndex((u) => u.id === response.id)
                set(this.users, index, response)
            })
    },
    async editPassword(user) {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/users/edit-password", {
            headers: authStore.getHeaders,
            method: "POST",
            body: user,
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("response", response)
                const index = this.users.findIndex((u) => u.id === response.id)
                set(this.users, index, response)
            })
    },
    async deleteUser(user) {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/users/delete", {
            headers: authStore.getHeaders,
            method: "POST",
            body: user,
        })
            .then((response) => {})
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("response", response)
                const index = this.users.findIndex(
                    (el) => el.id == user.get("id")
                )
                this.users.splice(index, 1)
            })
    },
}

export const useUserStore = defineStore("user", {
    state,
    getters,
    actions,
})
