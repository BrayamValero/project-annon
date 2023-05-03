<script setup>
import { ref, onMounted } from "vue"

// Init Ref values
const filter = ref(null)
const totalRows = ref(null)
const perPage = ref(3)
const currentPage = ref(1)

// Todo: Get items from backend
const items = ref([
    {
        id: "1",
        name: "Archivo1",
        file_type: "PDF",
        weight: "50MB",
        source: "https://example.com/archivo1.pdf",
        created_at: "2022-04-01T09:30:00Z",
        updated_at: "2022-04-01T11:45:00Z",
    },
    {
        id: "2",
        name: "Archivo2",
        file_type: "DOCX",
        weight: "120MB",
        source: "https://example.com/archivo2.docx",
        created_at: "2022-04-02T14:20:00Z",
        updated_at: "2022-04-03T08:15:00Z",
    },
    {
        id: "3",
        name: "Archivo3",
        file_type: "JPG",
        weight: "2MB",
        source: "https://example.com/archivo3.jpg",
        created_at: "2022-04-05T11:10:00Z",
        updated_at: "2022-04-06T13:00:00Z",
    },
    {
        id: "4",
        name: "Archivo4",
        file_type: "XLSX",
        weight: "80MB",
        source: "https://example.com/archivo4.xlsx",
        created_at: "2022-04-10T16:45:00Z",
        updated_at: "2022-04-11T09:20:00Z",
    },
    {
        id: "5",
        name: "Archivo5",
        file_type: "PNG",
        weight: "3MB",
        source: "https://example.com/archivo5.png",
        created_at: "2022-04-12T13:00:00Z",
        updated_at: "2022-04-13T10:30:00Z",
    },
    {
        id: "6",
        name: "Archivo6",
        file_type: "TXT",
        weight: "10MB",
        source: "https://example.com/archivo6.txt",
        created_at: "2022-04-15T09:00:00Z",
        updated_at: "2022-04-15T12:20:00Z",
    },
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
            bordered
            responsive
            head-variant="dark"
            show-empty
            :items="items"
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
