import Vue from "vue"
import VueRouter from "vue-router"
import { createPinia } from "pinia"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import App from "./App.vue"
import routes from "@router/index"

// Import Bootstrap & Bootstrap Vue CSS & SCSS
import "@/scss/main.scss"

const pinia = createPinia()

// Make BootstrapVue available throughout your project, optionally install the BootstrapVue icon components plugin
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(pinia)

const router = new VueRouter({
    mode: "history",
    routes,
})

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")
