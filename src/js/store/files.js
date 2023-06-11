import axios from "axios"
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
        axios
            .get("files")
            .then(({ data }) => {
                this.files = data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async addFiles(files) {
        axios
            .post("files", files)
            .then(({ data }) => {
                data.forEach((file) => this.files.push(file))
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async downloadFile({ name, url_source, type }) {
        axios
            .get("download", {
                responseType: "blob",
                params: { source: url_source },
            })
            .then(({ data }) => {
                let fileURL = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement("a")
                link.href = fileURL
                link.setAttribute("download", `${name}.${type}`)
                document.body.appendChild(link)
                link.click()
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async viewFile({ url_source }) {
        axios
            .get("files/view", {
                responseType: "blob",
                params: { source: url_source },
            })
            .then(({ data, headers }) => {
                const blob = new Blob([data], {
                    type: headers["content-type"],
                })
                const fileURL = URL.createObjectURL(blob)
                window.open(fileURL, "_blank")
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async deleteFile(id) {
        axios
            .post("files/delete", { id })
            .then(() => {
                const index = this.files.findIndex((el) => el.id == id)
                this.files.splice(index, 1)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}

export const useFileStore = defineStore("file", {
    state,
    getters,
    actions,
})
