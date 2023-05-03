<script setup>
import TableUserFiles from "@component/TableUserFiles.vue"
import FilepondUploadFiles from "@component/FilepondUploadFiles.vue"
</script>

<template>
    <div class="Index">
        <b-container class="my-5">
            <b-row class="justify-content-center">
                <b-col>
                    <h1>Google Drive</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nihil, ullam?
                    </p>
                    <FilepondUploadFiles />
                </b-col>
                <b-col>
                    <TableUserFiles />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
