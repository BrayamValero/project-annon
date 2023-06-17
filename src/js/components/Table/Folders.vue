<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue"
import TableItems from "@component/TableItems.vue"
import FormFolder from "@component/Form/Folder.vue"

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
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

const formFolderModal = ref(0)

// Defining Data Format
const dataFormat = {
    id: null,
    name: null,
}

// [Cloning] => Cloning Object
const formData = reactive({ ...dataFormat })
const formAction = ref(null)

// Extra Methods => Add, Edit, Delete
const addFolder = () => {
    // Setting formData
    Object.assign(formData, dataFormat)
    // Delete unused key
    delete formData.id
    // Opening Modal
    formAction.value = "add"
    formFolderModal.value.show()
}
const editFolder = ({ id, name }) => {
    // Setting formData
    formData.id = id
    formData.name = name
    // Opening Modal
    formAction.value = "edit"
    formFolderModal.value.show()
}
const deleteFolder = (id) => {
    folderStore.deleteFolder(id)
}

// Submitting form
const submitForm = async (action) => {
    let isSuccess
    if (action === "add") {
        isSuccess = await folderStore.addFolder(formData)
    } else if (action == "edit") {
        isSuccess = await folderStore.editFolder(formData)
    }
    // Hide Modal
    if (isSuccess) formFolderModal.value.hide()
}

// Computed Getter
const getFormAction = computed(() => {
    const ACTION = {
        add: "Agregar Carpeta",
        edit: "Editar Carpeta",
    }
    return ACTION[formAction.value]
})

watch(folders, () => {
    totalRows.value = folders.value.length
})
</script>

<template>
    <div class="TableWrapper">
        <b-row>
            <b-col cols="6">
                <!-- Search -->
                <b-form-input
                    type="search"
                    placeholder="Buscar Carpetas"
                    v-model="filter"
                />
            </b-col>
            <b-col cols="6" class="text-right">
                <!-- Add New Folder -->
                <b-button
                    variant="success"
                    size="sm"
                    @click="addFolder"
                    v-ability="'add-folder'"
                >
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
                    v-ability="'edit-folder'"
                >
                    <i class="bi bi-pencil-fill"></i>
                </b-button>
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteFolder(item.id)"
                    v-ability="'delete-folder'"
                >
                    <i class="bi bi-trash-fill"></i>
                </b-button>
            </template>
        </TableItems>
        <!-- Pagination -->
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
        />
        <!-- Modals -->
        <b-modal ref="formFolderModal" :title="getFormAction">
            <FormFolder :form="formData" />
            <template #modal-footer>
                <b-button variant="primary" @click="submitForm(formAction)">
                    Guardar Cambios
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
