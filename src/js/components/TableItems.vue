<script setup>
// Defining Props
const props = defineProps({
    items: Array,
    perPage: Number,
    fields: Array,
    currentPage: Number,
    filter: String,
    onFiltered: Function,
})
</script>

<template>
    <b-table
        hover
        bordered
        outlined
        show-empty
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        @filtered="onFiltered"
        empty-filtered-text="Sin resultados"
        empty-text="No hay registros"
        head-variant="dark"
        responsive
        class="my-4"
    >
        <!-- Dynamic Slot Names -->
        <template
            v-for="(_, slotName) of $scopedSlots"
            v-slot:[slotName]="scope"
        >
            <slot :name="slotName" v-bind="scope" />
        </template>
    </b-table>
</template>
