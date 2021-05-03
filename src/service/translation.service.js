import Urls from '../urls'

export const translationService = {
    update,
}

function update (translationId, text, answers) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                    Urls.get('translations', {translation: translationId}),
                    JSON.stringify({text, answers})
                 )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

