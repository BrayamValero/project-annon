<script setup>
// Defining Props
const props = defineProps({
    items: Array,
    perPage: Number,
    currentPage: Number,
    filter: String,
    onFiltered: Function,
})
</script>

<template>
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
</template>
