<script setup>
import { ref, onMounted } from "vue"
import TableItems from "@component/TableItems.vue"
import FileItems from "@component/FileItems.vue"

// Adding Folder Store
import { useFileStore } from "@store/files"

// Accessing the Folder Store variables
const fileStore = useFileStore()

// Defining Props
const props = defineProps({
    files: Array,
    selectedView: String,
})

// Init Ref values
const filter = ref("")
const totalRows = ref(null)
const perPage = ref(5)
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
        key: "url_source",
        label: "URL",
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

onMounted(() => {
    totalRows.value = props.files.length
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    // Trigger pagination to update the number of buttons/pages due to filtering
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

const fs = ref(1)

const options = [
    { value: 1, text: "Carpeta I" },
    { value: 2, text: "Carpeta II" },
    { value: 3, text: "Carpeta III" },
]
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
                <b-form-select v-model="fs" :options="options" />
            </b-col>
        </b-row>
        <!-- Table Items View -->
        <TableItems
            :fields="fields"
            :items="files"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :on-filtered="onFiltered"
            v-if="selectedView === 'table'"
        >
            <template #cell(index)="{ item, index }">
                <div class="flex-btn-container">
                    <b-button
                        variant="warning"
                        size="sm"
                        @click="editUser(item)"
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        @click="fileStore.downloadFile(item)"
                    >
                        <i class="bi bi-download"></i>
                    </b-button>
                    <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteUser(item.id)"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </b-button>
                    <b-button
                        variant="secondary"
                        size="sm"
                        @click="fileStore.viewFile(item)"
                    >
                        <i class="bi bi-eye"></i>
                    </b-button>
                </div>
            </template>
        </TableItems>
        <!-- File Items View -->
        <FileItems
            :items="files"
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
