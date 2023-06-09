<script setup>
import { ref, reactive } from "vue"
import { useFileStore } from "@store/files"

// access the `store` variable anywhere in the component ✨
const fileStore = useFileStore()

defineProps({
    title: String,
})

// Import Vue FilePond
import vueFilePond from "vue-filepond"

// Import Filepond Styles
import "filepond/dist/filepond.min.css"

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js"
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js"

// Import Filepond image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"

// Create FilePond component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
)

const files = ref([])

// Defining Data Format
const dataFormat = {
    userId: 1,
    folderId: 1,
    files: [],
}

// [Cloning] => Cloning Object
const filesData = reactive({ ...dataFormat })

// [Filepond] => Adding File
const handleFilePondAddFile = (err, val) => {
    const { id, filenameWithoutExtension, fileSize, fileExtension, file } = val
    const data = {
        id,
        file,
        name: filenameWithoutExtension,
        size: fileSize,
        type: fileExtension,
    }
    filesData.files.push(data)
}

// [Filepond] => Removing File
const handleFilePondRemoveFile = (err, file) => {
    const { id } = file
    const index = filesData.files.findIndex((file) => file.id === id)
    if (index !== -1) {
        filesData.files.splice(index, 1)
    }
}

const options = [
    { value: null, text: "Selecciona una carpeta" },
    { value: 1, text: "Carpeta I" },
    { value: 2, text: "Carpeta II" },
    { value: 3, text: "Carpeta III" },
]

const submitFiles = () => {
    const { userId, folderId, files } = filesData
    const FORM_DATA = new FormData()

    FORM_DATA.append("userId", userId)
    FORM_DATA.append("folderId", folderId)

    Object.entries(files).forEach(([key, val]) => {
        const { file, name } = val
        FORM_DATA.append("files[]", file, name)
    })

    fileStore.addFiles(FORM_DATA)
}
</script>

<template>
    <div class="FilepondUploadFiles">
        <b-form-select
            v-model="filesData.folderId"
            :options="options"
            size="sm"
            class="mb-3"
        />
        <file-pond
            ref="pond"
            name="files"
            class-name="FilepondUploadFiles-file"
            label-idle="Arrastra los archivos aqui"
            allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            :files="files"
            @addfile="handleFilePondAddFile"
            @removefile="handleFilePondRemoveFile"
        />
        <b-button variant="primary" class="w-100" @click="submitFiles" block>
            Subir Archivos
        </b-button>
    </div>
</template>

<style>
.filepond--credits {
    display: none;
}
</style>
