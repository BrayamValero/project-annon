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
</script>

<template>
    <div class="TableWrapper">
        <b-row>
            <b-col cols="12">
                <!-- Search -->
                <b-form-input
                    type="search"
                    placeholder="Buscar Roles"
                    v-model="filter"
                />
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
        />
        <!-- Pagination -->
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
        />
    </div>
</template>
