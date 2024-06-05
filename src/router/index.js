import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/bookmarks',
        name: 'Bookmarks',
        component: () => import('../pages/BookmarkPage.vue')
    },
    {
        path: '/details/:title',
        name: 'Details',
        component: () => import('../pages/DetailedPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

