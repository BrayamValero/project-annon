import VueRouter from "vue-router"
import VueCookies from "vue-cookies"

// Views Defined
import Index from "@page/Index.vue"
import Login from "@page/Login.vue"
import Dashboard from "@page/Dashboard.vue"
import Users from "@page/Users.vue"
import Folders from "@page/Folders.vue"
import Roles from "@page/Roles.vue"

function authUser(to, from, next) {
    const JWT_TOKEN = VueCookies.get("jwt_token")
    if (!JWT_TOKEN) {
        return next({ name: "Login" })
    } else {
        return next()
    }
}

function userLogged(to, from, next) {
    const USER_LOGGED = VueCookies.get("jwt_token")
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
        beforeEnter: userLogged,
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
    {
        path: "/usuarios",
        name: "Users",
        component: Users,
        beforeEnter: authUser,
    },
    {
        path: "/carpetas",
        name: "Folders",
        component: Folders,
        beforeEnter: authUser,
    },
    {
        path: "/roles",
        name: "Roles",
        component: Roles,
        beforeEnter: authUser,
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
