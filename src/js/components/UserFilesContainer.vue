<script setup>
import { storeToRefs } from "pinia"
import { ref, computed, watch } from "vue"
import TableItems from "@component/TableItems.vue"
import FileItems from "@component/FileItems.vue"

// Adding Folder Store
import { useFileStore } from "@store/files"
import { useFolderStore } from "@store/folders"

// Accessing the Folder Store variables
const fileStore = useFileStore()
const folderStore = useFolderStore()

const { getSortingOptions } = storeToRefs(folderStore)

// Defining Props
const props = defineProps({
    files: Array,
    selectedView: String,
})

// Init Ref values
const filter = ref("")
const totalRows = ref(null)
const perPage = ref(6)
const currentPage = ref(1)
const fields = [
    {
        key: "id",
        label: "#",
        sortable: true,
    },
    {
        key: "name",
        label: "Nombre",
        sortable: true,
    },
    {
        key: "type",
        label: "Tipo",
        sortable: true,
    },
    {
        key: "folder_id",
        label: "Carpeta",
        sortable: true,
    },
    {
        key: "size",
        label: "Tamaño",
        sortable: true,
    },
    {
        key: "index",
        label: "Opciones",
    },
]

// Folder Selected
const filterSelected = ref(null)

const getFilteredFiles = computed(() => {
    const filteredItems = filterSelected.value
        ? props.files.filter((file) => file.folder_id === filterSelected.value)
        : props.files

    totalRows.value = filteredItems.length
    return filteredItems
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

watch(
    () => props.files,
    () => {
        totalRows.value = getFilteredFiles.value.length
    }
)
</script>

<template>
    <div class="TableUserFiles">
        <!-- Filter & Search -->
        <b-row class="justify-content-between">
            <b-col cols="5">
                <b-form-input
                    v-model="filter"
                    type="search"
                    placeholder="Buscar archivos..."
                />
            </b-col>
            <b-col cols="5">
                <b-form-select
                    v-model="filterSelected"
                    :options="getSortingOptions"
                />
            </b-col>
        </b-row>
        <!-- Table Items View -->
        <TableItems
            :items="getFilteredFiles"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :on-filtered="onFiltered"
            v-if="selectedView === 'table'"
        >
            <template #cell(index)="{ item, index }">
                <div class="flex-btn-container">
                    <b-button
                        variant="primary"
                        size="sm"
                        @click="fileStore.downloadFile(item)"
                    >
                        <i class="bi bi-download"></i>
                    </b-button>

                    <b-button
                        variant="success"
                        size="sm"
                        @click="fileStore.viewFile(item)"
                    >
                        <i class="bi bi-eye"></i>
                    </b-button>
                    <b-button
                        variant="danger"
                        size="sm"
                        @click="fileStore.deleteFile(item.id)"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </b-button>
                </div>
            </template>
        </TableItems>
        <!-- File Items View -->
        <FileItems
            :items="getFilteredFiles"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :on-filtered="onFiltered"
            v-else-if="selectedView === 'files'"
        />
        <!-- Pagination -->
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
            align="right"
        />
    </div>
</template>
