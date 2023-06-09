<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue"
import TableItems from "@component/TableItems.vue"
import FormUser from "@component/Form/User.vue"

// Adding User Store
import { storeToRefs } from "pinia"
import { useUserStore } from "@store/users"
import { useAuthStore } from "@store/auth"

// Accessing the User Store variables
const userStore = useUserStore()
const authStore = useAuthStore()
const { users } = storeToRefs(userStore)
const { user } = storeToRefs(authStore)

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
        key: "role_name",
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
    role_id: 1,
}

// [Cloning] => Cloning Object
const formData = reactive({ ...dataFormat })
const formAction = ref(null)

// Extra Methods => Add, Edit, Delete
const addUser = () => {
    // Setting formData
    Object.assign(formData, dataFormat)
    // Delete unused key
    delete formData.id
    // Opening Modal
    formAction.value = "add"
    formUserModal.value.show()
}
const editUser = ({ id, email, fullname, password, role_id }) => {
    // Delete unused key
    delete formData.password
    // Setting formData
    formData.id = id
    formData.email = email
    formData.fullname = fullname
    formData.role_id = role_id
    // Opening Modal
    formAction.value = "edit"
    formUserModal.value.show()
}
const editPassword = ({ id }) => {
    // Delete unused key
    delete formData.email
    delete formData.fullname
    delete formData.role_id
    // Setting formData
    formData.id = id
    formData.password = null
    formAction.value = "password"
    formUserModal.value.show()
}
const deleteUser = ({ id }) => {
    userStore.deleteUser(id)
}

// Submitting form
const submitForm = async (action) => {
    let isSuccess
    if (action === "add") {
        isSuccess = await userStore.addUser(formData)
    } else if (action == "edit") {
        isSuccess = await userStore.editUser(formData)
    } else if (action == "password") {
        isSuccess = await userStore.editPassword(formData)
    }
    // Hide Modal
    if (isSuccess) formUserModal.value.hide()
}

// Computed Getter
const getFormAction = computed(() => {
    const ACTION = {
        add: "Agregar Usuario",
        edit: "Editar Usuario",
        password: "Editar Contraseña",
    }
    return ACTION[formAction.value]
})

watch(users, () => {
    totalRows.value = users.value.length
})
</script>

<template>
    <div class="TableWrapper">
        <b-row>
            <b-col cols="4">
                <!-- Search -->
                <b-form-input
                    type="search"
                    placeholder="Buscar Usuarios"
                    v-model="filter"
                    autocomplete="off"
                />
            </b-col>
            <b-col cols="8" class="text-right">
                <!-- Add New User -->
                <b-button
                    variant="success"
                    @click="addUser"
                    v-ability="'add-user'"
                >
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
                <div class="flex-btn-container">
                    <b-button
                        variant="warning"
                        size="sm"
                        @click="editUser(item)"
                        v-ability="'edit-user'"
                        v-if="
                            user.role_name === 'administrador' &&
                            item.role_name === 'administrador'
                        "
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </b-button>
                    <b-button
                        variant="warning"
                        size="sm"
                        @click="editUser(item)"
                        v-else-if="item.role_name !== 'administrador'"
                        v-ability="'edit-user'"
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        @click="editPassword(item)"
                        v-ability="'edit-password'"
                    >
                        <i class="bi bi-key-fill"></i>
                    </b-button>
                    <b-button
                        v-if="item.role_id != 1"
                        variant="danger"
                        size="sm"
                        @click="deleteUser(item)"
                        v-ability="'delete-user'"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </b-button>
                </div>
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
        <b-modal ref="formUserModal" :title="getFormAction">
            <FormUser :form="formData" :type="formAction" />
            <template #modal-footer>
                <b-button variant="primary" @click="submitForm(formAction)">
                    Guardar Cambios
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
