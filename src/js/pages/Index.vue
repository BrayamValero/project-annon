<script setup>
import { ref, computed } from "vue"
import TableUserFiles from "@component/TableUserFiles.vue"
import FilepondUploadFiles from "@component/FilepondUploadFiles.vue"
import FolderUserFiles from "@component/FolderUserFiles.vue"

// Overall Files data => Todo: Get items from backend
const allFiles = ref([
    {
        id: "1",
        name: "Archivo1",
        file_type: "PDF",
        weight: "50MB",
        source: "https://example.com/archivo1.pdf",
        created_at: "2022-04-01T09:30:00Z",
        updated_at: "2022-04-01T11:45:00Z",
    },
    {
        id: "2",
        name: "Archivo2",
        file_type: "DOCX",
        weight: "120MB",
        source: "https://example.com/archivo2.docx",
        created_at: "2022-04-02T14:20:00Z",
        updated_at: "2022-04-03T08:15:00Z",
    },
    {
        id: "3",
        name: "Archivo3",
        file_type: "JPG",
        weight: "2MB",
        source: "https://example.com/archivo3.jpg",
        created_at: "2022-04-05T11:10:00Z",
        updated_at: "2022-04-06T13:00:00Z",
    },
    {
        id: "4",
        name: "Archivo4",
        file_type: "XLSX",
        weight: "80MB",
        source: "https://example.com/archivo4.xlsx",
        created_at: "2022-04-10T16:45:00Z",
        updated_at: "2022-04-11T09:20:00Z",
    },
    {
        id: "5",
        name: "Archivo5",
        file_type: "PNG",
        weight: "3MB",
        source: "https://example.com/archivo5.png",
        created_at: "2022-04-12T13:00:00Z",
        updated_at: "2022-04-13T10:30:00Z",
    },
    {
        id: "6",
        name: "Archivo6",
        file_type: "TXT",
        weight: "10MB",
        source: "https://example.com/archivo6.txt",
        created_at: "2022-04-15T09:00:00Z",
        updated_at: "2022-04-15T12:20:00Z",
    },
])

const isTableView = ref(true)
const isTableViewOptions = ref([
    { text: "Tabla", value: true },
    { text: "Carpetas", value: false },
])

const getSelectedToggleName = computed(() => {
    return isTableView.value ? "Vista de Tablas" : "Vista de Carpetas"
})
</script>

<template>
    <div class="Index">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="4">
                    <h1>Google Drive</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nihil, ullam?
                    </p>
                    <FilepondUploadFiles />
                </b-col>
                <b-col>
                    <div class="d-flex justify-content-between mb-3">
                        <div>
                            <h1>{{ getSelectedToggleName }}</h1>
                            <p>Lorem ipsum dolor sit.</p>
                        </div>
                        <!-- Toggle View -->
                        <b-form-group v-slot="{ ariaDescribedby }" class="mb-4">
                            <b-form-radio-group
                                v-model="isTableView"
                                :options="isTableViewOptions"
                                :aria-describedby="ariaDescribedby"
                                name="view-option"
                                buttons
                            ></b-form-radio-group>
                        </b-form-group>
                    </div>
                    <!-- Toggle Components -->
                    <TableUserFiles :files="allFiles" v-if="isTableView" />
                    <FolderUserFiles :files="allFiles" v-else />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
