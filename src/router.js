import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import LearningSession from './components/LearningSession.vue'
import Registration from './components/register/Registration.vue'

let router = new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/',
            component: Home,
        },
        {
            name: 'learning-session',
            path: '/learning-session/:lessonId/:difficulty',
            component: LearningSession,
            props: true,
        },
        {
            name: 'registration',
            path: '/registration',
            component: Registration,
            props: true,
        },
        {
            name: 'confirm-email',
            path: '/confirm-email',
            component: Home,
            props: true,
        },
    ],
})

let noSecurityRoutes = [
    'login',
    'registration',
    'home',
    'learning-session',
    'confirm-email',
]

router.beforeEach((to, from, next) => {
    if (noSecurityRoutes.includes(to.name)) {
        return next()
    }

    if (!localStorage.getItem('token')) {
        return next('/login')
    }

    next()
});

export default router;
