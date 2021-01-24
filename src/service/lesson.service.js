import Urls from '../urls'

export const lessonService = {
    fetchAll,
    fetchById,
    save,
}

function fetchAll () {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('lessons'))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function fetchById (id) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('lesson', {id}))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function save(lesson) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                Urls.get('lesson', {id: lesson.id}),
                JSON.stringify(lesson)
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
