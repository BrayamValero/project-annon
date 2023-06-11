import axios from "axios"
import { set } from "vue"
import { defineStore } from "pinia"

// Defining State
const state = () => ({
    folders: [],
})

// Defining Getters
const getters = {
    getFolderOptions(state) {
        return state.folders.map((folder) => ({
            value: folder.id,
            text: folder.name,
        }))
    },
    getSortingOptions(state) {
        const allFolders = state.folders.map((folder) => ({
            value: folder.id,
            text: folder.name,
        }))
        return [{ value: null, text: "Todos los archivos" }, ...allFolders]
    },
}

// Defining Actions
const actions = {
    async getFolders() {
        axios
            .get("folders")
            .then(({ data }) => {
                this.folders = data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async addFolder(folder) {
        axios
            .post("folders", folder)
            .then(({ data }) => {
                this.folders.push(data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async editFolder(folder) {
        axios
            .post("folders/edit", folder)
            .then(({ data }) => {
                const index = this.folders.findIndex((el) => el.id === data.id)
                set(this.folders, index, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async deleteFolder(id) {
        // Setting FormData
        const FORM_DATA = new FormData()
        FORM_DATA.append("id", id)

        axios
            .post("folders/delete", FORM_DATA)
            .then(() => {
                const index = this.folders.findIndex((el) => el.id == id)
                this.folders.splice(index, 1)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const useFolderStore = defineStore("folder", {
    state,
    getters,
    actions,
})
