import axios from 'axios'
import router from './router'

const urls = {
    'login': 'login',
    'logout': 'logout',
    'book_lessons': 'book_lessons',
    'courses': 'courses',
    'start_learning_session': 'learning-sessions/start-lesson/{lesson}/{difficulty}',
    'submit_learning_session': 'learning-sessions/{learningSession}/submit',
    'start_anonymous_learning_session': 'anonymous-learning-sessions/start-lesson/{lesson}/{difficulty}',
    'submit_anonymous_learning_session': 'anonymous-learning-sessions/{learningSession}/submit',
    'current_progress': 'current-progress',
    'user': 'users/{id}',
    'last_seven_days_graph': 'last-seven-days-graph',
    'submit_profile': 'submit-profile',
    'send_reset_password_request': 'password-reset-request',
    'send_change_password': 'password-change/{token}',
    'confirm_email_code': 'confirm-email/{code}',
    'questions': 'questions/{question}',
    'propositions': 'propositions/{proposition}',
    'translations': 'translations/{translation}',
}

window.console.log(process.env.VUE_APP_BASE_API_URL)
window.console.log(process.env)

const axiosConfigured = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
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
            window.console.log('pout pouet redirect')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push({'name': 'login', query: {it: true}})
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
