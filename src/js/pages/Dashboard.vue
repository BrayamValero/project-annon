<script setup>
import { storeToRefs } from "pinia"
import { useFileStore } from "@store/files"
import { ref, computed, onBeforeMount } from "vue"

import UserFilesContainer from "@component/UserFilesContainer.vue"
import FilepondUploadFiles from "@component/FilepondUploadFiles.vue"

// access the `store` variable anywhere in the component ✨
const fileStore = useFileStore()
const { files } = storeToRefs(fileStore)

const selectedView = ref("table")
const viewOptions = ref([
    { text: "Tabla", value: "table" },
    { text: "Carpetas", value: "files" },
])

// [Fetch] => Getting Files
onBeforeMount(() => {
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
                    <h1>Google Drive</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nihil, ullam?
                    </p>
                    <FilepondUploadFiles />
                </b-col>
                <b-col cols="8">
                    <div class="d-flex justify-content-between mb-3">
                        <div>
                            <h1>{{ getSelectedToggleName }}</h1>
                            <p>Lorem ipsum dolor sit.</p>
                        </div>
                        <!-- Toggle View -->
                        <b-form-group v-slot="{ ariaDescribedby }" class="mb-4">
                            <b-form-radio-group
                                v-model="selectedView"
                                :options="viewOptions"
                                :aria-describedby="ariaDescribedby"
                                name="view-option"
                                buttons
                            ></b-form-radio-group>
                        </b-form-group>
                    </div>
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
