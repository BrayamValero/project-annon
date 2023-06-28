import axios from "axios"
import { defineStore } from "pinia"
import { useVerifyForm, useSwal, useDecodeJWT } from "@composable"

// Defining State
const state = () => ({
    user: null,
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
    setExpirationTime(token) {
        // Renew Expiration Time
        this.cookies.set("token", token, "3d")
    },
    setToken() {
        const TOKEN = this.cookies.get("token")

        if (TOKEN) {
            // Setting new expiration Token
            this.setExpirationTime(TOKEN)
            // Decrypt and get user info
            this.user = useDecodeJWT(TOKEN)
            // Defining axios headers.
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
                this.setExpirationTime(data["data"])
                this.user = useDecodeJWT(data["data"])
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
        this.user = null
        this.router.push({ name: "Home" })
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})
