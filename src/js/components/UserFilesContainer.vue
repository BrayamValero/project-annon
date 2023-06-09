<script setup>
import { ref, onMounted } from "vue"
import TableItems from "@component/TableItems.vue"
import FileItems from "@component/FileItems.vue"

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
        <!-- Table Items View -->
        <TableItems
            :items="files"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :on-filtered="onFiltered"
            v-if="selectedView === 'table'"
        />
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
        />
    </div>
</template>
