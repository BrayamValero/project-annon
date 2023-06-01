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
    async addFiles(files) {
        await fetch("https://backuplospatios.com/api/files", {
            method: "POST",
            body: files,
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                response.forEach((el) => this.files.push(el))
            })
    },
}

export const useFileStore = defineStore("file", {
    state,
    getters,
    actions,
})
