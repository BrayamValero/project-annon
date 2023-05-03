<script setup>
import { ref } from "vue"

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

const myFiles = ref([])

const handleFilePondInit = () => {
    console.log("Filepond init")
}
</script>

<template>
    <div class="FilepondUploadFiles">
        <file-pond
            ref="pond"
            name="files"
            class-name="FilepondUploadFiles-file"
            label-idle="Arrastra los archivos aqui"
            allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
        />
        <b-button variant="primary" class="w-100" block>
            Subir Archivos
        </b-button>
    </div>
</template>

<style>
.filepond--credits {
    display: none;
}
</style>
