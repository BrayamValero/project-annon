import axios from "axios"
import { defineStore } from "pinia"

// Defining State
const state = () => ({
    roles: [],
})

// Defining Getters
const getters = {
    getRoleOptions(state) {
        return state.roles.map(({ id, name }) => ({
            value: id,
            text: name,
        }))
    },
}

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
