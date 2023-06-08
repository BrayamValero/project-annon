import Vue, { markRaw } from "vue"
import VueRouter from "vue-router"
import { createPinia } from "pinia"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import App from "./App.vue"
import router from "@router/index"

// Import Bootstrap & Bootstrap Vue CSS & SCSS
import "@/scss/main.scss"

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

// Make BootstrapVue available throughout your project, optionally install the BootstrapVue icon components plugin
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(pinia)

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")
