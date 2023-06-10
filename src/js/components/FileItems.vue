<script setup>
import { computed, watch } from "vue"
import File from "@component/File.vue"

// Defining Props
const props = defineProps({
    items: Array,
    perPage: Number,
    currentPage: Number,
    filter: String,
    onFiltered: Function,
    fields: Array,
})

// [Computed] => Filter Items based on search
const filteredItems = computed(() => {
    return props.items.filter((item) => {
        const filter = props.filter ? props.filter.toLowerCase() : ""
        const searchableKeys = props.fields || Object.keys(item)
        return searchableKeys.some((key) => {
            if (item[key]) {
                const val = item[key].toString().toLowerCase()
                return val.includes(filter)
            }
        })
    })
})

// [Computed] => Slice Items, it has to be independant from Filter
const slicedItems = computed(() =>
    filteredItems.value.slice(
        (props.currentPage - 1) * props.perPage,
        props.currentPage * props.perPage
    )
)

// [Watcher] => Executting Outer function
watch(filteredItems, (newVal) => {
    props.onFiltered(newVal)
})
</script>

<template>
    <div class="FileItems">
        <File
            v-for="(item, index) in slicedItems"
            :key="'file_' + index"
            :file="item"
        />
    </div>
</template>

<style lang="scss" scoped>
.FileItems {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {
        grid-template-columns: repeat(2, 1fr);
    }
    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {
        grid-template-columns: 1fr;
    }
}
</style>
