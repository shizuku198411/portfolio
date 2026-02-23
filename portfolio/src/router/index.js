import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../pages/Home.vue'
import Works from '../pages/Works.vue'
import About from '../pages/About.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/works', name: 'works', component: Works },
        { path: '/about', name: 'about', component: About },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router