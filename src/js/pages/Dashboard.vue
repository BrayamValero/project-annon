<script setup>
import { storeToRefs } from "pinia"
import { useFileStore } from "@store/files"
import { useFolderStore } from "@store/folders"
import { ref, computed, onBeforeMount } from "vue"

import UserFilesContainer from "@component/UserFilesContainer.vue"
import FilepondUploadFiles from "@component/FilepondUploadFiles.vue"

// access the `store` variable anywhere in the component ✨
const fileStore = useFileStore()
const folderStore = useFolderStore()
const { files } = storeToRefs(fileStore)

const selectedView = ref("table")
const viewOptions = ref([
    { text: "Tabla", value: "table" },
    { text: "Carpetas", value: "files" },
])

// [Fetch] => Getting Files
onBeforeMount(async () => {
    folderStore.getFolders()
    fileStore.getFiles()
})

const getSelectedToggleName = computed(() => {
    return selectedView.value ? "Vista de Tablas" : "Vista de Carpetas"
})
</script>

<template>
    <div class="Index">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col cols="4">
                    <h3 class="font-weight-bold">Backup Los Patios</h3>
                    <p class="text-muted">
                        Bienvenidos a la aplicación, acá podrás subir, editar y
                        eliminar archivos los cuales se estarán guardando
                        diréctamente en la nube.
                    </p>
                    <FilepondUploadFiles class="mt-4" />
                </b-col>

                <b-col cols="8">
                    <b-row class="align-items-center">
                        <b-col cols="8">
                            <h3 class="font-weight-bold">
                                {{ getSelectedToggleName }}
                            </h3>
                            <p class="text-muted">
                                Prueba cambiando entre las vistas disponibles,
                                ya sea que quieras ver los archivos de las
                                carpetas en una tabla o quieras verlos en
                                miniaturas.
                            </p>
                        </b-col>
                        <b-col cols="4" class="text-right">
                            <!-- Download All -->
                            <b-button
                                variant="primary"
                                class="mb-3"
                                @click="fileStore.downloadFiles()"
                                v-ability="'edit-folder'"
                            >
                                <i class="bi bi-download mr-1"></i>
                                Descargar Todos
                            </b-button>

                            <!-- Toggle View -->
                            <b-form-group
                                v-slot="{ ariaDescribedby }"
                                class="mb-4"
                            >
                                <b-form-radio-group
                                    v-model="selectedView"
                                    :options="viewOptions"
                                    :aria-describedby="ariaDescribedby"
                                    name="view-option"
                                    buttons
                                ></b-form-radio-group>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- Main Table & Files view (With Search & Pagination)-->
                    <UserFilesContainer
                        :files="files"
                        :selected-view="selectedView"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
