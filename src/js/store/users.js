import axios from "axios"
import { set } from "vue"
import { defineStore } from "pinia"

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
        axios
            .post("users", user)
            .then(({ data }) => {
                this.users.push(data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async editUser(user) {
        axios
            .post("users/edit", user)
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async editPassword(user) {
        axios
            .post("users/edit-password", user)
            .then(({ data }) => {
                const index = this.users.findIndex((el) => el.id === data.id)
                set(this.users, index, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async deleteUser(id) {
        // Setting FormData
        const FORM_DATA = new FormData()
        FORM_DATA.append("id", id)

        axios
            .post("users/delete", FORM_DATA)
            .then(() => {
                const index = this.users.findIndex((el) => el.id == id)
                this.users.splice(index, 1)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const useUserStore = defineStore("user", {
    state,
    getters,
    actions,
})
