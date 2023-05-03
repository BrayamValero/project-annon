<script setup>
import { ref, onMounted } from "vue"

// Defining Props
const props = defineProps({
    files: Array,
})

// Init Ref values
const filter = ref(null)
const totalRows = ref(null)
const perPage = ref(3)
const currentPage = ref(1)

onMounted(() => {
    totalRows.value = props.files.length
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
            bordered
            responsive
            head-variant="dark"
            show-empty
            :items="files"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            class="my-4"
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
