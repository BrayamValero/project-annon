<script setup>
import { ref, reactive, onMounted, computed } from "vue"
import TableItems from "@component/TableItems.vue"
import FormUser from "@component/Form/User.vue"

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

const formUserModal = ref(0)

// Defining Data Format
const dataFormat = {
    id: null,
    fullname: null,
    email: null,
    password: null,
    role_id: null,
}

// [Cloning] => Cloning Object
const formData = reactive({ ...dataFormat })
const formAction = ref(null)

// Extra Methods => Add, Edit, Delete
const addUser = () => {
    // Setting formData
    Object.assign(formData, dataFormat)
    // Opening Modal
    formAction.value = "add"
    formUserModal.value.show()
}
const editUser = ({ id, email, fullname, password, role_id }) => {
    // Setting formData
    formData.id = id
    formData.email = email
    formData.fullname = fullname
    formData.role_id = role_id
    // Opening Modal
    formAction.value = "edit"
    formUserModal.value.show()
}
const deleteUser = (id) => {
    const FORM_DATA = new FormData()
    FORM_DATA.append("id", id)
    userStore.deleteUser(FORM_DATA)
}

// Submitting form
const submitForm = (action) => {
    const FORM_DATA = new FormData()
    Object.entries(formData).forEach(([key, val]) => FORM_DATA.append(key, val))
    if (action === "add") {
        userStore.addUser(FORM_DATA)
    } else if (action == "edit") {
        userStore.editUser(FORM_DATA)
    }
}

// Computed Getter
const getFormAction = computed(() => {
    return formAction.value === "add" ? "Agregar" : "Editar"
})
</script>

<template>
    <div class="TableWrapper">
        <b-row>
            <b-col cols="6">
                <!-- Search -->
                <!-- <b-form-input
                    size="sm"
                    type="search"
                    placeholder="Buscar Usuarios"
                    v-model="filter"
                    autocomplete="off"
                /> -->
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
            <template #cell(index)="{ item, index }">
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
                    Eliminar
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
        <!-- Modals -->
        <b-modal ref="formUserModal" :title="getFormAction + ' Usuario'">
            <FormUser :form="formData" :type="formAction" />
            <template #modal-footer>
                <b-button variant="primary" @click="submitForm(formAction)">
                    {{ getFormAction }}
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
