<script setup>
import { ref, onMounted } from "vue"
import TableItems from "@component/TableItems.vue"

// Adding Role Store
import { storeToRefs } from "pinia"
import { useRoleStore } from "@store/roles"

// Accessing the Role Store variables
const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)

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
        label: "Rol",
        sortable: true,
    },
    {
        key: "index",
        label: "Opciones",
    },
]

// Getting Information Request & Total Rows
onMounted(async () => {
    await roleStore.getRoles()
    totalRows.value = roles.value.length
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

// Extra Methods => Add, Edit, Delete
const addRole = () => {
    console.log("Adding Role...")
}
const editRole = (id) => {
    console.log("Editing Role...", id)
}
const deleteRole = (id) => {
    console.log("Deleting Role...", id)
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
                    placeholder="Buscar Usuarios"
                    v-model="filter"
                />
            </b-col>
            <b-col cols="6" class="text-right">
                <!-- Add New Role -->
                <b-button variant="success" size="sm" @click="addRole">
                    Agregar
                </b-button>
            </b-col>
        </b-row>

        <!-- Table Items View -->
        <TableItems
            :items="roles"
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
                    @click="editRole(item)"
                >
                    Editar
                </b-button>
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteRole(item.id)"
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
