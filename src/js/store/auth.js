import axios from "axios"
import { defineStore } from "pinia"
import { useVerifyForm, useSwal } from "@composable"

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
        if (!useVerifyForm(user)) return false

        const formData = new FormData()
        formData.append("email", user.email)
        formData.append("password", user.password)

        axios
            .post("login", formData)
            .then(({ data }) => {
                axios.defaults.headers.common = {
                    Authorization: `Bearer ${data["data"]}`,
                }
                this.token = data["data"]
                this.cookies.set("token", data["data"], "1d")
                this.router.push({ name: "Dashboard" })
            })
            .catch((error) => {
                const { data, status } = error.response
                useSwal({
                    title: "Error " + status,
                    text: data.message,
                    icon: "error",
                    showConfirmButton: false,
                })
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
