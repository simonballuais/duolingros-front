import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import LearningSession from './components/LearningSession.vue'
import Registration from './components/register/Registration.vue'

let router = new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/',
            component: Login
        },
        {
            name: 'home',
            path: '/apprendre',
            component: Home,
        },
        {
            name: 'learning-session',
            path: '/apprendre/:lessonId/:difficulty',
            component: LearningSession,
            props: true,
        },
        {
            name: 'registration',
            path: '/inscription',
            component: Registration,
            props: true,
        },
        {
            name: 'confirm-email',
            path: '/confirmer-email',
            component: Home,
            props: true,
        },
        {
            name: 'reset-password',
            path: '/reinitialiser-mot-de-passe',
            component: Login,
            props: true,
        },
    ],
})

let noSecurityRoutes = [
    'login',
    'registration',
    'home',
    'learning-session',
    'confirmer-email',
    'reset-password',
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
