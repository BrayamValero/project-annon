import { defineStore } from "pinia"

// Defining State
const state = () => ({
    userInfo: localStorage.getItem("jwt_token") || null,
})

const getters = {}

// Defining Actions
const actions = {
    async login(user) {
        await fetch("http://backend-backup-patios.test/login", {
            method: "POST",
            body: user,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then((res) => {
                if (res.status === "200") {
                    console.log("Success", res)
                    this.userInfo = res.data
                    localStorage.setItem("jwt_token", res.data)
                    this.router.push({ name: "Dashboard" })
                } else {
                    console.log("Error", res)
                }
            })
    },
    async logout() {
        localStorage.removeItem("jwt_token")
        this.userInfo = null
        this.router.push({ name: "Home" })
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})
