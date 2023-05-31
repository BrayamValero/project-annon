import Vue from "vue"
import App from "./App.vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import { createPinia } from "pinia"

// Import Bootstrap & Bootstrap Vue CSS & SCSS
import "@/scss/main.scss"

const pinia = createPinia()

// Make BootstrapVue available throughout your project, optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(pinia)

new Vue({
    render: (h) => h(App),
}).$mount("#app")
