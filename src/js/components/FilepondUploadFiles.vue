<script setup>
import { storeToRefs } from "pinia"
import { ref, reactive } from "vue"
import { useFileStore } from "@store/files"
import { useFolderStore } from "@store/folders"

// access the `store` variable anywhere in the component ✨
const fileStore = useFileStore()
const folderStore = useFolderStore()

const { getFolderOptions } = storeToRefs(folderStore)

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

// Defining FilePond Template Ref
const filepondFiles = ref(0)

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

const submitFiles = () => {
    const { userId, folderId, files } = filesData
    const FORM_DATA = new FormData()

    FORM_DATA.append("userId", userId)
    FORM_DATA.append("folderId", folderId)

    Object.entries(files).forEach(([key, val]) => {
        const { file, name, type } = val
        FORM_DATA.append("files[]", file, name)
        // Append all file types
        FORM_DATA.append("fileTypes[]", type)
    })
    if (files.length > 0) {
        fileStore.addFiles(FORM_DATA).then((success) => {
            if (success) {
                // Resetting Data & Removing Filepond Preview Files
                Object.assign(filesData, dataFormat)
                filepondFiles.value.removeFiles()
            }
        })
    }
}
</script>

<template>
    <div class="FilepondUploadFiles">
        <div class="card">
            <div class="card-body">
                <b-form-select
                    v-model="filesData.folderId"
                    :options="getFolderOptions"
                    class="mb-3"
                />
                <file-pond
                    ref="filepondFiles"
                    name="files"
                    class-name="FilepondUploadFiles-file"
                    label-idle="Arrastra los archivos aqui"
                    allow-multiple="true"
                    :accepted-file-types="null"
                    :files="files"
                    @addfile="handleFilePondAddFile"
                    @removefile="handleFilePondRemoveFile"
                />
                <b-button
                    variant="primary"
                    class="w-100"
                    @click="submitFiles"
                    block
                    v-ability="'upload-file'"
                >
                    Subir Archivos
                </b-button>
            </div>
        </div>
    </div>
</template>

<style>
.filepond--credits {
    display: none;
}
</style>
