<script setup>
import { ref, onMounted } from "vue"
import TableItems from "@component/TableItems.vue"

// Adding User Store
import { storeToRefs } from "pinia"
import { useUserStore } from "@store/users"

// Accessing the User Store variables
const userStore = useUserStore()
const { users } = storeToRefs(userStore)

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
        key: "fullname",
        label: "Nombre y Apellido",
        sortable: true,
    },
    {
        key: "email",
        label: "Correo Electronico",
        sortable: true,
    },
    {
        key: "role_id",
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
    await userStore.getUsers()
    totalRows.value = users.value.length
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    totalRows.value = filteredItems.length
    currentPage.value = 1
}

// Extra Methods => Add, Edit, Delete
const addUser = () => {
    console.log("Adding User...")
}
const editUser = (id) => {
    console.log("Editing User...", id)
}
const deleteUser = (id) => {
    console.log("Deleting User...", id)
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
                <!-- Add New User -->
                <b-button variant="success" size="sm" @click="addUser">
                    Agregar
                </b-button>
            </b-col>
        </b-row>

        <!-- Table Items View -->
        <TableItems
            :items="users"
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
                    @click="editUser(item)"
                >
                    Editar
                </b-button>
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteUser(item.id)"
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