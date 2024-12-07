import { createRouter, createWebHistory  } from "vue-router";
import Home from "../views/Home.vue"
import About from "../views/AboutView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/welcome',
            name: 'Welcome',
            component: ()=> import('../views/Welcome.vue')
        }

    ]
})

export default router