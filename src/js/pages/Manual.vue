<script setup>
import { ref } from "vue"
const steps = [
    {
        title: "Paso 1",
        description: "Primero debes ingresar al sistema a través de un login.",
        url: "/video/step-1.mp4",
    },
    {
        title: "Paso 2",
        description:
            "Una vez dentro del sistema encontraras una interfaz en donde podrás subir archivos acordes a la dependencia en la que pertenezcas, podrás descargar el archivo, verlo o eliminarlo.",
        url: "/video/step-2.mp4",
    },
    {
        title: "Paso 3",
        description:
            "Contaras con acceso a los archivos por medio de dos tipos de vistas, ya sea por tablas o por carpetas y podrás filtrar dependiendo del archivo que busques.",
        url: "/video/step-3.mp4",
    },
    {
        title: "Paso 4",
        description:
            "Podrás ver los usuarios que se encuentren registrados en el sistema, así mismo, tendrás la opción de editar los datos del usuario o eliminarlo.",
        url: "/video/step-4.mp4",
    },
    {
        title: "Paso 5",
        description:
            "Podrás ver las carpetas de las distintas dependencias, filtrar por la que necesites, editarla, eliminarla o agregar una nueva carpeta.",
        url: "/video/step-5.mp4",
    },
    {
        title: "Paso 6",
        description: "Cierre de sesión",
        url: "/video/step-6.mp4",
    },
]

const selectedVideo = ref(null)
const videoModal = ref(0)

const watchVideo = (url) => {
    selectedVideo.value = url
    videoModal.value.show()
}
</script>

<template>
    <div class="Manual">
        <b-container class="py-5">
            <b-row class="justify-content-center">
                <b-col cols="8" class="text-center mb-3">
                    <h3 class="font-weight-bold">Manual de Uso</h3>
                    <p>
                        Antes de usar la plataforma, es recomendable seguir el
                        tutorial acontinuacion.
                    </p>
                </b-col>
                <b-col cols="12">
                    <b-row class="justify-content-center">
                        <b-col
                            lg="4"
                            md="6"
                            sm="6"
                            v-for="(
                                { title, description, url }, index
                            ) in steps"
                            :key="'step-' + index"
                            class="mb-5"
                        >
                            <div class="card h-100">
                                <div class="card-header">
                                    <h5
                                        class="font-weight-bold text-center mb-0"
                                    >
                                        {{ title }}
                                    </h5>
                                </div>
                                <div class="card-body text-center h-100">
                                    <p>{{ description }}</p>
                                </div>
                                <div class="card-footer">
                                    <b-button
                                        size="sm"
                                        variant="danger"
                                        class="w-100 mt-auto"
                                        @click="watchVideo(url)"
                                    >
                                        Ver Video
                                    </b-button>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <!-- Video Modal -->
        <b-modal
            ref="videoModal"
            title="Reproduciendo Video"
            hide-footer
            size="xl"
        >
            <video width="100%" height="100%" controls>
                <source :src="selectedVideo" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </b-modal>
    </div>
</template>
