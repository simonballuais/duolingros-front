import Urls from '../urls'

export const userService = {
    login,
    logout,
    get,
    put,
    sendResetPasswordRequest,
    sendPasswordChange,
    confirmEmailCode,
    saveAnonymous,
    getAnonymous,
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('login'),
                {'email': username, password}
            ).then((response) => {
                resolve(response.data)
            }).catch((data) => {
                window.console.error(data);
                reject()
            })
    });
}

function get(id) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(
                Urls.get('user', {id})
            ).then((response) => {
                window.console.log(response)
                resolve(response.data)
            }).catch((data) => {
                reject(data)
            })
    });
}

function put(user) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                Urls.get('user', {id: user.id}),
                JSON.stringify(user)
            ).then((response) => {
                resolve(response.data)
            }).catch((data) => {
                reject(data)
            })
    });
}

function sendResetPasswordRequest(email) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('send_reset_password_request'),
                JSON.stringify({email})
            )
            .then(() => {
                resolve()
            })
            .catch((data) => {
                reject(data)
            })
    });
}

function sendPasswordChange(password, token) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('send_change_password', {token}),
                JSON.stringify({password})
            )
            .then(() => {
                resolve()
            })
            .catch((data) => {
                reject(data)
            })
    });
}

function confirmEmailCode(emailCode) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(Urls.get('confirm_email_code', {code: emailCode}))
            .then(() => {
                resolve()
            })
            .catch((data) => {
                reject(data)
            })
    });
}

function saveAnonymous(user) {
    localStorage.setItem('anonymousUser', JSON.stringify(user))
}

function getAnonymous() {
    return JSON.parse(localStorage.getItem('anonymousUser'))
}

function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}
