import axios from "axios"
import { set } from "vue"
import { defineStore } from "pinia"
import { useVerifyForm, useSwal } from "@composable"

// Defining State
const state = () => ({
    users: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getUsers() {
        axios
            .get("users")
            .then(({ data }) => {
                this.users = data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async addUser(user) {
        if (!useVerifyForm(user)) return
        return axios
            .post("users", user)
            .then(({ data }) => {
                this.users.push(data)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    async editUser(user) {
        if (!useVerifyForm(user)) return
        return axios
            .post("users/edit", user)
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    async editPassword(user) {
        if (!useVerifyForm(user)) return

        return axios
            .post("users/edit-password", user)
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    async deleteUser(id) {
        // Sweet Alerts: Delete Prompt
        const { isConfirmed } = await useSwal({
            icon: "warning",
            title: "¿Estas seguro?",
            text: "No podrás recuperar este usuario luego",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        })
        // Axios: Wrapping confirmation inside prompt response
        if (isConfirmed) {
            axios
                .post("users/delete", { id })
                .then(() => {
                    const index = this.users.findIndex((el) => el.id == id)
                    this.users.splice(index, 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
}

export const useUserStore = defineStore("user", {
    state,
    getters,
    actions,
})
