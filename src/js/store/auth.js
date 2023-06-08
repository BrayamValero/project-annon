import { defineStore } from "pinia"

// Defining State
const state = () => ({
    userInfo: null,
})

// Defining Getters
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
                } else {
                    console.log("Error", res)
                }
            })
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})
