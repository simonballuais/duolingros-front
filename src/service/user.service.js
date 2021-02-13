import Urls from '../urls'

export const userService = {
    login,
    logout,
    get,
    put,
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

function logout() {
    window.console.log('LOGOUT');
}
