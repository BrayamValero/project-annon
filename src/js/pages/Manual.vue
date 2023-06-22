<script setup>
const steps = [
    {
        title: "Paso 1",
        description: "Primero debes ingresar al sistema a través de un login.",
        url: "/",
    },
    {
        title: "Paso 2",
        description:
            "Una vez dentro del sistema encontraras una interfaz en donde podrás subir archivos acordes a la dependencia en la que pertenezcas, podrás descargar el archivo, verlo o eliminarlo.",
        url: "/",
    },
    {
        title: "Paso 3",
        description:
            "Contaras con acceso a los archivos por medio de dos tipos de vistas, ya sea por tablas o por carpetas y podrás filtrar dependiendo del archivo que busques.",
        url: "/",
    },
    {
        title: "Paso 4",
        description:
            "Podrás ver los usuarios que se encuentren registrados en el sistema, así mismo, tendrás la opción de editar los datos del usuario o eliminarlo.",
        url: "/",
    },
    {
        title: "Paso 5",
        description:
            "Podrás ver las carpetas de las distintas dependencias, filtrar por la que necesites, editarla, eliminarla o agregar una nueva carpeta.",
        url: "/",
    },
    {
        title: "Paso 6",
        description: "Cierre de sesión",
        url: "/",
    },
]
</script>

<template>
    <b-container class="Manual my-5">
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
                        cols="4"
                        v-for="({ title, description, url }, index) in steps"
                        class="mb-5"
                    >
                        <div class="card h-100">
                            <div class="card-header">
                                <h5 class="font-weight-bold text-center mb-0">
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
                                    :href="url"
                                    class="w-100 mt-auto"
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
</template>
