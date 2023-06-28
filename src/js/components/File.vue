<script setup>
import { computed } from "vue"
// Adding Folder Store
import { useFileStore } from "@store/files"

// Accessing the Folder Store variables
const fileStore = useFileStore()

// Defining Props
const props = defineProps({
    file: Object,
})

const getFileFormat = computed(() => {
    const { type } = props.file

    const fileType = {
        default: "file",
        pdf: "file-pdf",
        word: "file-word",
        txt: "file-text",
        zip: "file-earmark-zip",
        excel: "file-earmark-spreadsheet",
        svg: "filetype-svg",
        png: "filetype-png",
        jpg: "filetype-jpg",
        mp4: "filetype-mp4",
        exe: "filetype-exe",
    }

    return `bi-${fileType[type]}` || `bi-${fileType["default"]}`
})
</script>

<template>
    <div class="File">
        <div class="File-card">
            <i :class="['File-icon bi', getFileFormat]"></i>
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
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.125);
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
