<script setup>
// Adding Folder Store
import { useFileStore } from "@store/files"

// Accessing the Folder Store variables
const fileStore = useFileStore()

// Defining Props
const props = defineProps({
    file: Object,
})
</script>

<template>
    <div class="File">
        <div class="File-card">
            <b-icon icon="file-pdf" class="File-icon"></b-icon>
            <div class="File-name">
                {{ file.name }}
            </div>
            <b-badge variant="secondary" class="d-block my-1">
                Formato {{ file.type.toUpperCase() }}
            </b-badge>
            <div class="File-format"></div>
            <div class="File-size">{{ file.size }} KB</div>
            <div class="flex-btn-container mt-2">
                <b-button
                    variant="primary"
                    size="sm"
                    @click="fileStore.downloadFile(file)"
                >
                    <i class="bi bi-download"></i>
                </b-button>

                <b-button
                    variant="success"
                    size="sm"
                    @click="fileStore.viewFile(file)"
                >
                    <i class="bi bi-eye"></i>
                </b-button>
                <b-button
                    variant="danger"
                    size="sm"
                    @click="fileStore.deleteFile(file.id)"
                >
                    <i class="bi bi-trash-fill"></i>
                </b-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.File {
    position: relative;
    &-card {
        border: 1px solid gray;
        border-radius: 4px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    &-options {
        position: absolute;
        top: 0.625rem;
        right: 0.625rem;
    }
    &-icon {
        font-size: 32px;
        margin-bottom: 0.5rem;
    }
    &-name {
        text-align: center;
        font-weight: bold;
        font-size: 14px;
        // Line Clamp
        display: -webkit-box;
        max-width: 200px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    &-format {
        font-size: 12px;
    }
    &-size {
        color: gray;
        font-size: 12px;
    }
}
</style>
