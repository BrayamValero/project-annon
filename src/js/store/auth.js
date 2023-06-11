import axios from "axios"
import { defineStore } from "pinia"
import { useVerifyForm } from "@composable"

// Defining State
const state = () => ({
    token: null,
})

const getters = {
    getHeaders(state) {
        return {
            Authorization: `Bearer ${state.token}`,
        }
    },
}

// Defining Actions
const actions = {
    setToken() {
        const TOKEN = this.cookies.get("token")

        if (TOKEN) {
            // Renew Expiration Time, setting token state and defining axios headers.
            this.cookies.set("token", TOKEN, "1d")
            this.token = TOKEN
            axios.defaults.headers.common = {
                Authorization: `Bearer ${TOKEN}`,
            }
        }
    },
    async login(user) {
        // First, veryfy FormData inputs
        if (!useVerifyForm(user)) return

        axios
            .post("login", user)
            .then(({ data: { data } }) => {
                // Setting Default Headers
                axios.defaults.headers.common = {
                    Authorization: `Bearer ${data}`,
                }
                // Setting Token Data, Cookies and redirecting
                this.token = data
                this.cookies.set("token", data, "1d")
                this.router.push({ name: "Dashboard" })
            })
            .catch((error) => {
                const message = error.response.data.message
                alert(message)
            })
    },
    async logout() {
        // Setting Default Headers
        axios.defaults.headers.common = null
        // Replace with Cookies
        this.cookies.remove("token")
        this.token = null
        this.router.push({ name: "Home" })
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})
