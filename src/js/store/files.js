import axios from "axios"
import { defineStore } from "pinia"
import { useSwal } from "@composable"

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
        return axios
            .post("files", files)
            .then(({ data }) => {
                data.forEach((file) => this.files.push(file))
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
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
    async downloadFiles() {
        axios
            .get("download-all", {
                responseType: "blob",
            })
            .then(({ data }) => {
                const blob = new Blob([data], { type: "application/zip" })
                const fileName = "backup.zip"

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    //  Internet Explorer or Microsoft Edge
                    window.navigator.msSaveOrOpenBlob(blob, fileName)
                } else {
                    // Others
                    const downloadLink = document.createElement("a")
                    downloadLink.href = window.URL.createObjectURL(blob)
                    downloadLink.download = fileName
                    downloadLink.click()
                }
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
    async deleteFile({ id, url_source }) {
        // Sweet Alerts: Delete Prompt
        const { isConfirmed } = await useSwal({
            icon: "warning",
            title: "¿Estas seguro?",
            text: "No podrás recuperar este archivo luego",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        })
        // Axios: Wrapping confirmation inside prompt response
        if (isConfirmed) {
            axios
                .post("files/delete", { id, url_source })
                .then(() => {
                    const index = this.files.findIndex((el) => el.id == id)
                    this.files.splice(index, 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    scheduleDownload() {
        const DATE = new Date()
        const CURRENT_HOUR = DATE.getHours()
        const CURRENT_MINUTES = DATE.getMinutes()

        // Setting AM and PM format (9:30 am)
        const HOUR_AM = 9
        const MIN_AM = 30
        // Setting PM format (5:30 pm)
        const HOUR_PM = 17
        const MIN_PM = 30

        const getAlert = () =>
            useSwal({
                title: "Aviso",
                icon: "warning",
                html: "Descargando archivos automáticamente",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            })

        console.log("Monitoreando hora:", `${CURRENT_HOUR}:${CURRENT_MINUTES}`)

        if (CURRENT_HOUR === HOUR_AM && CURRENT_MINUTES === MIN_AM) {
            getAlert()
            this.downloadFiles()
        } else if (CURRENT_HOUR === HOUR_PM && CURRENT_MINUTES === MIN_PM) {
            getAlert()
            this.downloadFiles()
        }
    },
}

export const useFileStore = defineStore("file", {
    state,
    getters,
    actions,
})
