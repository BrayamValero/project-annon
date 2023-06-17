import Vue, { markRaw } from "vue"
import VueRouter from "vue-router"
import VueCookies from "vue-cookies"
import { createPinia } from "pinia"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import App from "./App.vue"
import router from "@router/index"
import { useDecodeJWT, useAbilities } from "@composable"

// Importing Axios
import axios from "../js/axios"
import VueAxios from "vue-axios"

// Import Bootstrap & Bootstrap Vue CSS & SCSS
import "@/scss/main.scss"

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
    store.cookies = VueCookies
})

// Register the directive
Vue.directive("ability", {
    inserted(el, binding, vnode) {
        const { value: ability } = binding
        const { role_name: role } = useDecodeJWT(VueCookies.get("token"))
        if (!useAbilities[ability].includes(role)) {
            el.parentElement.removeChild(el)
        }
    },
})

// Make BootstrapVue available throughout your project, optionally install the BootstrapVue icon components plugin
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(pinia)

Vue.use(VueCookies, {
    expires: "1d",
})

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app")
