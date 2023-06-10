import axios from "axios"
import { set } from "vue"
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
        axios
            .get("users", {
                headers: authStore.getHeaders,
            })
            .then(({ data }) => {
                this.users = data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async addUser(user) {
        const authStore = useAuthStore()
        axios
            .post("users", user, {
                headers: authStore.getHeaders,
            })
            .then(({ data }) => {
                this.users.push(data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async editUser(user) {
        const authStore = useAuthStore()
        axios
            .post("users/edit", user, {
                headers: authStore.getHeaders,
            })
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async editPassword(user) {
        const authStore = useAuthStore()
        axios
            .post("users/edit-password", user, {
                headers: authStore.getHeaders,
            })
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async deleteUser(id) {
        // Setting FormData
        const FORM_DATA = new FormData()
        FORM_DATA.append("id", id)

        const authStore = useAuthStore()
        axios
            .post("users/delete", FORM_DATA, {
                headers: authStore.getHeaders,
            })
            .then(() => {
                const index = this.users.findIndex((el) => el.id == id)
                this.users.splice(index, 1)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const useUserStore = defineStore("user", {
    state,
    getters,
    actions,
})
