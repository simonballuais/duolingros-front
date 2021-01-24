import Urls from '../urls'

export const questionService = {
    add,
    remove,
}

function add (question) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('questions'),
                JSON.stringify(question)
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
            .delete(Urls.get('question', id))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
