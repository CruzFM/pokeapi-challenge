import { createRouter, createWebHistory  } from "vue-router";
import { reactive } from "vue"; 
import Home from "../views/Home.vue"
import Welcome from "../views/Welcome.vue"

export const loadingState = reactive({ isLoading: false });

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

router.beforeEach((to, from, next) => {
    if (from.name === "Welcome" && to.name === "Home") {
        loadingState.isLoading = true;
      }
  next();
});

router.afterEach((to, from) => {
    if (from.name === "Welcome" && to.name === "Home") {
      setTimeout(() => {
        loadingState.isLoading = false;
      }, 500);
    }
  });
export default router