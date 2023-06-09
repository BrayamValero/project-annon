import { defineStore } from "pinia"

// Defining State
const state = () => ({
    files: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getFiles() {
        // await fetch("http://backend-backup-patios.test/files", {
        //     method: "GET",
        // })
        //     .then((response) => response.json())
        //     .catch((error) => console.error("Error:", error))
        //     .then((response) => {
        //         this.files = response
        //     })
    },
    async addFiles(files) {
        // await fetch("http://backend-backup-patios.test/files", {
        //     method: "POST",
        //     body: files,
        // })
        //     .then((response) => response.json())
        //     .catch((error) => console.error("Error:", error))
        //     .then((response) => {
        //         response.forEach((el) => this.files.push(el))
        //     })
    },
}

export const useFileStore = defineStore("file", {
    state,
    getters,
    actions,
})
