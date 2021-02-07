import Urls from '../urls'

export const progressService = {
    get,
}

function get () {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('current_progress'))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

