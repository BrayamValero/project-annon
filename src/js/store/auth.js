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
        if (!useVerifyForm(user)) return
        // Feat: Setting User FormData
        const FORM_DATA = new FormData()
        FORM_DATA.append("email", user.email)
        FORM_DATA.append("password", user.password)

        await fetch("http://backend-backup-patios.test/login", {
            method: "POST",
            body: FORM_DATA,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then(({ data, status }) => {
                if (status === "200") {
                    // Setting Default Headers
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${data}`,
                    }
                    // Setting Token Data, Cookies and redirecting
                    this.token = data
                    this.cookies.set("token", data, "1d")
                    this.router.push({ name: "Dashboard" })
                } else {
                    alert("Error, intenta nuevamente")
                }
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
