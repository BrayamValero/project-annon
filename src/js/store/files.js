import { defineStore, storeToRefs } from "pinia"
import { useAuthStore } from "@store/auth"

// Defining State
const state = () => ({
    files: [],
})

// Defining Getters
const getters = {}

// Defining Actions
const actions = {
    async getFiles() {
        const authStore = useAuthStore()
        await fetch("http://backend-backup-patios.test/files", {
            headers: authStore.getHeaders,
            method: "GET",
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.files = response
            })
    },
    async addFiles(files) {
        const authStore = useAuthStore()
        // Display the key/value pairs
        for (var pair of files) {
            console.log(pair[0] + ", " + pair[1])
        }
        await fetch("http://backend-backup-patios.test/files", {
            headers: authStore.getHeaders,
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
