import axios from 'axios'
import router from './router'

const urls = {
    'login': 'login',
    'logout': 'logout',
    'book_lessons': 'book_lessons',
    'start_learning_session': 'learning-sessions/start-lesson/{lesson}/{difficulty}',
    'submit_learning_session': 'learning-sessions/{learningSession}/submit',
}

const axiosConfigured = axios.create({
    baseURL: 'api',
});

axiosConfigured.defaults.headers.common['Accept'] = 'application/json'
axiosConfigured.defaults.headers.put['Content-Type'] = 'application/json'
axiosConfigured.defaults.headers.post['Content-Type'] = 'application/json'
axiosConfigured.defaults.headers.delete['Content-Type'] = 'application/json'

axiosConfigured.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push({'name': 'login'})
        }

        return Promise.reject(error)
    }
)

export default {
    get(urlName, routeArguments) {
        let url = urls[urlName]

        if (! routeArguments) {
            return url
        }

        Object.keys(routeArguments).forEach(argName => {
            const argValue = routeArguments[argName]

            url = url.replace('{' + argName + '}', argValue)
        });

        return url
    },
    getAxios() {
        const token = localStorage.getItem('token')

        if (token) {
            axiosConfigured.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }

        return axiosConfigured
    }
}
