import Urls from '../urls'

export const propositionService = {
    add,
    remove,
}

function add (proposition) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('propositions'),
                JSON.stringify(proposition)
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
            .delete(Urls.get('proposition', id))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
