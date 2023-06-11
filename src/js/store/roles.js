import axios from "axios"
import { defineStore } from "pinia"

// Defining State
const state = () => ({
    roles: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getRoles() {
        axios
            .get("roles")
            .then(({ data }) => {
                this.roles = data
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const useRoleStore = defineStore("role", {
    state,
    getters,
    actions,
})
