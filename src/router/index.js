import { createRouter, createWebHistory  } from "vue-router";
import Home from "../views/Home.vue"
import Welcome from "../views/Welcome.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
    ]
})

export default router