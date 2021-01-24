import Urls from '../urls'

export const userService = {
    login,
    logout,
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

function logout() {
    window.console.log('LOGOUT');
}
