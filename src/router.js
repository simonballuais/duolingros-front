import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import LearningSession from './components/LearningSession.vue'

let router = new VueRouter({
    routes: [
        {name: 'login', path: '/login', component: Login},
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
    ],
})

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        return next()
    }

    if (!localStorage.getItem('token')) {
        return next('/login')
    }

    next()
});

export default router;
