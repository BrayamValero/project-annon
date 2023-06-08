import VueRouter from "vue-router"
// Views Defined
import Index from "@page/Index.vue"
import Login from "@page/Login.vue"
import Dashboard from "@page/Dashboard.vue"

function authUser(to, from, next) {
    const JWT_TOKEN = localStorage.getItem("jwt_token")
    if (!JWT_TOKEN) {
        return next({ name: "Login" })
    } else {
        return next()
    }
}

function userLogged(to, from, next) {
    const USER_LOGGED = localStorage.getItem("jwt_token")
    if (USER_LOGGED) {
        return next({ name: "Dashboard" })
    } else {
        return next()
    }
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Index,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: userLogged,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: authUser,
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
