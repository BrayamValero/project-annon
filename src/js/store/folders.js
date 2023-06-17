import axios from "axios"
import { set } from "vue"
import { defineStore } from "pinia"
import { useVerifyForm, useSwal } from "@composable"

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
        if (!useVerifyForm(folder)) return false
        return axios
            .post("folders", folder)
            .then(({ data }) => {
                this.folders.push(data)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    async editFolder(folder) {
        if (!useVerifyForm(folder)) return false
        return axios
            .post("folders/edit", folder)
            .then(({ data }) => {
                const index = this.folders.findIndex((el) => el.id === data.id)
                set(this.folders, index, data)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    async deleteFolder(id) {
        // Sweet Alerts: Delete Prompt
        const { isConfirmed } = await useSwal({
            icon: "warning",
            title: "¿Estas seguro?",
            text: "Si eliminas esta carpeta, todos los archivos asociados a dicha carpeta se eliminarán.",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        })
        // Axios: Wrapping confirmation inside prompt response
        if (isConfirmed) {
            axios
                .post("folders/delete", { id })
                .then(() => {
                    const index = this.folders.findIndex((el) => el.id == id)
                    this.folders.splice(index, 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
}

export const useFolderStore = defineStore("folder", {
    state,
    getters,
    actions,
})
