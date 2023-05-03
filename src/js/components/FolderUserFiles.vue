<script setup>
// Defining Props
const props = defineProps({
    files: Array,
})
</script>

<template>
    <div class="FolderUserFiles">
        <pre>{{ files }}</pre>
    </div>
</template>
