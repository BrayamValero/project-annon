<script setup>
import { ref, onMounted } from "vue"
import TableItems from "@component/TableItems.vue"

// Adding Folder Store
import { storeToRefs } from "pinia"
import { useFolderStore } from "@store/folders"

// Accessing the Folder Store variables
const folderStore = useFolderStore()
const { folders } = storeToRefs(folderStore)

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
        label: "Nombre de Carpeta",
        sortable: true,
    },
    {
        key: "index",
        label: "Opciones",
    },
]

// Getting Information Request & Total Rows
onMounted(async () => {
    await folderStore.getFolders()
    totalRows.value = folders.value.length
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

// Extra Methods => Add, Edit, Delete
const addFolder = () => {
    console.log("Adding Folder...")
}
const editFolder = (id) => {
    console.log("Editing Folder...", id)
}
const deleteFolder = (id) => {
    console.log("Deleting Folder...", id)
}
</script>

<template>
    <div class="TableWrapper">
        <b-row>
            <b-col cols="6">
                <!-- Search -->
                <b-form-input
                    size="sm"
                    type="search"
                    placeholder="Buscar Carpetas"
                    v-model="filter"
                />
            </b-col>
            <b-col cols="6" class="text-right">
                <!-- Add New Folder -->
                <b-button variant="success" size="sm" @click="addFolder">
                    Agregar
                </b-button>
            </b-col>
        </b-row>

        <!-- Table Items View -->
        <TableItems
            :items="folders"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :on-filtered="onFiltered"
        >
            <template #cell(index)="{ item }">
                <b-button
                    class="mr-2"
                    variant="warning"
                    size="sm"
                    @click="editFolder(item)"
                >
                    Editar
                </b-button>
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteFolder(item.id)"
                >
                    Suspender
                </b-button>
            </template>
        </TableItems>
        <!-- Pagination -->
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
        />
    </div>
</template>
