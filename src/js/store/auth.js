import { defineStore } from "pinia"

// Defining State
const state = () => ({
    token: null,
})

const getters = {
    getHeaders(state) {
        return { Authorization: `Bearer ${state.token}` }
    },
}

// Defining Actions
const actions = {
    loadStateFromCookie() {
        const TOKEN = this.cookies.get("jwt_token")
        if (TOKEN) this.token = TOKEN
    },
    async login(user) {
        await fetch("http://backend-backup-patios.test/login", {
            method: "POST",
            body: user,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then(({ status, message, data }) => {
                if (status === "200") {
                    this.token = data
                    this.cookies.set("jwt_token", data)
                    this.router.push({ name: "Dashboard" })
                } else {
                    console.log("Error", res)
                }
            })
    },
    async logout() {
        // Replace with Cookies
        this.cookies.remove("jwt_token")
        this.token = null
        this.router.push({ name: "Home" })
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})
