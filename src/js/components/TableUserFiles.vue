<script setup>
import { ref, onMounted } from "vue"

// Init Ref values
const filter = ref(null)
const totalRows = ref(null)
const perPage = ref(2)
const currentPage = ref(1)

// Todo: Get items from backend
const items = ref([
    { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
    { age: 21, first_name: "Larsen", last_name: "Shaw" },
    { age: 89, first_name: "Geneva", last_name: "Wilson" },
    { age: 38, first_name: "Jami", last_name: "Carney" },
])

onMounted(() => {
    totalRows.value = items.value.length
})

// Detect Search Filter
const onFiltered = (filteredItems) => {
    // Trigger pagination to update the number of buttons/pages due to filtering
    totalRows.value = filteredItems.length
    currentPage.value = 1
}
</script>

<template>
    <div class="TableUserFiles">
        <!-- Search -->
        <b-form-input
            v-model="filter"
            type="search"
            placeholder="Type to Search"
        />
        <!-- Table -->
        <b-table
            hover
            striped
            show-empty
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
        ></b-table>
        <!-- Pagination -->
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
        />
    </div>
</template>
