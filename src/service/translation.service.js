import Urls from '../urls'

export const translationService = {
    add,
    remove,
}

function add (translation) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('translations'),
                JSON.stringify(translation)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function remove (id) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .delete(Urls.get('translation', id))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
