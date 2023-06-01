import { defineStore } from "pinia"

// Defining State
const state = () => ({
    files: [],
})

// Defining Getters
const getters = {
    // convertFiles: (state) => {
    //     return state.files
    // },
}

// Defining Actions
const actions = {
    async getFiles() {
        await fetch("https://backuplospatios.com/api/files", {
            method: "GET",
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.files = response
            })
    },
    async addFile(file) {
        await fetch("https://backuplospatios.com/api/files", {
            method: "POST",
            body: file,
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.files.push(response)
            })
    },
}

export const useFileStore = defineStore("file", {
    state,
    getters,
    actions,
})
