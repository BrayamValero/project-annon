<script setup>
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
            <div class="File-format">Formato {{ file.file_type }}</div>
            <div class="File-size">
                {{ file.weight }}
            </div>
        </div>
        <!-- Dropdown Options -->
        <b-dropdown
            size="sm"
            variant="link"
            class="File-options"
            toggle-class="File-options-btn"
            no-caret
            right
        >
            <template #button-content>
                <b-icon class="File-options-icon" icon="three-dots-vertical" />
            </template>
            <b-dropdown-item href="#">Eliminar</b-dropdown-item>
            <b-dropdown-item href="#">Editar</b-dropdown-item>
        </b-dropdown>
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
        font-weight: bold;
        font-size: 14px;
    }
    &-format {
        font-size: 12px;
    }
    &-size {
        font-size: 12px;
    }
}
</style>
